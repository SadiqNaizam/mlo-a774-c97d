import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Schemas for validation
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const registerSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ['confirmPassword'],
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

// Union type for form values
type AuthFormValues = z.infer<typeof loginSchema> | z.infer<typeof registerSchema> | z.infer<typeof forgotPasswordSchema>;

// Component Props
interface AuthFormProps {
  mode: 'login' | 'register' | 'forgot-password';
  onSubmit: (values: AuthFormValues) => void;
  isLoading: boolean;
  className?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, isLoading, className }) => {
  console.log('AuthForm loaded with mode:', mode);

  const formDetails = {
    'login': {
      schema: loginSchema,
      title: 'Welcome Back!',
      description: 'Enter your credentials to access your account.',
      buttonText: 'Sign In',
      footerLink: (
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link to="/registration" className="underline underline-offset-4 hover:text-primary">
            Sign Up
          </Link>
        </p>
      ),
      forgotPasswordLink: (
        <div className="text-right">
            <Link to="/forgot-password" className="text-sm underline underline-offset-4 hover:text-primary">
                Forgot Password?
            </Link>
        </div>
      )
    },
    'register': {
      schema: registerSchema,
      title: 'Create an Account',
      description: 'Enter your email and password to register.',
      buttonText: 'Sign Up',
      footerLink: (
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/" className="underline underline-offset-4 hover:text-primary">
            Sign In
          </Link>
        </p>
      ),
    },
    'forgot-password': {
      schema: forgotPasswordSchema,
      title: 'Forgot Password?',
      description: 'Enter your email and we will send you a reset link.',
      buttonText: 'Send Reset Link',
      footerLink: (
        <p className="text-center text-sm text-muted-foreground">
          Remembered your password?{' '}
          <Link to="/" className="underline underline-offset-4 hover:text-primary">
            Sign In
          </Link>
        </p>
      ),
    },
  }[mode];

  const form = useForm<z.infer<typeof formDetails.schema>>({
    resolver: zodResolver(formDetails.schema),
    defaultValues: {
      email: '',
      password: '',
      ...(mode === 'register' && { confirmPassword: '' }),
    },
  });

  const handleFormSubmit = (values: z.infer<typeof formDetails.schema>) => {
    onSubmit(values as AuthFormValues);
  };

  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardHeader>
        <CardTitle className="text-2xl">{formDetails.title}</CardTitle>
        <CardDescription>{formDetails.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {(mode === 'login' || mode === 'register') && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                    {mode === 'login' && formDetails.forgotPasswordLink}
                  </FormItem>
                )}
              />
            )}
            {mode === 'register' && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {formDetails.buttonText}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        {formDetails.footerLink}
      </CardFooter>
    </Card>
  );
};

export default AuthForm;