import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DashboardPage = () => {
  const navigate = useNavigate();

  console.log('DashboardPage loaded');

  // Show a success toast notification when the component mounts
  useEffect(() => {
    toast.success("Login Successful!");
  }, []);

  const handleLogout = () => {
    // Navigate to the login page, which is the root route in App.tsx
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back!</CardTitle>
            <CardDescription>
              You have successfully logged in to your secure portal.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="@user_avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <p className="text-center text-sm text-muted-foreground">
              This is your protected dashboard. The `Header` above contains a dropdown menu to log out, or you can use the button below.
            </p>
            <Button onClick={handleLogout} className="w-full" variant="destructive">
              Log Out
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;