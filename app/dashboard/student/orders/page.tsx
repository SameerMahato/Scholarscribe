"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FileText, Loader2, Plus } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface Order {
    _id: string;
    subject: string;
    topic: string;
    type: string;
    status: string;
    deadline: string;
    createdAt: string;
    price: number;
}

export default function MyOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("/api/orders");
                if (!res.ok) throw new Error("Failed to fetch orders");
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                setError("Could not load orders. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "completed": return "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20";
            case "in progress": return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20";
            case "cancelled": return "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20";
            default: return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20";
        }
    };

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-heading">My Orders</h1>
                    <p className="text-muted-foreground">Track and manage your assignments.</p>
                </div>
                <Button asChild className="bg-[#2DD4BF] hover:bg-[#2DD4BF]/90 text-slate-900 border-none font-bold">
                    <Link href="/dashboard/student/order">
                        <Plus className="mr-2 h-4 w-4" /> New Order
                    </Link>
                </Button>
            </div>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>A list of all your recent orders.</CardDescription>
                </CardHeader>
                <CardContent>
                    {orders.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                                <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-medium">No orders yet</h3>
                            <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
                            <Button asChild variant="outline">
                                <Link href="/dashboard/student/order">Place your first order</Link>
                            </Button>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Subject / Topic</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Deadline</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order._id}>
                                        <TableCell className="font-mono text-xs text-muted-foreground">
                                            #{order._id.slice(-6).toUpperCase()}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{order.subject}</span>
                                                <span className="text-xs text-muted-foreground truncate max-w-[200px]">{order.topic || "No topic"}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={getStatusColor(order.status)}>
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                {order.deadline ? format(new Date(order.deadline), "MMM d, yyyy") : "N/A"}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right font-medium">
                                            ${order.price}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
