'use client'
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { FaGithub as Github } from "react-icons/fa";
import Dialog from "./Dialog";

const NavBar = () => {

  const pathname = usePathname();

  const [showDialog, setShowDialog] = useState(false);

  const handleProfileClick = () =>{
    setShowDialog(!showDialog);
  }

  
  return (
    <div className=" fixed bg-[#111113] z-10">
      <div className=" flex items-center justify-between w-screen px-8 py-3 border-b border-gray-800 ">
        <Link href={"/"}>
          <h1 className=" font-bold text-[18px]">Kairos</h1>
        </Link>
        <div className=" flex gap-4">
          <Link
            href={"https://github.com/ManojKumar2920/Kairos-Chatbot"}
            className=" flex border items-center justify-center gap-2 rounded-md p-2 border-gray-800"
          >
            <Github />
            <span className=" font-medium text-[12px] sm:hidden">GitHub</span>
          </Link>

          
          {pathname === "/auth/login" ? (
            <Link
              href="/auth/signup"
              className="flex border items-center justify-center gap-2 rounded-md py-2 px-4 bg-[#fafafa] border-gray-800"
            >
              <span className="font-bold text-[12px] text-[#111113]">Signup</span>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="flex border items-center justify-center gap-2 rounded-md py-2 px-4 bg-[#fafafa] border-gray-800"
            >
              <span className="font-bold text-[12px] text-[#111113]">Login</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
