import mongoose from 'mongoose';
import {ENV} from './env.js';


export const connectDB = async () => {
    try {
        await mongoose.connect(ENV.DB_URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);// 0 indicates success, 1 indicates failure
    }
}