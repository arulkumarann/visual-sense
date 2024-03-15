"use client";
import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCjaF7IpmDWBNq5LbPtD-IXLMfl_vi8VGo";
const genAI = new GoogleGenerativeAI(API_KEY);

async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

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

    // const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const myprompt = prompt;
    // const imageParts = await fileToGenerativePart(file);

    // const result = await model.generateContent([myprompt, imageParts]);
    // const response = await result.response;
    // const text = await response.text();
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
    <div
      className="bg-blue-100 w-fit h-screen flex flex-col justify-end mx-auto m-10 p-4 rounded-lg shadow-lg border "
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="bg-black p-4 rounded-md shadow-md flex flex-col">
        {imagePreview && (
          <div className="max-w-14 max-h-14">
            <img
              src={imagePreview}
              style={{ height: 200 }}
              alt="Uploaded Preview"
              className="max-h-14 max-w-14 mt-4 rounded-sm"
            />
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-10 border w-fit bg-blue-300 rounded-full  
            ${message.type === "prompt" ? "text-right" : "text-left"}`}
          >
            <p className="text-white">{message.text}</p>
          </div>
        ))}
        <div
          className="flex items-center gap-8 border justify-self-end p-5"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div
            className="border p-3 rounded-full"
            style={{ cursor: "pointer" }}
          >
            +
          </div>
          <div className="">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="px-4 py-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
            >
              +
            </label>
            <span id="fileName" className="ml-2"></span>
          </div>
          <input
            type="text"
            placeholder="Type your prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="border px-2 py-1 rounded-md flex-1 bg-black"
            required
          />
          <button
            onClick={startListening}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Start Speaking
          </button>
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Upload & Get Response
          </button>
          {file && (
            <button
              onClick={handleRemoveImage}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Remove Image
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
