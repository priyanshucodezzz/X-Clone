'use client'
import React, { useCallback } from "react";

import { BsTwitterX } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { RiNotification2Line } from "react-icons/ri";
import { LuSearch } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { RiFileListLine } from "react-icons/ri";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";

import FeedCard from "@/components/FeedCard";

import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";




interface XSidebarButton{
  title: string;
  icon : React.ReactNode;
}

const sidebarMenuItems: XSidebarButton[] = [
  {
    title : 'Home',
    icon : <GoHome/>
  },
  {
    title : 'Explore',
    icon : <LuSearch/>
  },
  {
    title : 'Notifications',
    icon : <RiNotification2Line/>
  },
  {
    title : 'Messages',
    icon : <MdOutlineMailOutline/>
  },
  {
    title : 'Communities',
    icon : <BsPeople/>
  },
  {
    title : 'Lists',
    icon : <RiFileListLine/>
  },
  {
    title : 'Profile',
    icon : <CgProfile/>
  },
  {
    title : 'More',
    icon : <HiOutlineDotsCircleHorizontal/>
  }
]

export default function Home() {
  const handleLoginWithGoogle = useCallback(async(cred: CredentialResponse)=>{
        const googleToken =  cred.credential
        if(!googleToken){
          return toast.error(`Google token not found`)
        }
        
        const {verifyGoogleToken} = await graphqlClient.request(verifyUserGoogleTokenQuery , {token : googleToken})

        toast.success('Veified successfully')
        console.log(verifyGoogleToken)

        if(verifyGoogleToken) window.localStorage.setItem("__token__" , verifyGoogleToken)
  },[])
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen">
        <div className="col-span-3 pl-16 pt-3">
          <div className="h-fit px-4 cursor-pointer">
            <BsTwitterX className="text-3xl"/>
          </div>
          <div className="mt-8">
            <ul>
              {sidebarMenuItems.map(item => <li className="flex justify-start items-center gap-2 my-3 cursor-pointer w-fit hover:bg-[#181818] rounded-full px-4 py-2" key={item.title} ><span className="text-3xl">{item.icon}</span><span className="text-xl">{item.title}</span></li> )}
            </ul>
            <button className="bg-[#1d9bf0] w-2/3 py-3 rounded-full font-semibold">Post</button>
          </div>
        </div>
        <div className="col-span-5 border-x-[0.2px] h-screen overflow-scroll border-x-gray-600">
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
        </div>
        <div className="col-span-4 p-5">
          <div className="px-5 py-3 bg-slate-500 rounded-md w-fit">
            <h1 className="text-center text-xl font-semibold my-2">New to X ?</h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle}/>
          </div>
        </div>
      </div>
    </div>
  );
}
