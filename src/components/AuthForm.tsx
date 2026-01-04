'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { initiateEmailSignIn, initiateEmailSignUp } from '@/firebase/non-blocking-login';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const formVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50, position: 'absolute' as const },
};

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    if (!auth) return;
    try {
      await initiateEmailSignIn(auth, data.email, data.password);
      toast({ title: 'Login Successful', description: "Welcome back!" });
      
      // Check if the user is the admin
      if (data.email.toLowerCase() === 'h.penterprisehp5541@gmail.com') {
          router.push('/admin');
      } else {
          router.push('/auth'); // Redirect regular users to their dashboard
      }
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message || 'An unknown error occurred.',
        variant: 'destructive'
      });
    }
  };

  const onSignupSubmit = async (data: SignupFormValues) => {
    if (!auth) return;
    try {
      await initiateEmailSignUp(auth, data.email, data.password);
      toast({ title: 'Signup Successful', description: "Your account has been created." });
      router.push('/auth');
    } catch (error: any) {
      toast({
        title: 'Signup Failed',
        description: error.message || 'An unknown error occurred.',
        variant: 'destructive'
      });
    }
  };

  return (
    <Card className="w-full max-w-md overflow-hidden shadow-2xl">
      <div className="relative">
        <AnimatePresence initial={false} mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                  <CardHeader>
                    <CardTitle className="font-headline text-3xl">Welcome Back</CardTitle>
                    <CardDescription>Enter your credentials to access your account.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <Label>Email</Label>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <Label>Password</Label>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex-col gap-4">
                    <Button type="submit" className="w-full" disabled={loginForm.formState.isSubmitting}>
                      {loginForm.formState.isSubmitting ? 'Logging in...' : 'Log In'}
                    </Button>
                    <Button variant="link" size="sm" type="button" onClick={() => setIsLogin(false)}>
                      Don't have an account? Sign Up
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(onSignupSubmit)}>
                  <CardHeader>
                    <CardTitle className="font-headline text-3xl">Create an Account</CardTitle>
                    <CardDescription>Join us to start your skincare journey.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={signupForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <Label>Name</Label>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <Label>Email</Label>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <Label>Password</Label>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex-col gap-4">
                    <Button type="submit" className="w-full" disabled={signupForm.formState.isSubmitting}>
                       {signupForm.formState.isSubmitting ? 'Creating account...' : 'Sign Up'}
                    </Button>
                    <Button variant="link" size="sm" type="button" onClick={() => setIsLogin(true)}>
                      Already have an account? Log In
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}