"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    FileText,
    Loader2,
    MoreHorizontal,
    Search,
    Filter,
    UserCircle,
    CheckCircle2,
    XCircle,
    Clock
} from "lucide-react";
import { format } from "date-fns";

interface Order {
    _id: string;
    subject: string;
    topic: string;
    type: string;
    status: string;
    deadline: string;
    price: number;
    userId: {
        name: string;
        email: string;
    };
    createdAt: string;
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // Fetch all orders from API
        const fetchOrders = async () => {
            try {
                const res = await fetch("/api/orders");
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(order =>
        order.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.topic && order.topic.toLowerCase().includes(searchTerm.toLowerCase())) ||
        order.userId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order._id.includes(searchTerm)
    );

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case "completed":
                return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 shadow-none">Completed</Badge>;
            case "in progress":
                return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200 shadow-none">In Progress</Badge>;
            case "pending":
                return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200 shadow-none">Pending</Badge>;
            case "cancelled":
                return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200 shadow-none">Cancelled</Badge>;
            default:
                return <Badge variant="outline" className="text-slate-600 border-slate-300">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6 min-h-screen bg-slate-50/50 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-slate-900">Order Management</h1>
                    <p className="text-slate-500">View and manage all student assignments.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-sm">
                        Export CSV
                    </Button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                    placeholder="Search by student, subject, or Order ID..."
                    className="pl-10 bg-white border-slate-200 text-slate-900 focus:ring-slate-200 focus:border-slate-300 shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg text-slate-900">All Orders ({filteredOrders.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex h-40 items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                            No orders found matching your search.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-slate-200 hover:bg-slate-50">
                                        <TableHead className="text-slate-500">Order ID</TableHead>
                                        <TableHead className="text-slate-500">Student</TableHead>
                                        <TableHead className="text-slate-500">Topic / Subject</TableHead>
                                        <TableHead className="text-slate-500">Deadline</TableHead>
                                        <TableHead className="text-slate-500">Status</TableHead>
                                        <TableHead className="text-slate-500 text-right">Amount</TableHead>
                                        <TableHead className="text-right text-slate-500">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredOrders.map((order) => (
                                        <TableRow key={order._id} className="border-slate-100 hover:bg-slate-50">
                                            <TableCell className="font-mono text-xs text-slate-600">
                                                #{order._id.slice(-6).toUpperCase()}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                                                        <UserCircle className="h-5 w-5 text-slate-400" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-slate-900">{order.userId?.name || "Unknown"}</span>
                                                        <span className="text-xs text-slate-500">{order.userId?.email}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-slate-900">{order.subject}</span>
                                                    <span className="text-xs text-slate-500 truncate max-w-[180px]">{order.topic || "General"}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm text-slate-700">
                                                    {order.deadline ? format(new Date(order.deadline), "MMM d, yyyy") : "N/A"}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(order.status)}
                                            </TableCell>
                                            <TableCell className="text-right font-medium text-slate-900">
                                                ${order.price}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="hover:bg-slate-100 text-slate-500">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="bg-white border-slate-200 text-slate-700">
                                                        <DropdownMenuItem className="hover:bg-slate-50 cursor-pointer">
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="hover:bg-slate-50 cursor-pointer">
                                                            Assign Writer
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="hover:bg-slate-50 cursor-pointer text-emerald-600 font-medium">
                                                            Mark Completed
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
