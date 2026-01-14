"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import {
    Download,
    TrendingUp,
    TrendingDown,
    DollarSign,
    CreditCard
} from "lucide-react";

// Mock Data
const transactions = [
    { id: "TRX-9821", user: "Alice Johnson", amount: "$120.00", status: "Completed", date: "2024-03-15", method: "PayPal" },
    { id: "TRX-9822", user: "Bob Smith", amount: "$85.00", status: "Processing", date: "2024-03-15", method: "Credit Card" },
    { id: "TRX-9823", user: "Writer Payout", amount: "-$450.00", status: "Completed", date: "2024-03-14", method: "Bank Transfer" },
];

export default function AdminPaymentsPage() {
    return (
        <div className="space-y-6 min-h-screen bg-slate-50/50 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-slate-900">Financial Overview</h1>
                    <p className="text-slate-500">Revenue, payouts, and transaction history.</p>
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm">
                    <Download className="mr-2 h-4 w-4" /> Download Report
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Net Profit</CardTitle>
                        <div className="p-2 bg-emerald-100 rounded-full">
                            <DollarSign className="h-4 w-4 text-emerald-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">$12,450.00</div>
                        <p className="text-xs text-emerald-600 flex items-center mt-1 font-medium">
                            <TrendingUp className="h-3 w-3 mr-1" /> +15% this month
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Total Payouts</CardTitle>
                        <div className="p-2 bg-red-100 rounded-full">
                            <TrendingDown className="h-4 w-4 text-red-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">$4,200.00</div>
                        <p className="text-xs text-slate-500 mt-1">To 15 writers</p>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Pending Clearance</CardTitle>
                        <div className="p-2 bg-blue-100 rounded-full">
                            <CreditCard className="h-4 w-4 text-blue-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">$850.00</div>
                        <p className="text-xs text-slate-500 mt-1">Expected tomorrow</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg text-slate-900">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-200 hover:bg-slate-50">
                                <TableHead className="text-slate-500">Transaction ID</TableHead>
                                <TableHead className="text-slate-500">User / Entity</TableHead>
                                <TableHead className="text-slate-500">Date</TableHead>
                                <TableHead className="text-slate-500">Method</TableHead>
                                <TableHead className="text-slate-500">Status</TableHead>
                                <TableHead className="text-right text-slate-500">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((trx) => (
                                <TableRow key={trx.id} className="border-slate-100 hover:bg-slate-50">
                                    <TableCell className="font-mono text-xs text-slate-600">{trx.id}</TableCell>
                                    <TableCell className="font-medium text-slate-900">{trx.user}</TableCell>
                                    <TableCell className="text-slate-600">{trx.date}</TableCell>
                                    <TableCell className="text-slate-600">{trx.method}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={
                                            trx.status === "Completed" ? "bg-green-100 text-green-700 border-green-200" :
                                                trx.status === "Processing" ? "bg-yellow-100 text-yellow-700 border-yellow-200" : ""
                                        }>
                                            {trx.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className={`text-right font-medium ${trx.amount.startsWith('-') ? 'text-red-600' : 'text-emerald-600'}`}>
                                        {trx.amount}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
