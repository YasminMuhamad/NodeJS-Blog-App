# NodeJS Blog App - Group Project

## Project Description

This is a group project built using **Node.js + Express + Firebase** following the **MVC pattern**.
It is a mini social application where users can register, create posts, comment on them, and manage their profiles.
The project supports **Authentication with JWT + bcrypt**, roles (User / Admin), and image uploads.

---

## Project Structure

```
nodejs-group-project/
│
├── src/
│   ├── database/
│   │   ├── dbConnection.js
│   │   ├── serviceAccountKey.json
│   │   └── models/
│   │       ├── userModel.js
│   │       ├── postModel.js
│   │       └── commentModel.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   │
│   ├── modules/
│   │   ├── users/
│   │   │   ├── userController.js
│   │   │   └── userRouter.js
│   │   ├── posts/
│   │   │   ├── postController.js
│   │   │   └── postRouter.js
│   │   └── comments/
│   │       ├── commentController.js
│   │       └── commentRouter.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## Team Division

* **Member 1:** Users Module (userModel + userController + userRouter)
* **Member 2:** Posts Module (postModel + postController + postRouter)
* **Member 3:** Comments Module (commentModel + commentController + commentRouter)

> Each member is responsible for CRUD operations and any middleware related to their module.

---

## Required Packages

```bash
npm install express bcrypt jsonwebtoken firebase-admin nodemailer dotenv
npm install --save-dev nodemon
```

> **Note:** `cors` is not used at this time.

---

## .env File

```env
PORT=5000
JWT_SECRET=super_secret_key
FIREBASE_SERVICE_ACCOUNT=./src/database/serviceAccountKey.json
```

---

## Running the Project

1. To start the server normally:

```bash
npm start
```

2. To start the server with auto-reload on code changes:

```bash
npm run dev
```

3. Test the server by visiting:

```
http://localhost:5000/
```

* You should see:

```
NodeJS Group Project API
```

---

## Notes

* **app.js**: Responsible for setting up the Express app, middleware, and routers.
* **server.js**: Entry point for starting the project on a PORT.
* **dbConnection.js**: Handles connection to Firebase Firestore.
* **models** inside `database/` contain all the methods for CRUD operations.

---

## Future Enhancements

* Add **Email Verification** using `nodemailer`.
* Use **Firebase Storage** to upload profile or post images.
