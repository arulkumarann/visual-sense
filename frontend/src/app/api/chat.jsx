"use client";
import React, { useState, useEffect } from "react";
import { IoMdMic, IoMdSend } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

const ChatApp = () => {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [speechRecognition, setSpeechRecognition] = useState(null);

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
        startListening();
      }
      // You can add more shortcuts here
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const sendMessage = (text, isPrompt) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text, type: isPrompt ? "prompt" : "response" },
    ]);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleRemoveImage = () => {
    setFile(null);
    setImagePreview(null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first.");
      return;
    }

    const myprompt = prompt;

    sendMessage(myprompt, true); // Send user prompt
    // sendMessage(text, false); // Send AI response
    // setFile(null);
    // setImagePreview(null);
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
      speechRecognition.start(); // Start speech recognition
    } else {
      alert("Speech recognition not supported in this browser.");
    }
  };
  return (
    <div className="no-scrollbar font-extrabold">
      <div
        className="flex flex-col justify-between border-[0.1px] border-white/40 rounded-xl w-1/2 h-[90vh] mx-auto m-10 no-scrollbar bg-black"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="overflow-y-auto overflow-x-hidden no-scrollbar">
          <div className="border border-white/30 w-fit mt-4 ml-4 mr-4 mb-2  p-4 rounded-2xl bg-green-500">
            Welcome To VisualSense
          </div>
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
        <div className="flex justify-evenly items-center justify-self-end  border-t-[0.1px]  border-white/40 p-5 h-fit">
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

export default ChatApp;
