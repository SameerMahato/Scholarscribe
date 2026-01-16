import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { redirect } from "next/navigation";
import { format } from "date-fns";

export default async function StudentDashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/login");
    }

    await connectDB();

    // Fetch orders for the logged-in user
    const orders = await Order.find({ userId: session.user.id }).sort({ createdAt: -1 });

    // Calculate stats
    const totalOrders = orders.length;
    const inProgress = orders.filter((o) => o.status === "In Progress").length;
    const completed = orders.filter((o) => o.status === "Completed").length;
    const pendingPayment = orders.filter((o) => o.status === "Pending Payment").length; // Adjust status string if needed based on actual usage

    const recentOrders = orders.slice(0, 5);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-heading">Dashboard</h1>
                <Button asChild className="bg-[#2DD4BF] hover:bg-[#2DD4BF]/90 text-slate-900 border-none font-bold">
                    <Link href="/dashboard/student/order">
                        <Plus className="mr-2 h-4 w-4" /> New Order
                    </Link>
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Total Orders */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalOrders}</div>
                        <p className="text-xs text-muted-foreground">Lifetime orders</p>
                    </CardContent>
                </Card>

                {/* In Progress */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                        <Clock className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{inProgress}</div>
                        <p className="text-xs text-muted-foreground">Active assignments</p>
                    </CardContent>
                </Card>

                {/* Completed */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completed}</div>
                        <p className="text-xs text-muted-foreground">Successfully delivered</p>
                    </CardContent>
                </Card>

                {/* Pending Payment */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Payment</CardTitle>
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingPayment}</div>
                        <p className="text-xs text-muted-foreground">Action required</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders */}
            <Card className="hidden md:block border-none shadow-sm">
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    {recentOrders.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No recent orders found.</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Deadline</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentOrders.map((order) => (
                                    <TableRow key={order._id}>
                                        <TableCell className="font-medium">#{order._id.toString().slice(-6).toUpperCase()}</TableCell>
                                        <TableCell>{order.subject}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                order.status === "Completed" ? "outline" :
                                                    order.status === "In Progress" ? "secondary" : "default"
                                            } className={
                                                order.status === "Completed" ? "text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300" :
                                                    order.status === "In Progress" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100" :
                                                        ""
                                            }>
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{order.deadline ? format(new Date(order.deadline), "MMM d, yyyy") : "N/A"}</TableCell>
                                        <TableCell className="text-right">${order.price}</TableCell>
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
