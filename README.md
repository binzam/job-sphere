# Job-Sphere

## 🚀 Overview

**Job-Sphere** is an interactive job board platform built with **React** and **JSON Server** that allows users to browse, search, filter, and apply for job postings. The platform provides a **seamless and responsive user experience**, with features such as ** basic user authentication, dynamic job fetching, advanced filtering, and job application forms**.

## 🎯 Features

### ✅ API Data Integration

- Dynamically fetche job postings from a backend API.
- Implements error handling and loading states for a smooth experience.

### ✅ Advanced Filtering Options

Users can filter job listings by:

- **Category** (e.g., Engineering, Business, Finance)
- **Location** (e.g., Remote, USA, Canada)
- **Experience Level** (Junior-Level, Mid-Level, Senior)

### ✅ Responsive & Accessible Design

- Fully **responsive UI** for desktop, tablet, and mobile devices.
- Ensures **accessibility** with ARIA guidelines and intuitive navigation.

### ✅ Job Application Form

- User-friendly, validated application forms.
- Ensures proper input validation and error handling.

### ✅ Job Sharing Options

- Share job postings via **Facebook, X (Twitter), WhatsApp, and Email**.
- **Copy job link** feature for easy sharing.

## 🔧 Technologies Used

| Technology         | Purpose                         |
| ------------------ | ------------------------------- |
| **React 19**       | Frontend framework              |
| **React Router**   | Navigation management           |
| **Context API**    | State management                |
| **JSON Server**    | Mock backend API                |
| **Axios**          | HTTP requests handling          |
| **React Icons**    | UI enhancements                 |
| **React Spinners** | Loading animations              |
| **Dompurify**      | Prevents XSS attacks            |
| **BcryptJS**       | Secure password hashing         |
| **Vite**           | Fast development and build tool |
| **ESLint**         | Code quality enforcement        |

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/binzam/job-sphere.git
cd job-sphere
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root of your project and add the following line

```env
VITE_API_URL=http://localhost:5000/
```

### 4️⃣ Start the Development Server

```sh
npm run dev
```

### 5️⃣ Start JSON Server

```sh
npx json-server --watch data/db.json --port 5000
```

> Ensure `db.json` contains mock job data for proper API responses.

## 🌐 Deployment

- **The project can be deployed using Vercel or Netlify:**

### Build the project:

```sh
npm run build
```

- **Deploy the dist folder to Vercel or Netlify.**

## 🔗 Live Demo

Check out the live version of Job-Sphere here:  
[https://job-sphere-alx.netlify.app/](https://job-sphere-alx.netlify.app/)

## 🎥 Video Demo

Watch the demonstration of the project on YouTube:  
[https://www.youtube.com/watch?v=RWxqzyIN3f0](https://www.youtube.com/watch?v=RWxqzyIN3f0)

## 🔮 Future Enhancements

🚀 **Upcoming features:**

- **Integrate with a real backend server** for dynamic data handling and production-level performance.
- **User authentication** for personalized job recommendations.
- **Real-time notifications** for job updates.
- **SEO optimization** to improve job listing visibility.

🎉 Thank You!

Feel free to contribute, report issues, or suggest improvements! 🚀

📧 Contact: [btechan@gmail.com]🔗 GitHub: [https://github.com/binzam]
