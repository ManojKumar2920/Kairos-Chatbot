'use client'
import Spinner from "@/components/Spinner/Spinner";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsFillArrowRightSquareFill as Send } from "react-icons/bs";
import { GoArrowUpRight as Goto } from "react-icons/go";
import Image from "next/image";
import ChatGPT from "@/assests/chatgpt.png";
import { FaUserCircle as User } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { FiCopy } from "react-icons/fi";
import { Toaster, toast } from 'sonner';
import axios from 'axios';


const Page = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState(null);
  const [showAbout, setShowAbout] = useState(true);

  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "40px";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setPrompt(e.target.value);
    
    // Handle Enter key press
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default newline behavior
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
  
    // Clear the text area after submission
    setPrompt("");
  
    // Show loading indicator (consider adding visual feedback)
    setIsLoading(true);
  
    // Store user message in chat history
    setChatHistory([...chatHistory, { sender: "user", text: prompt }]);
  
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      };
  
      const response = await fetch('/api', requestOptions);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const aiResponse = data.text.replace(/([.?!])\s*(?=[A-Z])/g, "$1\n");
  
      setChatHistory([
        ...chatHistory,
        { sender: "user", text: prompt },
        { sender: "AI", text: aiResponse },
      ]);
    } catch (error) {
      console.error("Error fetching the API:", error);
  
      // Update state to show an error message to the user
      setError("Failed to fetch response from AI. Please try again later.");
    } finally {
      // Hide loading indicator
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

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to Clipboard')
    });
  };

  useEffect(() => {
    if (chatHistory.length > 0) {
      setShowAbout(false);
    }
  }, [chatHistory]);

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      const codeText = String(children).replace(/\n$/, '');

      return !inline && match ? (
        <div>
          <div className="flex justify-between items-center bg-[#282828] text-white p-2 rounded-t-md">
            <span>{language.toUpperCase()}</span>
            <button
              className="text-white bg-gray-700 p-1 rounded hover:bg-gray-600"
              onClick={() => handleCopy(codeText)}
            >
              <FiCopy />
              <Toaster richColors  position="top-center" />
            </button>
          </div>
          <SyntaxHighlighter style={vscDarkPlus} wrapLines={true} language={language} PreTag="div" {...props}>
            {codeText}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <div className="min-h-screen text-white">
    {showAbout && ( 
        <div className="pt-24">
          <div className="flex items-center justify-center">
            <div className="w-1/2 bg-[#111113] p-6 rounded-lg border border-gray-800 md:w-4/5">
              <h1 className="font-bold text-2xl">Welcome to Kairos AI Chatbot! &#128075;</h1>
              <p className="text-gray-500 pt-4">This is an open source AI chatbot app built with Next.js and Gemini Lang Model.</p>
              <p className="text-gray-500 pt-4">Kairos is your trusted companion on the journey to programming mastery. Whether you're delving into the intricacies of front-end frameworks, exploring the depths of data analysis, or seeking guidance on cutting-edge technologies, Kairos is here to illuminate your path.</p>
            </div>
          </div>
        </div>
      )}
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
              } p-3 rounded-lg max-w-2xl w-auto  overflow-y-auto`}
            >
              {message.sender === "user" && (
                <div className=" ml-2 text-[24px]">
                  <User />
                </div>
              )}
              {message.sender === "AI" && (
                <div className="bg-[#fafafa] rounded-md p-1 w-[26px] h-[26px] mr-2 flex-shrink-0">
                  <Image src={ChatGPT} alt="ChatGPT" width={24} height={24} />
                </div>
              )}
              <ReactMarkdown className="break-words" components={components}>
                {message.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-4 bg-[#18181a] pt-1">
        <div className="w-screen flex justify-center flex-col items-center gap-3">
          <div
            className="border p-2 rounded-md border-gray-800 flex justify-around w-4/5 bg-[#111113] h-auto"
          >
            <textarea
              type="text"
              placeholder="Enter your prompt here.."
              className="bg-inherit w-11/12 p-2 focus:outline-none max-w-full max-h-48 h-10 resize-none"
              onInput={handleInput}
              onKeyDown={handleInput} 
              value={prompt}
            ></textarea>
            <button
              type="button"
              className="submit-button"
              disabled={isLoading}
              onClick={handleSubmit} // Handle form submission on button click
            >
              {isLoading ? <Spinner /> : <Send size={24} />}
            </button>
          </div>

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
