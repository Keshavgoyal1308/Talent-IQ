import {StreamChat} from 'stream-chat';
import{StreamClient} from'@stream-io/node-sdk';
import { ENV } from './env.js';

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.error("Stream API key and secret are required");
}

export const streamClient= new StreamClient(apiKey, apiSecret);// will be used for video calls
export const chatClient = StreamChat.getInstance(apiKey, apiSecret);// will be used for chat functionalities

export const upsertStreamUser = async(userData)=>{
    try{
        await chatClient.upsertUser(userData);
        console.log("stream user upserted successfully",userData);
    }catch(error){
        console.error("Error upserting Stream user:", error);
    }
}

export const deleteStreamUser = async(userId)=>{
    try{
        await chatClient.deleteUser(userId);
         console.log("stream user deleted successfully",userId);
    }catch(error){
        console.error("Error deleting Stream user:", error);
    }
}

//todo: add another function to generate Token