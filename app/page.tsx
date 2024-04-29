'use client'
import React, { useCallback, useState } from "react";

import { RiGalleryLine } from "react-icons/ri";
import { MdOutlineGifBox } from "react-icons/md";
import { BiPoll } from "react-icons/bi";
import { PiSmiley } from "react-icons/pi";

import FeedCard from "@/components/FeedCard";

import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { useCreatePost, useGetAllPosts } from "@/hooks/post";
import { Post } from "@/gql/graphql";
import  XLayout  from "@/components/Layout/XLayout";



export default function Home() {

  const {user} = useCurrentUser();
  const {posts = []} = useGetAllPosts();
  const {mutate} = useCreatePost();

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


  return (
    <div>
      <XLayout>
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
                    <RiGalleryLine onClick={handleSelectImage} className="text-xl text-[#1d9bf0] cursor-pointer"/>  
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
      </XLayout>
    </div>
  );
};
