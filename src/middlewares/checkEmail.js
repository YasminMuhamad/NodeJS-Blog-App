import usersCollection from "../database/models/userModel.js";

const checkEmail = (type) => async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) return next();

        const snapshot = await usersCollection.where('email', '==', email).get();

        if (type === 'register' && !snapshot.empty) {
            return res.status(400).send('Email already exists');
        }

        if (type === 'update') {
            const existing = snapshot.docs.find(doc => doc.id !== req.user.id);
            if (existing) return res.status(400).send('Email already in use by another user');
        }

        if (type === 'login') {
            if (snapshot.empty) {
                return res.status(400).send('User not found, please sign up first');
            }
            let user;
            snapshot.forEach(doc => {
                user = { id: doc.id, ...doc.data() };
            });
            req.userFromDB = user;
        }

        next();
    } catch (error) {
        console.error('Error checking email:', error);
        res.status(500).send('Internal Server Error');
    }
};

export default checkEmail;