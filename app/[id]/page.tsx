"use client";

import { useRouter , useSearchParams , usePathname} from "next/navigation";
import FeedCard from "@/components/FeedCard";
import XLayout from "@/components/Layout/XLayout";
import { Post, User } from "@/gql/graphql";
import { useCurrentUser } from "@/hooks/user";
import type { NextPage } from "next";
import Image from "next/image";

import { FaArrowLeft } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { graphqlClient } from "@/clients/api";

import { getUserByIdQuery } from "@/graphql/query/user";
import { useEffect, useState } from "react";


interface ServerProps {
  userInfo?: User;
}


const UserProfilePage: NextPage<ServerProps> = () => {
  // const { user } = useCurrentUser();

  const [userInfo, setUserInfo] = useState<User | null>(null);

  const id = usePathname()?.split("/")[1]; //userId

  useEffect(() => {
    const fetchData = async () => {
        const data = await fetchUserData(id);
        setUserInfo(data);
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <XLayout>
        <div>
          <nav className="py-1 px-3 w-full flex gap-5 items-center border-b-[0.2px] bg-black z-10 border-b-gray-600 sticky top-0">
            <FaArrowLeft />
            <div>
              <h1>{userInfo?.firstname} <span>{userInfo?.lastname}</span></h1>
              <p className="text-sm text-[#71767B]">{userInfo?.posts?.length} Posts</p>
            </div>
          </nav>
          <div className="mb-4">
            <Image
              className="w-full"
              src="https://pbs.twimg.com/profile_banners/1243488968110309376/1711188337/1500x500"
              alt="header image"
              height={100}
              width={100}
            />
            <div className="p-4 border-b-[0.2px] border-b-yellow-600">
              <div className="flex items-center justify-between relative">
                <div>
                  {userInfo?.avatar && (
                    <div className="absolute bottom-[1%]">
                      <Image
                        className="rounded-full w-[133.5px] h-[133.5px]"
                        src={userInfo?.avatar}
                        alt="user image"
                        height={80}
                        width={80}
                      />
                    </div>
                  )}
                </div>
                <div className="h-[2.5rem] flex justify-center items-center cursor-pointer hover:bg-[#181919] text-[#E7E9EB] w-[113.17px] py-1 font-medium rounded-full border">
                  Edit Profile
                </div>
              </div>
              <div className="mb-4 mt-2">
                <p className="font-bold text-xl">{userInfo?.firstname} <span>{userInfo?.lastname}</span></p>
                <p className="text-sm text-[#71767B]">@xyzzzz</p>
              </div>
              <div className="mb-2">
                <p className="text-sm ">i write code...</p>
              </div>
              <div className="mb-2">
                <div className="flex items-center gap-1 cursor-pointer">
                  <span className="text-[#71767B] mr-2 flex items-center gap-1 text-base">
                    {" "}
                    <IoCalendarOutline /> Earth , Milky Way
                  </span>
                  <span className="text-[#71767B] flex items-center gap-1 text-base">
                    {" "}
                    <span>
                      <IoLocationOutline />
                    </span>{" "}
                    Joined April 2023
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm text-[#71767B]">
                  <span className="font-bold text-white">123</span> Following
                </p>
                <p className="text-sm text-[#71767B]">
                  <span className="font-bold text-white">3124</span> Followers
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          {userInfo?.posts?.map((post) => (
            <FeedCard key={post?.id} data={post as Post} />
          ))}
        </div>
      </XLayout>
    </div>
  );
};

export async function fetchUserData(id: string) {
  try {
    
    const userInfo = await graphqlClient.request(getUserByIdQuery, { id });

    // Check if user information is available
    if (!userInfo || !userInfo.getUserById) {
      console.warn(`No user found with ID: ${id}`);
      return null;
    }

    const user: User = userInfo.getUserById as User;
    return user;
  } catch (error) {
    console.error('Error fetching user information:', error);
    return null;
  }
}

export default UserProfilePage;
