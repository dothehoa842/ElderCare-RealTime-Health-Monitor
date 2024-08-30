import expres from 'express';
import User from '../model/user.model.js';
const router = expres.Router();

router.get('/', async (req, res) => {
    res.render('testhome.ejs');
})
router.get('/api/v1/auth/signin', async (req, res) => {
    res.render('signin.ejs');
})

router.get('/connectDB', async (req, res) => {
    const mongodbUri = 'mongodb://localhost:27017/test';
    try {
        await mongoose.connect(mongodbUri);
        console.log('Connected to MongoDB using Mongoose successfully.');
        res.send('Connected to MongoDB using Mongoose successfully.');
    } catch (error) {
        console.log('Connected to MongoDB using Mongoose failed.', error);
        res.status(500).json({ status: false, message: 'Connected to MongoDB using Mongoose failed.', error: error });
    }
})
export default router