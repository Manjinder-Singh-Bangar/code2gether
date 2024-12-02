import { create } from "zustand";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import UseAuth from "../Hooks/UseAuth";

export const useChatStore = create((set, get) => ({
  auth:null,
  setUserAuth:(newAuth) =>{
    console.log("setting new auth: " ,newAuth)
    set({auth: newAuth})
  },
  messages: [],
  userProfile: null,
  setUserProfile: (newUserProfile) => {
    console.log("setting new user profile: ", newUserProfile)
    set({userProfile: newUserProfile})
  },
  userId: null,
  setUserId: (newUserId) => set({ userId: newUserId }),
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  socket:null,
  onlineUsers:[],

  getUsers: async (axiosPrivate) => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosPrivate.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId, axiosPrivate) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosPrivate.get(`/message/${userId}`);
      console.log('Messages received:', res.data.data);
      set({ messages: res.data.data });

    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch messages');
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData, axiosPrivate) => {
    const { selectedUser, messages, socket } = get();

    if (!selectedUser) {
      toast.error("No user selected");
      return;
    }
    try {
      const res = await axiosPrivate.post(`/message/send/${selectedUser}`, {"text":messageData});
      const messageWithDate = {
        ...res.data,
        createdAt: new Date().toISOString()
      };
      set({ messages: [...messages, messageWithDate] });
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Erorr happened while sending message");
    }
  },

  receiverUser: async (axiosPrivate) => {
    const { selectedUser } = get();

    try {
      console.log('Making API request to:', `/message/receiver/${selectedUser}`);
      const res = await axiosPrivate.get(`/message/receiver/${selectedUser}`);
      console.log(res.data)
      return res    // Return the response for further use
    } catch (error) {
      console.error("Error fetching receiver user:", error.message);
      // Optional: Handle the error gracefully, e.g., return a default value or throw
      throw error;
    }
  },

  subscribeToMessage: () => {
    const {selectedUser, socket, messages} = get();
    console.log("socket: ", socket)
    if(!selectedUser || !socket) return;

    socket.on(`newMessage`, (message) => {
      console.log("new message received: ", message)
      set((state) => ({
        messages: [...state.messages, message]
      }));
    })
  },

  unsubscribeToMessage: () => {
    const {socket} = get();
    if(!socket) return;
    socket.off(`newMessage`)
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  connectSocket: () => {
    const {auth, userId} = get();
    
    if(!auth || get().socket?.connected) return;
    if(!userId) {
      toast.error("No user selected");
      return;
    }

    const socket = io("http://localhost:5000/", {
      query: { userId },
      transports: ['websocket'],
      reconnection: true
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      toast.error('Connection error. Please try again.');
    });

    socket.on('connection', () => {
      console.log('Socket connected successfully', socket.id);
    });

    socket.on("getOnlineUsers", (userIds) => {
      console.log("Received online users:", userIds);
      set({onlineUsers: userIds});
      console.log("online users set ", get().onlineUsers)
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected', socket.id);
    });

    set({socket:socket})
  },

  disconnectSocket:() => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({socket: null, onlineUsers: []}); // Clear socket and online users
      console.log('Socket disconnected and cleared', socket.id);
    }
    },
  }



));