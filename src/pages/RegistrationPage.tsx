import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom Components
import AuthForm from '@/components/AuthForm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Shadcn UI
import { useToast } from '@/components/ui/use-toast';

const RegistrationPage: React.FC = () => {
  console.log('RegistrationPage loaded');

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Define the submission handler for the registration form
  const handleRegistrationSubmit = (values: any) => {
    setIsLoading(true);
    console.log('Registration form submitted with:', values);

    // Simulate an API call for registration
    setTimeout(() => {
      setIsLoading(false);

      // Show a success message
      toast({
        title: "Account Created",
        description: "Your account has been successfully created. Please sign in.",
        variant: "default", // or "success" if you have a custom variant
      });

      // Redirect to the login page after a short delay
      setTimeout(() => {
        navigate('/'); // Navigate to login page as defined in App.tsx
      }, 1500);

    }, 2000); // Simulate 2 seconds of network delay
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <AuthForm
          mode="register"
          isLoading={isLoading}
          onSubmit={handleRegistrationSubmit}
        />
      </main>
      <Footer />
    </div>
  );
};

export default RegistrationPage;