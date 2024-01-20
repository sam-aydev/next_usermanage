import User from "@/models/User";
import connectDB from "@/config/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request){
    const { username, email, password, confirmPassword } = await request.json();
    
    if(password != confirmPassword){
        return NextResponse(JSON.stringify({error: "Password do not match"},
            {status: 400})
        )

    }

    await connectDB();

    const existingUser = await User.findOne({email});

    if(existingUser){
        return NextResponse(JSON.stringify({error: "User already exist"}, 
            {status: 400})
        )
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        email, 
        password:hashedPassword
    });

    try {
        await newUser.save();
        return new NextResponse('User successfully registered', {status: 201})
    } catch (error) {
        return new NextResponse(error, {status: 500})
    }
}