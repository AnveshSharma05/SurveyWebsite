// src/app/api/register/route.js
import { NextResponse } from "next/server";
import {connectToDB} from "../../../lib/mongodb";
import User from "../../../models/user";
import argon2 from "argon2";

export async function POST(request) {
  try {
    // 1️⃣ Connect to MongoDB
    await connectToDB();

    // 2️⃣ Get JSON body from request
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // 3️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // 4️⃣ Hash password with argon2
    const hashedPassword = await argon2.hash(password);

    // 5️⃣ Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // 6️⃣ Return success response
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in /api/register:", error);
    return NextResponse.json(
      { error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
