"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoMdCamera, IoMdMic, IoMdSend } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

const Achromatopsia = () => {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [showCamera, setShowCamera] = useState(false); // Define showCamera state
  const [speaking, setSpeaking] = useState(false); // State to manage speech synthesis

  const [cameraVideoElement, setCameraVideoElement] = useState(null);

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition(); // Create SpeechRecognition object
    recognition.continuous = false; // Set continuous listening to false
    recognition.lang = "en-US"; // Set language to English (United States)
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setPrompt(transcript);
      // sendMessage(transcript, true); // Send prompt message with the recognized speech
    };
    setSpeechRecognition(recognition); // Save recognition object to state

    const handleKeyDown = (event) => {
      // Check for Alt + J shortcut
      if (event.ctrlKey && event.key === "j") {
      }
      if (event.ctrlKey && event.key === "f") {
        handleCameraClick();
      }
      if (event.key === "Enter") {
        handleUpload(); // Call handleUpload function when Enter key is pressed
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      stopCameraStream(); // Stop the camera stream when the component unmounts
    };
  }, []);

  const stopCameraStream = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop()); // Stop all tracks in the stream
      setCameraStream(null); // Clear camera stream from state
      if (cameraVideoElement) {
        cameraVideoElement.srcObject = null; // Clear video source object
        setCameraVideoElement(null); // Clear video element from state
      }
    }
  };

  const handleCameraClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.createElement("video");
      videoElement.srcObject = stream;
      videoElement.play();
      setCameraStream(stream); // Save the stream to state if needed
      setCameraVideoElement(videoElement); // Save the video element to state if needed
      setShowCamera(true); // Show the camera preview
    } catch (error) {
      console.error("Error accessing camera:", error);
      // Handle error, show a message, or fallback to file upload
    }
  };

  const handleCaptureImage = (event) => {
    if (event.target.nodeName === "VIDEO") {
      // Check if the click event is from the video element
      // Capture image logic
      if (cameraStream) {
        const canvas = document.createElement("canvas");
        const video = cameraVideoElement; // Get the video element from state
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            setFile(blob); // Save the captured image blob to state
            const imageUrl = URL.createObjectURL(blob);
            setImagePreview(imageUrl); // Display the captured image preview
            setShowCamera(false); // Hide the camera preview after capture
            setMessages([]);
          }
        }, "image/jpeg"); // You can change the format as needed
      }
      stopCameraStream(); // Stop the camera stream after capturing the image
    }
  };

  const sendMessage = (text, isPrompt) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text, type: isPrompt ? "prompt" : "response" },
    ]);
  };

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    // Set additional properties for the utterance if needed
    // utterance.voice = ...

    synth.speak(utterance);
    setSpeaking(true);

    utterance.onend = () => {
      setSpeaking(false);
    };
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setMessages([]);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleRemoveImage = () => {
    setFile(null);
    setImagePreview(null);
    setMessages([]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first.");
      return;
    } else {
      const myprompt = prompt;

      sendMessage(myprompt, true); // Send user prompt
      setPrompt("");
      // sendMessage(text, false); // Send AI response
      // setFile(null);
      // setImagePreview(null);

      const formData = new FormData();
      formData.append("image_file", file);
      console.log("file done");

      try {
        const response = await fetch(
          `http://localhost:8000/predict/?text=${encodeURIComponent(myprompt)}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        console.log(data);
        // Handle the response data as needed
        sendMessage(data, false);
        speakText(data); // Speak the response text
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(droppedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const startListening = () => {
    if (speechRecognition) {
      speechRecognition.start();
    } else {
      alert("Speech recognition not supported in this browser.");
    }
  };

  return (
    <div className="no-scrollbar overflow-hidden font-medium">
      <div
        className="flex flex-col justify-between border border-gray-400 rounded-xl w-1/2 h-[90vh] mx-auto m-10 no-scrollbar bg-white text-black"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="overflow-y-auto overflow-x-hidden no-scrollbar">
          <div className="border border-white/30 w-fit mt-4 ml-4 mr-4 mb-2  p-4 rounded-2xl bg-green-500">
            Welcome To VisualSense
          </div>
          {/* Camera component */}
          {showCamera && (
            <div className="max-w-80 m-4">
              <video
                className="w-full rounded-md"
                autoPlay
                playsInline
                muted
                onClick={handleCaptureImage} // Add onClick event to trigger capture
                ref={(video) => {
                  if (video && cameraStream) {
                    video.srcObject = cameraStream;
                  }
                }}
              />
            </div>
          )}
          <div className="flex flex-col justify-start items-start bg-black">
            {imagePreview && (
              <div className="max-w-96 mb-4 ml-4 mr-4 mt-2 self-start justify-self-start ">
                <img
                  src={imagePreview}
                  alt="Uploaded Preview"
                  className=" rounded-sm"
                  onClick={handleRemoveImage}
                />
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`border border-white/30 w-fit m-4 mt-1 p-4 px-10 rounded-2xl
            ${message.type === "prompt" ? "bg-blue-500" : "bg-green-500"}`}
              >
                <p className="text-white">{message.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-evenly items-center justify-self-end border-t border-gray-400 p-5 h-fit">
          <div className="flex items-center justify-center">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              id="fileInput"
            />
            <label htmlFor="fileInput" className="">
              <FaPlus size={20} />
            </label>
            <span id="fileName" className="ml-2"></span>
          </div>

          <IoMdMic onClick={startListening} size={25} className="mx-2" />
          <IoMdCamera onClick={handleCameraClick} size={30} className="mx-2" />

          <input
            type="text"
            placeholder="Type your prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="border border-white/30 px-2 py-3 mx-2 rounded-md flex-1 bg-black outline-none"
            required
          />

          <IoMdSend onClick={handleUpload} size={30} />
        </div>
      </div>
    </div>
  );
};

export default Achromatopsia;
