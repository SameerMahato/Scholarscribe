import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true, // Essay, Research Paper, etc.
        },
        topic: String,
        instructions: String,
        deadline: Date,
        pages: Number,
        price: Number,
        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed", "Cancelled"],
            default: "Pending",
        },
        files: [String], // Array of file URLs
    },
    { timestamps: true }
);

const Order = models.Order || model("Order", OrderSchema);

export default Order;
