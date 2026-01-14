"use client";

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
    MoreHorizontal,
    Search,
    Filter,
    User,
    GraduationCap,
    Mail
} from "lucide-react";

// Mock data
const students = [
    { id: 1, name: "Alice Johnson", email: "alice@university.edu", university: "Harvard", orders: 5, spent: "$450", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@college.edu", university: "UCLA", orders: 12, spent: "$1,200", status: "Active" },
    { id: 3, name: "Charlie Brown", email: "charlie@school.edu", university: "MIT", orders: 2, spent: "$150", status: "Inactive" },
];

export default function StudentsPage() {
    return (
        <div className="space-y-6 min-h-screen bg-slate-50/50 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-slate-900">Student Management</h1>
                    <p className="text-slate-500">View and manage knowledge seekers.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button className="bg-[#3F51B5] hover:bg-[#3F51B5]/90 text-white font-bold shadow-sm">
                        Export List
                    </Button>
                </div>
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                    placeholder="Search students..."
                    className="pl-10 bg-white border-slate-200 text-slate-900 focus:ring-slate-200 focus:border-slate-300 shadow-sm"
                />
            </div>

            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg text-slate-900">Registered Students</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-slate-200 hover:bg-slate-50">
                                    <TableHead className="text-slate-500">Name</TableHead>
                                    <TableHead className="text-slate-500">University</TableHead>
                                    <TableHead className="text-slate-500">Total Orders</TableHead>
                                    <TableHead className="text-slate-500">Total Spent</TableHead>
                                    <TableHead className="text-slate-500">Status</TableHead>
                                    <TableHead className="text-right text-slate-500">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.map((student) => (
                                    <TableRow key={student.id} className="border-slate-100 hover:bg-slate-50">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                                                    <GraduationCap className="h-4 w-4 text-slate-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-slate-900">{student.name}</span>
                                                    <span className="text-xs text-slate-500 flex items-center gap-1">
                                                        <Mail className="h-3 w-3" /> {student.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-700">{student.university}</TableCell>
                                        <TableCell className="text-slate-700">{student.orders}</TableCell>
                                        <TableCell className="text-emerald-600 font-medium">{student.spent}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={
                                                student.status === "Active" ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-slate-100 text-slate-600 border-slate-200"
                                            }>
                                                {student.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="hover:bg-slate-100 text-slate-500">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-white border-slate-200 text-slate-700">
                                                    <DropdownMenuItem className="hover:bg-slate-50 cursor-pointer">View Profile</DropdownMenuItem>
                                                    <DropdownMenuItem className="hover:bg-slate-50 cursor-pointer">Order History</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600 hover:bg-slate-50 cursor-pointer">Block Account</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
