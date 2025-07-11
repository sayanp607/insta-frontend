import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AtSign, Heart, MessageCircle } from "lucide-react";

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activetab, setActivetab] = useState("posts");
  const { userProfile, user } = useSelector((store) => store.auth);
  console.log(userProfile);

  const isloggedinuserProfile = user?._id === userProfile?._id;
  const isFollowing = true;

  const handleTabchange = (tab) => {
    setActivetab(tab);
  };

  const displayedPost =
    activetab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className="flex max-w-6xl justify-center mx-auto pl-10">
      <div className="flex flex-col gap-20 p-8">
        <div className="grid grid-cols-2">
          <section className="flex items-center justify-center">
            <Avatar className="h-30 w-30">
              <AvatarImage src={userProfile?.profilePicture} alt="profilepic" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-5">
                <span>{userProfile?.username}</span>
                {isloggedinuserProfile ? (
                  <>
                    <Link to="/account/edit">
                      <Button
                        variant="secondary"
                        className="hover:bg-gray-400 h-8"
                      >
                        Edit Profile
                      </Button>
                    </Link>
                    <Button
                      variant="secondary"
                      className="hover:bg-gray-400 h-8"
                    >
                      View Archieve Profile
                    </Button>
                    <Button
                      variant="secondary"
                      className="hover:bg-gray-400 h-8"
                    >
                      Ad tools
                    </Button>
                  </>
                ) : isFollowing ? (
                  <>
                    <Button variant="secondary" className=" h-8">
                      Unfollow
                    </Button>
                    <Button variant="secondary" className=" h-8">
                      Message
                    </Button>
                  </>
                ) : (
                  <Button variant="secondary" className="bg-[#45aef3] h-8">
                    Follow
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-4">
                <p>
                  <span className="font-semibold">
                    {userProfile?.posts?.length}{" "}
                  </span>
                  posts
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.followers?.length}{" "}
                  </span>
                  followers
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.following?.length}{" "}
                  </span>
                  following
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold">
                  {userProfile?.bio || "bio here..."}
                </span>
                <Badge className="w-fit" variant="secondary">
                  <AtSign />{" "}
                  <span className="pl-1">{userProfile?.username}</span>{" "}
                </Badge>
                <span>🤯{userProfile?.username}</span>
                <span>🤯Turing code into fun</span>
                <span>🤯DM for collaboration</span>
              </div>
            </div>
          </section>
        </div>
        <div className="border-t border-t-gray-200">
          <div className="flex items-center justify-center gap-10 text-sm">
            <span
              className={`py-3 cursor-pointer ${
                activetab === "posts" ? "font-bold" : ""
              }`}
              onClick={() => handleTabchange("posts")}
            >
              POSTS
            </span>
            <span
              className={`py-3 cursor-pointer pointer ${
                activetab === "saved" ? "font-bold" : ""
              }`}
              onClick={() => handleTabchange("saved")}
            >
              SAVED
            </span>
            <span className="py-3 cursor-pointer">REELS</span>
            <span className="py-3 cursor-pointer">TAGS</span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {displayedPost?.map((post) => {
              return (
                <div key={post?._id} className="relative group cursor-pointer">
                  <img
                    src={post.image}
                    alt="postimg"
                    className="rounded-sm-my-2 w-full aspect-square object-cover "
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center text-white space-x-4">
                      <button className="flex items-center gap-2 hover:text-gray-300 ">
                        <Heart />
                        <span>{post?.likes?.length}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-gray-300 ">
                        <MessageCircle />
                        <span>{post?.comments?.length}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
