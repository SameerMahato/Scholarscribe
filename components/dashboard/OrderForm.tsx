"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

export default function OrderForm() {
    const [step, setStep] = useState(1);
    const [date, setDate] = useState<Date>();
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const removeFile = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const [showPayment, setShowPayment] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        setIsProcessing(true);
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsProcessing(false);
        setShowPayment(false);
        // Redirect to orders page or show success (simulated for now)
        window.location.href = "/dashboard/student/orders";
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Steps Indicator */}
            <div className="mb-8 flex items-center justify-between">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${step >= i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                }`}
                        >
                            {i}
                        </div>
                        <span className={`text-sm ${step >= i ? "font-medium" : "text-muted-foreground"}`}>
                            {i === 1 ? "Paper Details" : i === 2 ? "Preferences" : "Review"}
                        </span>
                    </div>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        {step === 1 && "Tell us about your assignment"}
                        {step === 2 && "Deadline & Preferences"}
                        {step === 3 && "Review Order Details"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {step === 1 && (
                        <>
                            <div className="space-y-2">
                                <Label>Academic Level</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="highschool">High School</SelectItem>
                                        <SelectItem value="undergrad">Undergraduate</SelectItem>
                                        <SelectItem value="master">Master&apos;s</SelectItem>
                                        <SelectItem value="phd">Ph.D.</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Type of Paper</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="essay">Essay</SelectItem>
                                        <SelectItem value="research">Research Paper</SelectItem>
                                        <SelectItem value="case-study">Case Study</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Subject</Label>
                                <Input placeholder="e.g. History, Nursing, Business Law" />
                            </div>

                            <div className="space-y-4">
                                <Label>Attachment (Optional)</Label>
                                <div
                                    className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer relative"
                                    onClick={triggerFileInput}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        type="file"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleFileSelect}
                                        multiple
                                    />
                                    <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                                    <p className="text-sm font-medium">
                                        {files.length > 0 ? `${files.length} file(s) selected` : "Drag & drop files here"}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {files.length > 0 ? "Click to add more" : "or click to browse"}
                                    </p>
                                </div>

                                {files.length > 0 && (
                                    <div className="space-y-2">
                                        {files.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md text-sm">
                                                <span className="truncate max-w-[200px]">{file.name}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => removeFile(e, index)}
                                                    className="h-auto p-1 text-red-500 hover:text-red-700"
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Instructions</Label>
                                <Textarea placeholder="Paste your assignment instructions here..." className="min-h-[100px]" />
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="space-y-2">
                                <Label>Deadline</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="space-y-2">
                                <Label>Pages / Words</Label>
                                <div className="flex items-center gap-4">
                                    <Input type="number" min="1" defaultValue="1" className="w-24" />
                                    <span className="text-muted-foreground">pages (approx. 275 words)</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Format</Label>
                                <RadioGroup defaultValue="apa" className="flex gap-4">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="apa" id="apa" />
                                        <Label htmlFor="apa">APA</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="mla" id="mla" />
                                        <Label htmlFor="mla">MLA</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="chicago" id="chicago" />
                                        <Label htmlFor="chicago">Chicago</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <div className="rounded-lg bg-muted p-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Type:</span>
                                    <span className="font-medium">Essay (Undergraduate)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subject:</span>
                                    <span className="font-medium">History</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Deadline:</span>
                                    <span className="font-medium">{date ? format(date, "PPP") : "Not selected"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Pages:</span>
                                    <span className="font-medium">2 pages (550 words)</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-lg font-bold border-t pt-4">
                                <span>Total Price:</span>
                                <span className="text-primary">$45.00</span>
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={prevStep} disabled={step === 1}>
                        Back
                    </Button>
                    {step < 3 ? (
                        <Button onClick={nextStep} className="bg-[#2DD4BF] hover:bg-[#2DD4BF]/90 text-slate-900 font-bold">Next / Continue</Button>
                    ) : (
                        <Button
                            onClick={() => setShowPayment(true)}
                            className="w-full sm:w-auto bg-[#2DD4BF] hover:bg-[#2DD4BF]/90 text-slate-900 font-bold"
                        >
                            Proceed to Payment
                        </Button>
                    )}
                </CardFooter>
            </Card>

            <Dialog open={showPayment} onOpenChange={setShowPayment}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Secure Checkout</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Card Information</Label>
                            <Input placeholder="0000 0000 0000 0000" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Expiry Date</Label>
                                <Input placeholder="MM/YY" />
                            </div>
                            <div className="space-y-2">
                                <Label>CVC</Label>
                                <Input placeholder="123" />
                            </div>
                        </div>
                        <div className="bg-muted p-3 rounded text-sm flex justify-between">
                            <span>Total Amount:</span>
                            <span className="font-bold">$45.00</span>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowPayment(false)}>Cancel</Button>
                        <Button
                            className="bg-[#2DD4BF] hover:bg-[#2DD4BF]/90 text-slate-900 font-bold"
                            onClick={handlePayment}
                            disabled={isProcessing}
                        >
                            {isProcessing ? "Processing..." : "Pay Now"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
