// useGetRTM.js
import { setMessages } from "@/redux/chatSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "../socketInstance,";

const useGetRTM = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((store) => store.chat);
  const socket = getSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
    });

    return () => {
      socket.off("newMessage");
    };
  }, [messages, dispatch]);
};

export default useGetRTM;
