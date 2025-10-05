import usersCollection from '../../database/models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let hashedPassword = await bcrypt.hash(password, 10);
        password = hashedPassword;
        await usersCollection.add({ name, email, password, role: 'user', emailVerified: false });
        res.status(201).send('User Signed Up');
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).send('Internal Server Error');
    }
}

export const login = async (req, res) => {
    try {
        const { password } = req.body;
        const user = req.userFromDB;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).send('Invalid email or password');

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).send({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
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
        console.error('Error fetching user profile:', error);
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
        console.error('Error updating user profile:', error);
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
        console.error('Error fetching user profile:', error);
        res.status(500).send('Internal Server Error');
    }
}

// export default uploadPicture = async (req, res) {

// }

// import { supabase } from '../../database/dbConnection.js';
// export const uploadProfilePicture = async (req, res) => {
//     try {
//         if (!req.file) return res.status(400).send('No file uploaded');

//         const userId = req.user.id;
//         const fileBuffer = req.file.buffer;
//         const fileName = `${userId}_${Date.now()}.jpg`; // اسم الملف فريد

//         // رفع الملف على bucket "avatars"
//         const { data, error } = await supabase
//             .storage
//             .from('avatars')
//             .upload(fileName, fileBuffer, {
//                 cacheControl: '3600',
//                 upsert: true,
//                 contentType: req.file.mimetype
//             });

//         if (error) throw error;

//         // الحصول على public URL
//         const { publicUrl, error: urlError } = supabase
//             .storage
//             .from('avatars')
//             .getPublicUrl(fileName);

//         if (urlError) throw urlError;

//         // تحديث بيانات المستخدم في الـ database
//         await usersCollection.doc(userId).update({ profilePicture: publicUrl });

//         res.status(200).send({ message: 'Profile picture uploaded', url: publicUrl });
//     } catch (error) {
//         console.error('Error uploading profile picture:', error);
//         if (error.status) {
//             res.status(error.status).send(error.message);
//         } else {
//             res.status(500).send('Internal Server Error');
//         }
//     }

// };