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
    Star,
    Shield
} from "lucide-react";

// Mock data for Writers
const writers = [
    { id: 1, name: "Dr. Alan Grant", email: "alan@scholarscribe.com", expertise: "History, Paleontology", activeOrders: 3, rating: 4.9, status: "Active", earnings: "$1,240" },
    { id: 2, name: "Sarah Harding", email: "sarah@scholarscribe.com", expertise: "Biology, Zoology", activeOrders: 1, rating: 4.7, status: "Active", earnings: "$850" },
    { id: 3, name: "Ian Malcolm", email: "ian@scholarscribe.com", expertise: "Mathematics, Chaos Theory", activeOrders: 0, rating: 4.5, status: "Offline", earnings: "$2,100" },
    { id: 4, name: "Ellie Sattler", email: "ellie@scholarscribe.com", expertise: "Botany, Ecology", activeOrders: 2, rating: 5.0, status: "Active", earnings: "$1,560" },
];

export default function WritersPage() {
    return (
        <div className="space-y-6  min-h-screen bg-slate-50/50 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-slate-900">Writers</h1>
                    <p className="text-slate-500">Manage your academic experts.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button className="bg-[#3F51B5] hover:bg-[#3F51B5]/90 text-white font-bold shadow-sm">
                        <Shield className="mr-2 h-4 w-4" /> Add Writer
                    </Button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                    placeholder="Search writers by name or expertise..."
                    className="pl-10 bg-white border-slate-200 text-slate-900 focus:ring-slate-200 focus:border-slate-300 shadow-sm"
                />
            </div>

            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg text-slate-900">Writer Roster</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-slate-200 hover:bg-slate-50">
                                    <TableHead className="text-slate-500">Name</TableHead>
                                    <TableHead className="text-slate-500">Expertise</TableHead>
                                    <TableHead className="text-slate-500">Active Orders</TableHead>
                                    <TableHead className="text-slate-500">Rating</TableHead>
                                    <TableHead className="text-slate-500">Status</TableHead>
                                    <TableHead className="text-slate-500 text-right">Total Earnings</TableHead>
                                    <TableHead className="text-right text-slate-500">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {writers.map((writer) => (
                                    <TableRow key={writer.id} className="border-slate-100 hover:bg-slate-50">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                                                    <User className="h-4 w-4 text-slate-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-slate-900">{writer.name}</span>
                                                    <span className="text-xs text-slate-500">{writer.email}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-700">{writer.expertise}</TableCell>
                                        <TableCell className="text-center text-slate-700">{writer.activeOrders}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center text-amber-500">
                                                <Star className="h-3 w-3 fill-current mr-1" />
                                                <span className="text-sm font-medium">{writer.rating}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={
                                                writer.status === "Active" ? "bg-green-100 text-green-700 border-green-200" : "bg-slate-100 text-slate-600 border-slate-200"
                                            }>
                                                {writer.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right font-mono text-slate-900 font-medium">
                                            {writer.earnings}
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
                                                        View Profile
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="hover:bg-slate-50 cursor-pointer">
                                                        Manage Payouts
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="hover:bg-slate-50 cursor-pointer text-red-600">
                                                        Suspend Account
                                                    </DropdownMenuItem>
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
