import React from "react";
import Image from "next/image";

import { FaRegComment , FaBookmark , FaRegBookmark} from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { PiHeartBold } from "react-icons/pi";
import { PiHeartFill } from "react-icons/pi";
import { MdOutlineLeaderboard } from "react-icons/md";


const FeedCard: React.FC = () => {
    return ( 
    <div className="border-t-[0.2px] border-gray-600 p-5 hover:bg-[#181818] cursor-pointer transition-all">
        <div className="grid grid-cols-12">
            <div className="col-span-1 w-14 h-14">
                <Image className="rounded-full w-10 h-10" src="https://static.vecteezy.com/system/resources/previews/007/043/161/original/male-avatar-smiling-portrait-of-a-cheerful-young-man-with-a-happy-smile-vector.jpg" alt="user image" height={40} width={40} />
            </div>
            <div className="col-span-11">
                <h5 className="font-semibold">Priyanshu Kumar</h5>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur, assumenda. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi, omnis!</p>

                <div className="flex justify-between mt-3">
                    <div>
                        <FaRegComment className="text-lg"/>
                    </div>
                    <div>
                        <FaRetweet className="text-lg"/>
                    </div>
                    <div>
                        <PiHeartBold className="text-lg"/>
                    </div>
                    <div>
                        <MdOutlineLeaderboard className="text-lg"/>
                    </div>
                    <div>
                        <FaRegBookmark className="text-lg"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default FeedCard;