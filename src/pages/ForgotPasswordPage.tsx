import React, { useState } from 'react';
import { toast } from 'sonner';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/AuthForm';

const ForgotPasswordPage: React.FC = () => {
  console.log('ForgotPasswordPage loaded');
  const [isLoading, setIsLoading] = useState(false);

  // Define the submission handler for the form
  const handleForgotPasswordSubmit = (values: { email: string }) => {
    console.log('Forgot Password form submitted with email:', values.email);
    setIsLoading(true);

    // Simulate an API call to send the reset link
    setTimeout(() => {
      setIsLoading(false);
      // As per the user journey, provide clear feedback.
      toast.success('If an account exists with that email, a reset link has been sent.');
    }, 1500); // Simulate network delay
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <AuthForm
          mode="forgot-password"
          onSubmit={handleForgotPasswordSubmit}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;