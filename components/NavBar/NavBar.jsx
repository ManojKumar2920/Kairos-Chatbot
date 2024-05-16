import Link from 'next/link';
import React from 'react'
import { FaGithub as Github } from "react-icons/fa";

const NavBar = () => {
  return (
    <div className=' bg-[#111113]'>
        <div className=' flex items-center justify-between w-screen px-8 py-3 border-b border-gray-800 '>
            <Link href={'/'}>
                <h1 className=' font-bold text-[16px]'>Kairos</h1>
            </Link>
            <div className=' flex gap-4'>
                <Link href={'https://github.com/ManojKumar2920/Kairos-Chatbot'} className=' flex border items-center justify-center gap-2 rounded-md p-2 border-gray-800'>
                    <Github /><span className=' font-medium text-[12px] sm:hidden'>GitHub</span>
                </Link>
                <Link href={'auth/login'} className=' flex border items-center justify-center gap-2 rounded-md py-2 px-4 bg-[#fafafa] border-gray-800'>
                    <span className=' font-bold text-[12px] text-[#111113]'>Login</span>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default NavBar;