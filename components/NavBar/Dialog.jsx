import Link from 'next/link';
import React from 'react';
import { TbHistory as History } from "react-icons/tb";
import { IoSettingsOutline as Settings } from "react-icons/io5";
import { LuLogOut as LogOut } from "react-icons/lu";

const Dialog = () => {
  return (
    <div>
        <div className=' border border-gray-800 rounded-lg bg-[#111113] py-4 pl-4 pr-10 text-gray-400 w-auto text-sm'>
            <div className=' flex flex-col items-start'>
                <h1 className=' flex items-center gap-2 justify-center my-2'><History /><span>History</span></h1>
                <h1 className=' flex items-center gap-2 justify-center my-2'><Settings /><span>Settings</span></h1>
            </div>
            <div className=' flex items-start border-t w-full border-gray-700'>
                <Link href={'/'} className=' flex items-center gap-2 justify-center my-2'><LogOut /><span>Logout</span></Link>
            </div>
        </div>
    </div>
  )
}

export default Dialog