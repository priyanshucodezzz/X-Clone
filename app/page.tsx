'use client'
import React, { useCallback, useState } from "react";

import { BsTwitterX } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { RiNotification2Line } from "react-icons/ri";
import { LuSearch } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { RiFileListLine } from "react-icons/ri";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";

import { RiGalleryLine } from "react-icons/ri";
import { MdOutlineGifBox } from "react-icons/md";
import { BiPoll } from "react-icons/bi";
import { PiSmiley } from "react-icons/pi";



import FeedCard from "@/components/FeedCard";

import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useCreatePost, useGetAllPosts } from "@/hooks/post";
import { Post } from "@/gql/graphql";




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

  const {user} = useCurrentUser();
  const {posts = []} = useGetAllPosts();
  const {mutate} = useCreatePost();

  const queryClient = useQueryClient()

  const [content , setContent] = useState("");
   

  const handleSelectImage = useCallback(()=>{
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.click();
  },[]);

  const handleCreatePost = useCallback(()=>{
      mutate({
        content,
      })
      setContent('')
  },[content,mutate]);

  const handleLoginWithGoogle = useCallback(async(cred: CredentialResponse)=>{
        const googleToken =  cred.credential
        if(!googleToken){
          return toast.error(`Google token not found`)
        }
        
        const {verifyGoogleToken} = await graphqlClient.request(verifyUserGoogleTokenQuery , {token : googleToken})

        toast.success('Veified successfully')
        console.log(verifyGoogleToken)

        if(verifyGoogleToken) window.localStorage.setItem("__token__" , verifyGoogleToken)

        await queryClient.invalidateQueries({queryKey: ["curent-user"]});

  },[queryClient])
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen">
        <div className="col-span-3 pl-16 pt-3 relative">
          <div className="h-fit px-4 cursor-pointer">
            <BsTwitterX className="text-3xl" />
          </div>
          <div className="mt-8">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li
                  className="flex justify-start items-center gap-2 my-3 cursor-pointer w-fit hover:bg-[#181818] rounded-full px-4 py-2"
                  key={item.title}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-xl">{item.title}</span>
                </li>
              ))}
            </ul>
            <button className="bg-[#1d9bf0] w-2/3 py-3 rounded-full font-semibold">
              Post
            </button>
          </div>

          {user && (
            <div className=" absolute bottom-5 flex items-center gap-2 px-3 py-2 rounded-full hover:bg-[#181818]">
              {user && user?.avatar && (
                <Image
                  src={user?.avatar}
                  alt="avatar"
                  className="rounded-full"
                  height={40}
                  width={40}
                />
              )}
              <div className="flex gap-1">
                <h3 className="text-base font-medium">{user?.firstname}</h3>
                <h3 className="text-base font-medium">{user?.lastname}</h3>
              </div>
            </div>
          )}

        </div>

        <div className="col-span-5 border-x-[0.2px] h-screen overflow-y-scroll no-scrollbar border-x-gray-600">
          <div>
            <div className="border-b-[0.2px] border-gray-600 p-5 hover:bg-[#181818] cursor-pointer transition-all"></div>
            <div className="grid grid-cols-12 px-4 mt-2">
              <div className="col-span-1 w-14 h-14">
                  {user && user.avatar && <Image className="rounded-full w-10 h-10" src={user?.avatar} alt="user image" height={40} width={40} />}
              </div>
              <div className="col-span-11 m-2">
                <div>
                    <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full bg-transparent text-xl border-b border-slate-600 resize-none focus:outline-none" placeholder="What's happening?!" rows={3}></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <RiGalleryLine onClick={handleSelectImage} className="text-xl text-[#1d9bf0]"/>  
                    <MdOutlineGifBox className="text-xl text-[#1d9bf0]"/>  
                    <BiPoll className="text-xl text-[#1d9bf0]"/>  
                    <PiSmiley className="text-xl text-[#1d9bf0]"/>  
                  </div>
                  <div>
                    <button onClick={handleCreatePost} className="bg-[#1d9bf0] px-4 py-2 rounded-full font-semibold">Post</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            posts && posts?.map((post)=> post ? <FeedCard key={post?.id} data={post as Post}/> : null)
          }
        </div>

        <div className="col-span-4 p-5">
          {!user && (
            <div className="px-5 py-3 bg-slate-500 rounded-md w-fit">
              <h1 className="text-center text-xl font-semibold my-2">
                New to X ?
              </h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
