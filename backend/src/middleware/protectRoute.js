import {  requireAuth } from '@clerk/express';
import User from '../models/User';

export const protectRoute = [requireAuth(), async (req, res, next) => {
    try {
        const clerkId = req.auth.userId;
        if (!clerkId) return res.status(401).json({ message: 'Unauthorized: No clerkId found' });

        // Check if user exists in our database
        const user = await User.findOne({clerkId});
        if (!user) return res.status(401).json({ message: 'Unauthorized: User not found' });
        req.user = user; // attach user to request object
        next();
    } catch (error) {
        console.error('Error in protectRoute middleware:', error);

    }}];