import express from 'express';
import User from '../model/user.model.js';
import mongoose from 'mongoose';
const router = express.Router();

router.get('/', async (req, res) => {
    // res.send('Hello World');
    const users = await User.find({});
    res.render('user.ejs', { users: users });
});

router.get('/admin', async (req, res) => {
    const users = await User.find({});
    res.render('testadmin.ejs', { users: users });
})

router.get('/create', (req, res) => {
    res.render('create.ejs');
});

router.post('/create', async (req, res) => {
    const { username, password, email } = req.body;
    const user = new User({ username: username, password: password, email: email });
    try {
        await user.save();
        // res.status(201).json(user);
        return res.redirect('/api/v1/user/admin');
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error creating user.', error: error });
    }
});

router.get('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    const userById = await User.findById(userId);
    try {
        res.status(200).json(userById);
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error finding user.', error: error });
    }

});

router.get('/update/:userId', async (req, res) => {
    const { userId } = req.params;
    const userById = await User.findById(userId);
    try {
        return res.render('update.ejs', { user: userById });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error finding user.', error: error });
    }

});

router.get('/delete/:userId', async (req, res) => {
    const { userId } = req.params;
    const userById = await User.findById(userId);
    try {
        return res.render('delete.ejs', { user: userById });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error finding user.', error: error });
    }

});

router.put('/update/:userId', async (req, res) => {
    const { userId } = req.params;
    const updatedData = req.body;

    try {
        // Sử dụng phương thức updateUser từ mô hình User
        const updatedUser = await User.updateUser(userId, updatedData);

        // Kiểm tra nếu người dùng không được tìm thấy
        if (!updatedUser) {
            return res.status(404).json({ status: false, message: 'User not found.' });
        }

        // Nếu cập nhật thành công, chuyển hướng đến trang admin hoặc một trang khác
        res.redirect('/api/v1/user/admin');
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(400).json({ status: false, message: 'Error updating user.', error: error.message });
    }
});

router.delete('/delete/:userId', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.userId);
    try {
        // res.status(200).json(user);
        res.redirect('/api/v1/user/admin');
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error deleting user.', error: error });
    }
});


export default router