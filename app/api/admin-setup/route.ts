import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        await connectDB();

        const email = "admin@scholarscribe.com";
        const password = "adminpassword123";
        const name = "Super Admin";

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            return NextResponse.json({ message: "Admin account already exists", email });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            role: "admin",
        });

        return NextResponse.json({
            message: "Admin account created successfully",
            credentials: { email, password }
        }, { status: 201 });

    } catch (error) {
        console.error("Admin Setup Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
