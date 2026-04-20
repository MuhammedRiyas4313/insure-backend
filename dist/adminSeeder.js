import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import connectDB from './config/db.js';
dotenv.config();
const seedAdmin = async () => {
    try {
        await connectDB();
        // Check if admin already exists
        const adminExists = await Admin.findOne({ email: 'admin@insure.com' });
        if (adminExists) {
            console.log('Admin already exists');
            process.exit();
        }
        const admin = new Admin({
            email: 'admin@insure.com',
            password: 'insure@1234' // Will be hashed by pre-save hook
        });
        await admin.save();
        console.log('Admin seeded successfully');
        process.exit();
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
seedAdmin();
