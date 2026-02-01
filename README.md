


# Talent-IQ 🚀

**Full-Stack Real-Time Technical Interview & Collaboration Platform**

Talent-IQ is a professional-grade workspace designed to bridge the gap between solo coding practice and real-world technical interviews. It enables developers to host live, collaborative coding sessions featuring synchronized editors, integrated video conferencing, and real-time code execution.

---

## 🌟 Key Features

- **Real-Time Collaborative Coding**  
  Powered by **Yjs (CRDTs)** and **WebRTC**, allowing multiple users to edit code simultaneously with zero conflicts—similar to Google Docs.

- **Integrated Video & Chat**  
  Low-latency video calls and messaging using the **Stream.io SDK**.

- **Live Code Execution**  
  Execute code in **20+ languages** instantly via the **Piston API**, with a dedicated output console.

- **Shared Workspace UI**  
  Dynamic and resizable layout using `react-resizable-panels` to balance problem statements, editor, and video feeds.

- **Problem Repository**  
  Built-in LeetCode-style problems with descriptions, constraints, and starter templates.

- **Secure Authentication**  
  User authentication and protected routes handled via **Clerk**.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 + Vite  
- **Styling:** TailwindCSS + DaisyUI  
- **Code Editor:** Monaco Editor (VS Code core)  
- **Real-Time Sync:** Yjs, y-webrtc, y-monaco  
- **State & Data Fetching:** TanStack Query  
- **Video & Chat:** Stream.io React SDK  

### Backend
- **Runtime:** Node.js + Express.js  
- **Database:** MongoDB + Mongoose  
- **Authentication:** Clerk Node SDK  
- **Background Jobs:** Inngest  
- **Code Execution:** Piston API  

---

## 🏗️ Architecture: Real-Time Collaboration

Talent-IQ uses a **Peer-to-Peer (P2P)** model for collaborative editing:

1. **Shared State:**  
   Yjs manages a shared text document for the editor.

2. **Concurrency Handling:**  
   CRDTs ensure simultaneous edits merge deterministically without overwriting changes.

3. **Transport Layer:**  
   `y-webrtc` establishes direct peer connections, enabling real-time sync without routing editor updates through the backend database.

This approach results in **low latency**, **high scalability**, and **conflict-free collaboration**.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas cluster
- API keys for **Clerk**, **Stream.io**, and **Inngest**

---

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/your-username/talent-iq.git
cd talent-iq


#### 2. Install dependencies

```bash
# Root & backend
npm install

# Frontend
cd frontend
npm install
```

#### 3. Environment configuration

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret
STREAM_API_KEY=your_stream_key
STREAM_SECRET_KEY=your_stream_secret
```

#### 4. Run the application

```bash
npm run dev
```

The app will start both **frontend and backend concurrently**.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch

   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes

   ```bash
   git commit -m "Add AmazingFeature"
   ```
4. Push to the branch

   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request


## ❤️ Acknowledgements

Built with passion for developers preparing for real-world technical interviews.
