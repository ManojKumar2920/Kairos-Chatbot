"use client";
import Spinner from "@/components/Spinner/Spinner";
import Link from "next/link";
import React, { useState } from "react";
import { BsFillArrowRightSquareFill as Send } from "react-icons/bs";
import { GoArrowUpRight as Goto } from "react-icons/go";
import Image from "next/image";
import ChatGPT from "@/assests/chatgpt.png"; 
import { FaUserCircle as User } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const Page = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState(null);

  const handleInput = (event) => {
    const textarea = event.target;
    setPrompt(textarea.value);
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 192)}px`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setChatHistory([...chatHistory, { sender: "user", text: prompt }]); // Store user message

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setChatHistory([
        ...chatHistory,
        { sender: "user", text: prompt },
        { sender: "AI", text: data.text },
      ]); // Store AI response
      setPrompt(""); // Clear the text area after submission

    } catch (error) {
      console.error("Error fetching the API:", error);
      setError("Error: " + error.message);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen text-white">
      <div className="pt-20 pb-36 w-4/5 mx-auto">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`${
                message.sender === "user"
                  ? " text-white flex flex-row-reverse items-center justify-start"
                  : "  text-white flex items-start"
              } p-3 rounded-lg max-w-lg w-[600px]  overflow-y-auto`}
            >
              {message.sender === "user" &&(
                <div className=" ml-2 text-[24px]">
                  <User />
                </div>
              )
              }
              {message.sender === "AI" && (
                <div className="bg-[#fafafa] rounded-md p-1 w-[26px] h-[26px] mr-2 flex-shrink-0">
                  <Image src={ChatGPT} alt="ChatGPT" width={24} height={24} />
                </div>
              )}
              <ReactMarkdown className="break-words">{message.text}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-4 bg-[#18181a] pt-1">
        <div className="w-screen flex justify-center flex-col items-center gap-3">
          <form className="border p-2 rounded-md border-gray-800 flex justify-around w-4/5 bg-[#111113]" onSubmit={handleSubmit}>
            <textarea
              type="text"
              placeholder="Enter your prompt here.."
              className="bg-inherit w-11/12 p-2 focus:outline-none max-w-full max-h-48 min-h-10 h-10 resize-none"
              onInput={handleInput}
              value={prompt}
            ></textarea>
            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : <Send size={24} />}
            </button>
          </form>

          <p className="text-[10px] text-gray-500 flex gap-1">
            Open Source AI Chatbot built with
            <Link
              href={"https://nextjs.org/"}
              className="flex items-start justify-center hover:underline"
            >
              Next.js <Goto />
            </Link>
            &
            <Link
              href={"https://aistudio.google.com/app/prompts/new_chat"}
              className="flex items-start justify-center hover:underline"
            >
              Gemini Model <Goto />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
