# PassOP - Your Own Password Manager

A full-stack password manager application built with React and Node.js. This application allows users to securely save, view, edit, and delete their passwords for various websites.


![PassOP Screenshot](PASTE_YOUR_IMAGE_URL_HERE)


## ✨ Features

- **Secure Storage:** All passwords are saved in a MongoDB database.
- **CRUD Functionality:** Full Create, Read, Update, and Delete operations for passwords.
- **Copy to Clipboard:** Easily copy usernames and passwords with a single click.
- **Responsive Design:** A clean and modern UI that works on all screen sizes.
- **Live Star Counter:** Displays the repository's star count fetched from the GitHub API.


## 🛠️ How to Run Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js installed
* npm installed
* MongoDB installed and running

### Installation & Setup

1.  **Clone the repo:**
    ```sh
    git clone [https://github.com/Shazia-Zameer-999/PassOP-Password-Manager.git](https://github.com/Shazia-Zameer-999/PassOP-Password-Manager.git)
    ```
2.  **Install Frontend Dependencies:**
    ```sh
    cd PassOP-Password-Manager
    npm install
    ```
3.  **Install Backend Dependencies:**
    ```sh
    cd backend
    npm install
    ```
4.  **Create a `.env` file** in the `backend` folder and add your MongoDB connection string:
    ```
    MONGO_URI=your_mongodb_connection_string
    ```
5.  **Run the Backend Server:**
    ```sh
    # From the 'backend' folder
    npm run dev
    ```
6.  **Run the Frontend App:**
    ```sh
    # From the root 'PassOP-Password-Manager' folder
    npm run dev
    ```
