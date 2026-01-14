import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { subject, type, topic, instructions, deadline, pages, price } = await req.json();

        if (!subject || !type || !price) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        await connectDB();

        const newOrder = await Order.create({
            userId: session.user.id,
            subject,
            type,
            topic,
            instructions,
            deadline,
            pages,
            price,
            status: "Pending",
        });

        return NextResponse.json({ message: "Order placed successfully", orderId: newOrder._id }, { status: 201 });
    } catch (error) {
        console.error("Order Creation Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        let orders;
        if (session.user.role === "admin") {
            orders = await Order.find().populate("userId", "name email").sort({ createdAt: -1 });
        } else {
            orders = await Order.find({ userId: session.user.id }).sort({ createdAt: -1 });
        }

        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        console.error("Fetch Orders Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
