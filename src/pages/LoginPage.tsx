import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/AuthForm';

const LoginPage = () => {
  console.log('LoginPage loaded');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Define the type for the form values based on the AuthForm's login schema
  type LoginFormValues = {
    email?: string;
    password?: string;
  };

  const handleLoginSubmit = (values: LoginFormValues) => {
    setIsLoading(true);
    console.log('Login form submitted with:', values);

    // Simulate an API call
    setTimeout(() => {
      // Dummy validation for demonstration purposes
      if (values.email === 'user@example.com' && values.password === 'password123') {
        toast.success('Login Successful!', {
          description: 'Redirecting to your dashboard...',
        });
        navigate('/dashboard'); // Navigate to dashboard on success, as defined in App.tsx
      } else {
        toast.error('Invalid Credentials', {
          description: 'Please check your email and password and try again.',
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <AuthForm
          mode="login"
          onSubmit={handleLoginSubmit as (values: any) => void}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;