# Node.js Blog App (Mini Social App)  

## 📌 Description  
A group project built with **Node.js + Express + Firebase** following the **MVC pattern**.  
It’s a mini social application where users can register, create posts, comment, and manage their profiles.  
Includes authentication, roles (user/admin), and image uploads.  

---

## 🚀 Features  
- **Authentication (JWT + bcrypt)**  
  - Register / Login with hashed passwords.  
  - JWT tokens for protected routes.  

- **Email Verification (Bonus)**  
  - Verify email before accessing protected routes.  

- **Roles (User & Admin)**  
  - Users: manage their own posts & comments.  
  - Admins: manage all posts, comments, and users.  

- **CRUD Operations**  
  - Create, Read, Update, Delete posts.  
  - Add, edit, delete comments.  

- **User Profiles**  
  - View & update profile.  
  - Upload profile picture.  

- **Image Uploads (Firebase Storage)**  
  - Upload images for posts and profiles.  

- **Search & Filtering (Bonus)**  
  - Search posts by title or author.  
  - Filter posts by category.  

---

## 🛠 Tech Stack  
- **Node.js** + **Express.js**  
- **Firebase Firestore** (Database)  
- **Firebase Storage** (Image uploads)  
- **JWT** (Authentication)  
- **bcrypt** (Password hashing)  
- **Nodemailer** (Email verification)  

---

## 📂 Project Structure  

```
src/
├── config/          # Firebase config
├── middlewares/     # JWT & role middlewares
├── models/          # Firestore models
├── controllers/     # Business logic
├── routes/          # API routes
├── utils/           # Helpers (JWT, uploads)
├── app.js           # Express app setup
└── server.js        # Entry point
```

---

## ⚡ Installation & Setup  

1. **Clone the repository**  
```bash
git clone https://github.com/yasminmuhamma/nodejs-blog-app.git
cd nodejs-blog-app
```

2. **Install dependencies**  
```bash
npm install
```

3. **Setup environment variables** (`.env`)  
```
PORT=5000
JWT_SECRET=your_jwt_secret
FIREBASE_PROJECT_ID=xxxx
FIREBASE_PRIVATE_KEY=xxxx
FIREBASE_CLIENT_EMAIL=xxxx
```

4. **Run the project**  
```bash
npm start
```

---

## 👨‍👩‍👧 Team Members  
- Member 1 → Users & Authentication  
- Member 2 → Posts  
- Member 3 → Comments  
