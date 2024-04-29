import React, { useCallback, useMemo } from "react";

import { BsTwitterX } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { RiNotification2Line } from "react-icons/ri";
import { LuSearch } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { RiFileListLine } from "react-icons/ri";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";


import Image from "next/image";
import { useCurrentUser } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";


import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { useQueryClient } from "@tanstack/react-query";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import Link from "next/link";

interface XSidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string
}



interface XLayoutProps {
  children: React.ReactNode;
}

const XLayout: React.FC<XLayoutProps> = (props) => {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const sidebarMenuItems:XSidebarButton[]= useMemo(()=>
    [ 
      {
        title: "Home",
        icon: <GoHome />,
        link: "/"
      },
      {
        title: "Explore",
        icon: <LuSearch />,
        link: "/"

      },
      {
        title: "Notifications",
        icon: <RiNotification2Line />,
        link: "/"

      },
      {
        title: "Messages",
        icon: <MdOutlineMailOutline />,
        link: "/"

      },
      {
        title: "Communities",
        icon: <BsPeople />,
        link: "/"

      },
      {
        title: "Lists",
        icon: <RiFileListLine />,
        link: "/"

      },
      {
        title: "Profile",
        icon: <CgProfile />,
        link: `/${user?.id}`
      },
      {
        title: "More",
        icon: <HiOutlineDotsCircleHorizontal />,
        link: "/"

      },
    ],[user?.id])



  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) {
        return toast.error(`Google token not found`);
      }

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success("Veified successfully");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken)
        window.localStorage.setItem("__token__", verifyGoogleToken);

      await queryClient.invalidateQueries({ queryKey: ["curent-user"] });
    },
    [queryClient]
  );

  return (
    <div className="grid grid-cols-12 h-screen w-screen">
      <div className="col-span-3 pl-16 pt-3 relative">
        <div className="h-fit px-4 cursor-pointer">
          <BsTwitterX className="text-3xl" />
        </div>
        <div className="mt-8">
          <ul>
            {sidebarMenuItems.map((item) => (
              <li key={item.title}>
                <Link className="flex justify-start items-center gap-2 my-3 cursor-pointer w-fit hover:bg-[#181818] rounded-full px-4 py-2" href={item?.link}>
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-xl">{item.title}</span>
                </Link>
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
        {props.children}
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
  );
};

export default XLayout;
