# Chat Application (MERN Stack)

## 🚀 Overview

This is a real-time chat application built using the **MERN (MongoDB, Express.js, React, Node.js) stack**, integrated with **Socket.io** for instant messaging. The app supports **user authentication, image uploads via Cloudinary, and JWT-based security**.

## 🛠 Tech Stack

- **Frontend:** React.js, TailwindCSS, Daisy UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Real-time Communication:** Socket.io
- **Authentication:** JSON Web Tokens (JWT)
- **Cloud Storage:** Cloudinary
- **State Management:** Zustand

## ✨ Features

- **User Authentication** (Sign up, Login, JWT-based authentication)
- **Real-time messaging** using Socket.io
- **Send text and image messages** (Cloudinary for image storage)
- **User online/offline status tracking**
- **Protected API routes** with JWT middleware
- **Error handling on both client and server**
- **Timestamped messages** for accurate chat history

## 🔧 Installation & Setup

### 1️⃣ Backend Setup

```sh
git clone https://github.com/your-repo/chat-app.git
cd chat-app/backend
npm install
```

Create a **.env** file in the `backend` folder and add:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

Start the backend server:

```sh
npm start
```

### 2️⃣ Frontend Setup

```sh
cd ../frontend
npm install
npm start
```

## 🌍 Live Demo

[Chat App](https://fullstack-chat-app-o7hf.onrender.com)

## 🔑 Demo Credentials

- **Email:** [testuser@example.com](mailto\:testuser@example.com)
- **Password:** Test\@1234

## 🤝 Contributing

Feel free to fork this repository and create a pull request!

## 📜 License

This project is licensed under the **MIT License**.

