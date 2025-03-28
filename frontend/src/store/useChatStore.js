import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { useAuthStore } from './useAuthStore';


export const useChatStore = create((set,get) => ({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    

    getUsers:async()=>{
        set({isUsersLoading:true});
        try {
            const res = await axiosInstance.get('messages/users');
            // console.log(res.data.users)
            set({users:res.data.users});
        } catch (error) {
            toast.error('Failed to fetch users');
        }
        finally{
        set({isUsersLoading:false});
    }
    },
    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            // console.log(userId)
          const res = await axiosInstance.get(`messages/${userId}`);
        //   console.log(res)
          set({ messages: res.data});
          
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isMessagesLoading: false });
        }
      },
    sendMessage:async(messageData)=>{
        const {selectedUser,messages} = get();
        try {
            const res=await axiosInstance.post(`messages/send/${selectedUser._id}`,messageData);
            set({messages:[...messages,res.data]})
        } catch (error) {
            toast.error(error.response.data.message);
            
        }
    },

    subscribeToMessages:()=>{
      const {selectedUser} = get();
      if(!selectedUser){
          return;
      }

      const socket=useAuthStore.getState().socket;

      socket.on('newMessage',(newMessage)=>{
        // console.log(newMessage)
        if(newMessage.senderId===selectedUser._id || newMessage.receiverId===selectedUser._id){
        set({messages:[...get().messages,newMessage]});
         }
      })
    },
    unSubscribeFromMessages:()=>{
        const socket=useAuthStore.getState().socket;
        socket.off('newMessage');
    },
//update setselected user in future
setSelectedUser: (selectedUser) => {
    // set({ messages: [] });
    // console.log(selectedUser)
    set({ selectedUser });
  },
}))