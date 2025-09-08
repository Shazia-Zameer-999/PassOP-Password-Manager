# PassOP - Your Own Secure Password Manager!
Hey there! I built PassOP, a super secure and modern password manager, from scratch using the MERN stack. It's got a full login system, so you can safely save all your passwords in your own private space. This was a really fun project where I got to dive deep into everything from building a secure backend to creating a slick, easy-to-use frontend!

## ✨ What It Can Do!
* Log In Securely: You can sign up and log in to your own account! I used JWTs for sessions and hashed all the passwords with bcryptjs, so everything is super safe.

* Your Own Private Vault: Once you're logged in, your password vault is completely private. Only you can ever see the passwords you save.

* Full Control of Your Passwords: You can easily add, view, update, and delete any of your passwords.

* Customize Your Profile: You can even upload your own profile picture! The backend uses multer to handle the image uploads.

* Extra Secure Profile Changes: Want to change your password? No problem! But first, you'll have to re-enter your old password for extra security.

* Generate Strong Passwords: Can't think of a good password? Just click the button, and the app will generate a strong, random one for you right on the spot!

### A Slick & Modern UI:

* The whole thing is built with Tailwind CSS, so it looks great on any device.

* The navbar has a cool profile dropdown that shows your info.

* It even shows the live star count from the project's GitHub repo!

* You'll get nice little pop-up notifications for pretty much everything you do.

* Plus, there are lots of fun hover effects and interactive icons!
---
### 📸 Screenshots

### 🛠️  The Tech I Used 

| Category      | Technology                                |
|---------------|-------------------------------------------|
| Frontend      | React, Vite, React Router, Tailwind CSS   |
| Backend       | Node.js, Express.js                       |
| Database      | MongoDB                                   |
| Auth          | JSON Web Tokens (JWT), bcryptjs           |
| File Upload   | Multer                                    |

## 🚀 Want to run it yourself?
#### Awesome! To get a copy running on your own machine, just follow these simple steps.

First Things First
Before you start, make sure you have these things installed:

* Node.js (version 18 or newer is best)

* npm (this usually comes with Node)

* MongoDB (make sure it's running!)

* nodemon (it's a handy tool for restarting the server automatically)

#### Let's Get It Set Up!
1. Clone the repo:
```
git clone [https://github.com/Shazia-Zameer-999/PassOP-Password-Manager.git](https://github.com/Shazia-Zameer-999/PassOP-Password-Manager.git)

```
2. Jump into the project folder:
```
cd PassOP-Password-Manager
```

3. Install the frontend stuff:
* this will install all the dependencies written in your package.json
```
npm install
```

4. Install the backend stuff:
```
cd backend
npm install
```

5. Set Up Your Secret Keys:

* In the backend folder, create a new file and name it .env.

* Add these two lines, but with your own secret values:
```
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_and_long_jwt_key_here
```

6. Run the App!
You'll need two terminals open for this.

* Terminal 1: Start the Backend (make sure you're in the backend folder)
```
cd backend
nodemon server.js

```
* Terminal 2: Start the Frontend (from the main project folder)
```
npm run dev
```

That's it! The app should now be running on <u> http://localhost:5173 </u>. Have fun!

<<<<<<< HEAD
### Built with ❤️ by Shazia Zameer.
=======
### Built with ❤️ by Shazia Zameer.
>>>>>>> 49e35c7438d5ffebdbcaba13762da5d732c66f0d
