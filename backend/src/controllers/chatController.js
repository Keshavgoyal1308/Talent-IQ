import express from 'express';
import { chatClient } from "../lib/stream.js"; 

export async function getStreamToken(req, res) {
    try{
        // use clerkID not the monoDB_id
        const token= chatClient.createToken(req.user.clerkId);
        res.status(200).json({token,userId:req.user.clerkId, userName:req.user.name});
    }catch(error){
        console.error("Error generating Stream token:", error);
    }
}