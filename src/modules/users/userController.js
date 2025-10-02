import usersCollection from '../../database/models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let hashedPassword = await bcrypt.hash(password, 10);
        password = hashedPassword;  
        await usersCollection.add({ name, email, password, role: 'user' });
        res.status(201).send('User Signed Up');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

// userController.js - login function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = req.userFromDB;


    if (!user) {
      return res.status(401).send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid email or password');
    }

    if (!user.id) {
      return res.status(500).send('User data is invalid');
    }

    // Token payload
    const tokenPayload = { 
      id: user.id, 
      role: user.role || 'user'
    };
    
    

    const token = jwt.sign(tokenPayload, "super_secret_key");
    
    res.status(200).json({ 
      message: 'Login successful', 
      token,
      user: { id: user.id, role: user.role }
    });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

export const getProfile = async (req, res) => {
    try {
        if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
            return res.status(403).send('Forbidden');
        }
        const userId = req.params.id;
        const userDoc = await usersCollection.doc(userId).get();
        if (!userDoc.exists) {
            return res.status(404).send('User not found');
        }
        const userData = userDoc.data();
        res.status(200).send({ name: userData.name, email: userData.email, role: userData.role, profilePicture: userData.profilePicture || null });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

export const updateProfile = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(403).send('Forbidden');
        }
        const userId = req.params.id;
        const { name, email, password, profilePicture } = req.body;
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) updateData.password = await bcrypt.hash(password, 10);
        if (profilePicture) updateData.profilePicture = profilePicture;

        await usersCollection.doc(userId).update(updateData);
        res.status(200).send('Profile updated successfully');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

export const deleteUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
            return res.status(403).send('Forbidden');
        }
        const userId = req.params.id;
        const userDoc = await usersCollection.doc(userId).get();
        if (!userDoc.exists) {
            return res.status(404).send('User not found');
        }
        await usersCollection.doc(userId).delete();
        res.status(200).send('User Deleted');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}