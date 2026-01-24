import { Inngest } from "inngest";
import { connectDB } from './db.js';
import User from '../models/User.js';
import { ENV } from './env.js';
import { upsertStreamUser, deleteStreamUser } from './stream.js';

// Create a client to send and receive events
export const inngest = new Inngest({ id: "talent-iq" });

// Create an empty array where we'll export future Inngest functions
const SyncUser= inngest.createFunction(
    {id: "sync-user"},
    {event: "clerk/user.created"},
    async ({ event})=>{
           await connectDB();
              const { id, email_addresses, first_name, last_name, image_url } = event.data;
              const newUser ={
                clerkId: id,
                email: email_addresses[0]?.email_address,
                name: `${first_name || ""} ${last_name || ""}`,
                profileImage: image_url || "",
              }
                await User.create(newUser);

                await upsertStreamUser({
                    id: newUser.clerkId.toString(),name: newUser.name, image: newUser.profileImage});

                    // Challenge:After Completing Project I will add feature to user to send email on signup
    }
)

const deleteUserFromDB= inngest.createFunction(
    {id: "delete-user-from-db"},
    {event: "clerk/user.deleted"},
    async ({ event})=>{
        await connectDB();
             
        const { id } = event.data;
        
        await User.deleteOne({ clerkId: id });
        await deleteStreamUser(id.toString());
    }
)

export const functions = [SyncUser, deleteUserFromDB];