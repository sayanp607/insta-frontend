import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import SuggestedUsers from "./SuggestedUsers";
const RightSidebar = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="w-fit my-10 pr-8 ">
      <div className="flex items-center gap-2 ">
        <Link to={`/profile/${user?._id}`}>
          <Avatar className="w-6 h-6">
            <AvatarImage src={user?.profilePicture} alt="@shadcn" />
            <AvatarFallback>
              <FaRegCircleUser />
            </AvatarFallback>
          </Avatar>
        </Link>

        <div>
          <h1 className="font-bold text-sm">
            <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
          </h1>
          <span className="text-gray-600 text-sm">
            {user?.bio || "Bio here.."}
          </span>
        </div>
      </div>
      <SuggestedUsers />
    </div>
  );
};

export default RightSidebar;
