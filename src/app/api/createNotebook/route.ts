import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"
import client from '@/db';


export async function POST(req:Request) {
    const { userId } = auth();
    console.log(userId)

    if (!userId) return null;

    const body = await req.json()
    const {name} = body

    const noteData = {
        name: name, // Assuming this is correctly typed
        userId: userId, // Assuming this is correctly typed
        content: "Your Note Content", // Add this line
        imageUrl: "Your Image URL", // Add this line
      };
    
    // Logic for Image Generation
    
    const notes = await client.notes.create({
        data: noteData
    })

    console.log(notes)

    return new NextResponse("ok")
} 