<h1 align="center">
  <a href="">
    <img src="https://readme-typing-svg.herokuapp.com?font=Geist&size=40&pause=1000&color=36BCF7&center=true&vCenter=true&width=700&lines=PassOP+%F0%9F%94%92;Your+Own+Secure+Password+Manager" alt="PassOP Typing Animation" />
  </a>
</h1>



<p align="center">
  <em>A secure, modern, full-stack password manager built from scratch with the MERN stack.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
</p>

---

## 🎬 Project Demo

A quick walkthrough of PassOP's core features in action.

<div align="center">
  
  **
  <img src="/public/project_demo.gif" alt="Project Demo GIF"/>
  
</div>

---
### A Slick & Modern UI:

- The whole thing is built with Tailwind CSS, so it looks great on any device.

- The navbar has a cool profile dropdown that shows your info.

- It even shows the live star count from the project's GitHub repo!

- You'll get nice little pop-up notifications for pretty much everything you do.

- Plus, there are lots of fun hover effects and interactive icons!

---

## ✨ Key Features

* 🔐 **Secure Authentication:** Full user signup and login system using JWT for sessions and `bcryptjs` for password hashing.
* 🗄️ **Private Password Vault:** Once logged in, a user's password vault is completely private and accessible only to them.
* ✍️ **Full CRUD Functionality:** Easily **C**reate, **R**ead, **U**pdate, and **D**elete any saved password.
* 👤 **Customizable User Profiles:** Users can upload their own profile picture, which is handled by a `multer`-powered backend.
* 🛡️ **Enhanced Security:** To change a password, users must first verify their current password for an extra layer of security.
* 🎲 **Strong Password Generator:** Can't think of a good password? The app can generate a strong, random one instantly.
* 📱 **Slick & Responsive UI:** Built with Tailwind CSS, the interface is modern, clean, and looks great on any device, from mobile to desktop.
* 🔔 **User-Friendly Notifications:** Get toast notifications for all major actions, providing clear user feedback.

---
### 📸 Screenshots(Responsiveness)

<table>
<tr>
<td align="center"><strong>Phone view</strong></td>
<td align="center"><strong>Laptop/Tablet view</strong></td>
</tr>
<tr>
<td><img src="./screenshots/phone_login.png" alt="Login Page Screenshot" width="400"/></td>
<td><img src="./screenshots/tablet_login.png" alt="Login Page Screenshot" width="400"/></td>
</tr>
<tr>
<td><img src="./screenshots/phone_about.png" alt="Profile Page Screenshot" width="400"/></td>
<td><img src="./screenshots/tablet_about.png" alt="Profile Page Screenshot" width="400"/></td>
</tr>
<tr>
<td><img src="./screenshots/phone_footer.png" alt="Profile Page Screenshot" width="400"/></td>
<td><img src="./screenshots/tablet_footer.png" alt="Profile Page Screenshot" width="400"/></td>
</tr>
<tr>
<td><img src="./screenshots/phone_main.png" alt="Profile Page Screenshot" width="400"/></td>
<td><img src="./screenshots/tablet_main.png" alt="Profile Page Screenshot" width="400"/></td>
</tr>

</table>


[![My Skills](https://skillicons.dev/icons?i=react,nodejs,mongodb,express,tailwind,vite,vscode,git)](https://skillicons.dev)


## 🛠️ Tech Stack

| Category      | Technology                                                                                                                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | `React`, `Vite`, `React Router`, `Tailwind CSS`                                                                                                                                                                                               |
| **Backend** | `Node.js`, `Express.js`                                                                                                                                                                                                                     |
| **Database** | `MongoDB`                                                                                                                                                                                                                                   |
| **Auth** | `JSON Web Tokens (JWT)`, `bcryptjs`                                                                                                                                                                                                           |
| **File Upload** | `Multer`                                                                                                                                                                                                                                    |

---

## 🚀 Getting Started

To get a local copy up and running, just follow these simple steps.

### Prerequisites

Make sure you have these things installed before you start:
* [Node.js](https://nodejs.org/en/) (v18 or newer)
* [npm](https://www.npmjs.com/) (usually comes with Node)
* [MongoDB](https://www.mongodb.com/try/download/community) (make sure the service is running!)

### Installation & Setup

1.  **Clone the Repository**
    ```sh
    git clone [https://github.com/Shazia-Zameer-999/PassOP-Password-Manager.git](https://github.com/Shazia-Zameer-999/PassOP-Password-Manager.git)
    ```
2.  **Navigate to the Project Directory**
    ```sh
    cd PassOP-Password-Manager
    ```
3.  **Install Frontend Dependencies**
    ```sh
    npm install
    ```
4.  **Install Backend Dependencies**
    ```sh
    cd backend
    npm install
    ```
5.  **Set Up Environment Variables**
    * In the `backend` folder, create a new file named `.env`.
    * Add these two lines, replacing the placeholder values with your own secret keys:
        ```env
        MONGO_URI=your_mongodb_connection_string_here
        JWT_SECRET=your_super_secret_and_long_jwt_key_here
        ```
6.  **Run the Application**
    You'll need two separate terminals open to run both the frontend and backend servers.

    * **Terminal 1 (Backend):**
        ```sh
        cd backend
        nodemon server.js
        ```
    * **Terminal 2 (Frontend):**
        ```sh
        npm run dev
        ```
That's it! The app should now be running at **http://localhost:5173**.



[![Shazia Zameer's GitHub stats](https://github-readme-stats.vercel.app/api?username=Shazia-Zameer-999&show_icons=true&theme=dracula)](https://github.com/anuraghazra/github-readme-stats)
---


[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=Shazia-Zameer-999&layout=compact&theme=dracula)](https://github.com/anuraghazra/github-readme-stats)

![GitHub last commit](https://img.shields.io/github/last-commit/Shazia-Zameer-999/PassOP-Password-Manager)

![GitHub Repo stars](https://img.shields.io/github/stars/Shazia-Zameer-999/PassOP-Password-Manager?style=social)

[![trophy](https://github-profile-trophy.vercel.app/?username=Shazia-Zameer-999&theme=dracula&column=7)](https://github.com/ryo-ma/github-profile-trophy)

----

<p align="center">
Built with ❤️ by Daten Diva.
</p>