import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaRegCircleUser } from "react-icons/fa6";

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector((store) => store.auth);
  return (
    <div className="my-10">
      <div className="flex items-center justify-between text-sm">
        <h1 className="font-semibold text-gray-600">Suggested for you</h1>
        <span className="font-medium cursor-pointer ml-2">See All</span>
      </div>
      {suggestedUsers?.map((user) => {
        return (
          <div
            key={user._id}
            className="flex items-center justify-between my-5"
          >
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
            <span className="text-[#3BADF8] text-sm font-bold  cursor-pointer hover:text-[#3bacf8c6]">
              Follow
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestedUsers;
