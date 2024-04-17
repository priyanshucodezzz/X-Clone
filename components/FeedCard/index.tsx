import React from "react";
import Image from "next/image";

import { FaRegComment , FaBookmark , FaRegBookmark} from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { PiHeartBold } from "react-icons/pi";
import { PiHeartFill } from "react-icons/pi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { Post } from "@/gql/graphql";


interface FeedCardProps {
    data: Post
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
    const {data} = props;


    return ( 
    <div className="border-t-[0.2px] border-gray-600 px-4 py-3 cursor-pointer ">
        <div className="grid grid-cols-12">
            <div className="col-span-1 w-14 h-14">
                {data?.owner?.avatar && <Image className="rounded-full w-10 h-10" src={data?.owner.avatar} alt="user image" height={40} width={40} />}
            </div>
            <div className="col-span-11">
                <div className="flex gap-1">
                    <h5 className="text-[15px] font-semibold">{data?.owner.firstname}</h5>
                    <h5 className="text-[15px] font-semibold">{data?.owner.lastname}</h5>
                </div>

                <p className="text-[15px]">{data?.content}</p>

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