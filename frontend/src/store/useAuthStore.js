import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { Drama } from 'lucide-react';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.MODE=== 'development'?'http://localhost:5001':'/';

export const useAuthStore = create((set,get) => ({
    authUser: null,
    isLoggingIn: false,
    isSigningUp: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    socket:null,

    onlineUsers:[],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('auth/check');

            set({ authUser: res.data })
            get().connectSocket();
        } catch (error) {
            console.log('error checking auth', error)
            set({ authUser: null })
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },

    setAuthUser: (data) => {
        set({ authUser: data })
        set({ isCheckingAuth: false })
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post('auth/signup', data);
            set({ authUser: res.data })
            toast.success('Account created successfully')

            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log('error signing up', error)  
        }
        finally {
            set({ isSigningUp: false })
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post('auth/login', data);
            set({ authUser: res.data })
            toast.success('Logged in successfully')
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log('error logging in', error)
        }
        finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('auth/logout');
            set({ authUser: null })
            toast.success('Logged out successfully')

            get().disConnectSocket();
        } catch (error) {
            toast.error('Error logging out')
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put('/auth/update-profile', data);
            // const res = await axiosInstance.put('/auth/update-profile', data, {
            //     headers: {
            //         "Content-Type": "application/json"
            //     }
            // });
            set({ authUser: res.data })
            toast.success('Profile updated successfully')


        } catch (error) {
            toast.error('Error updating profile')
            console.log('error updating profile', error.message)
        } finally {
            set({ isUpdatingProfile: false })
        }
    },

    connectSocket: () => {
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return

        const socket=io(BASE_URL,{
            query:{
                userId:authUser._id
            },
        });
        socket.connect(); 

        set({socket:socket})


        socket.on('getOnlineUsers',(data)=>{
            set({onlineUsers:data})
        })

        },
    disConnectSocket: () => {
        if(get().socket?.connected){
            get().socket.disconnect();
        }
    }


 
}));