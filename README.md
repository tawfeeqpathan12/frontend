# 🌱 EcoTrack – Personal Carbon Footprint Tracker

**EcoTrack** is an innovative web application designed to help users calculate and monitor their personal carbon footprint. By tracking daily lifestyle choices—such as food habits, transportation modes, and energy consumption—it provides personalized AI-based suggestions to promote sustainable living.

---

## 🔗 Live Demo

🔗 [EcoTrack App](https://ecotrack-gla.netlify.app/)

---

## 📸 Sample Screenshots

### 🏠 Landing Page
![Landing Page](https://res.cloudinary.com/deodsnio3/image/upload/v1753148895/EcoTrackLandingPage_img_r4klnt.png)

### 📊 Dashboard
![Dashboard](https://res.cloudinary.com/deodsnio3/image/upload/v1753149287/ETDashboard_2.0_uyzhwe.png)

### 🔐 SignUp Page
![SignUp Page](https://res.cloudinary.com/deodsnio3/image/upload/v1753148894/ETSignupPage_img_ad8i47.png)

### 🤖 AI Assistance
![AI Assistance](https://res.cloudinary.com/deodsnio3/image/upload/v1753149286/ETChatbot_2.0_e2glut.png)

---

## 📁 Repositories

- 🔸 **Frontend**: [EcoTrack Frontend](https://github.com/tawfeeqpathan12/frontend)
- 🔹 **Backend**: [EcoTrack Backend](https://github.com/tawfeeqpathan12/eco-backend)

---

## 🚀 Features

- 🌍 **Lifestyle Input**  
  Users can log daily activities (food, transport, energy) to calculate their carbon emissions.

- 🧮 **Real-Time Footprint Calculation**  
  Automated carbon emission estimates based on user choices.

- 📈 **Visual Dashboard**  
  Graphical representation of carbon output and comparisons.

- 🧠 **AI Suggestions via n8n**  
  Smart, personalized suggestions on reducing your environmental impact.

- 🔐 **JWT-Based Authentication**  
  Secure login and signup system with protected user sessions.

- 💻 **Modern, Responsive UI**  
  Clean interface built with React and Tailwind CSS.

- 🌐 **Cloud-Hosted APIs**  
  FastAPI-powered backend hosted on Render with MongoDB integration.

---

## 🛠️ Tech Stack

### 🧩 Frontend  
- ⚛️ React.js (Vite)
- 💨 Tailwind CSS v3.4.17  
- 📡 Axios  
- 🔐 Context API for Auth  
- 🌍 Netlify (Hosting)

### ⚙️ Backend  
- 🐍 Python FastAPI  
- 🔑 JWT Authentication  
- 🗄️ MongoDB  
- ☁️ Render (Hosting)

### 🧠 AI & Automation  
- 🔄 n8n (Open-source Workflow Automation for Eco Suggestions)

---

## 🧑‍💻 Local Setup Instructions

### 🔧 Prerequisites
- Node.js (Frontend)
- Python 3.10+ & pip (Backend)
- MongoDB Atlas
- n8n instance (cloud or self-hosted)

---

### 💻 Frontend Setup

```bash
git clone https://github.com/your-username/ecotrack-frontend.git
cd ecotrack-frontend
npm install
npm run dev
````

🧪 API endpoint (inside your frontend code):

```js
const API = "https://eco-backend-2.onrender.com/api";
```

🟢 App runs at: `http://localhost:5173`

---

### 🐍 Backend Setup

```bash
git clone https://github.com/your-username/ecotrack-backend.git
cd ecotrack-backend
pip install -r requirements.txt
```

📝 Create `.env` file:

```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

▶️ Run server:

```bash
uvicorn main:app --reload
```

🟢 API runs at: `http://localhost:8000`

---

## 🧾 Sample User Activities

Types of user input tracked:

* 🚗 **Transportation**: Car, Bike, Public Transport, Walking, Bicycle
* 🍔 **Food Choices**: Meat-based, Vegetarian, Vegan
* 🔌 **Energy Usage**: Electricity, Gas, Oil Heating

---

## 🤖 AI Suggestions (Powered by n8n)

We use **n8n** to:

* Receive user activity data
* Match and map carbon outputs
* Return contextual eco-suggestions
  *(e.g., reduce red meat, prefer bicycles, save electricity)*

---

## 👥 Team Members

* 👨‍💻 [**Tawfeeq Khan**](https://www.linkedin.com/in/tawfeeq-ahmad-khan-452b4b293/) – Full Stack Developer  
* 👨‍💻 [**Paras Tyagi**](https://www.linkedin.com/in/paras-tyagi-772a9336b/) – Full Stack Developer  
* 👨‍💻 [**Raish Vadaviya**](https://www.linkedin.com/in/raish-vadaviya/) – Full Stack Developer

---


## 🙌 Acknowledgements

Thanks to all the amazing tools that powered this project:

* React & Vite
* Tailwind CSS
* FastAPI & Python
* MongoDB
* JWT Auth
* n8n Automation Tool
* Netlify & Render Hosting


