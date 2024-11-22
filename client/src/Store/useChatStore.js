import { create } from "zustand";
import toast from "react-hot-toast";


export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

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
    try {
      useEffect(() => {
        const fetchMessages = async () => {
          set({ isMessagesLoading: true });
          try {
            const res = await axiosPrivate.get(`/messages/${userId}`);
            set({ messages: res.data });
          } catch (error) {
            toast.error(error.response.data.message);
          } finally {
            set({ isMessagesLoading: false });
          }
        };

        fetchMessages();
      }, [userId]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData, axiosPrivate) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosPrivate.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  receiverUser: async (axiosPrivate) => {
    const { selectedUser } = get();

    try {
      const res = await axiosPrivate("/message/receiver/" + selectedUser);
      // Log the response data
      console.log(res.data.data)
      return res.data.data;       // Return the response for further use
    } catch (error) {
      console.error("Error fetching receiver user:", error.message);
      // Optional: Handle the error gracefully, e.g., return a default value or throw
      throw error;
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));