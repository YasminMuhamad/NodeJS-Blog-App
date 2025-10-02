import db from "../dbConnection.js"; 

const commentsCollection = db.collection("comments");

export default commentsCollection;