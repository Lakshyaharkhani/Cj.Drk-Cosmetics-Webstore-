import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFirebase } from '../firebase/FirebaseProvider';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { auth } = useFirebase();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        if (!auth) {
            setError("Authentication service is not available.");
            setIsSubmitting(false);
            return;
        }

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                if (email === 'h.penterprisehp5541@gmail.com') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                if (email === 'h.penterprisehp5541@gmail.com') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleSignIn = async () => {
        if (!auth) {
            setError("Authentication service is not available.");
            return;
        }
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate('/');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#181311] flex flex-col md:flex-row">
            {isSubmitting && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-white">{isLogin ? "Authenticating..." : "Creating Account..."}</div>}
            
            <div className="hidden md:flex md:w-1/2 relative bg-gray-100 dark:bg-gray-900 overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1974&auto=format&fit=crop" 
                    alt="Organic Skincare" 
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12">
                    <Link to="/" className="flex items-center gap-2 mb-6 text-white group">
                        <h1 className="text-2xl font-bold tracking-tight">Cj.Drk</h1>
                    </Link>
                    <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Pure beauty, <br/>refined by nature.</h2>
                    <p className="text-gray-200 text-lg max-w-sm">Join our community of natural enthusiasts and unlock exclusive rewards with every purchase.</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-24">
                <div className="md:hidden flex items-center gap-2 mb-12 self-start">
                     <h1 className="text-2xl font-bold tracking-tight">Cj.Drk</h1>
                </div>

                <div className="max-w-md w-full mx-auto">
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-3xl font-extrabold tracking-tight mb-3 text-brand-dark">
                            {isLogin ? 'Welcome Back' : 'Join Cj.Drk'}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            {isLogin 
                                ? 'Enter your credentials to access your account.' 
                                : 'Start your journey towards healthier, organic skin today.'}
                        </p>
                    </div>

                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLogin && (
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Full Name</label>
                                <div className="relative">
                                    <input 
                                        required
                                        type="text"
                                        placeholder="Jane Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-800 rounded-xl px-4 py-4 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all outline-none"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</label>
                            <div className="relative">
                                <input 
                                    required
                                    type="email"
                                    placeholder="name@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-800 rounded-xl px-4 py-4 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Password</label>
                                {isLogin && <button type="button" className="text-xs font-bold text-brand-green hover:underline">Forgot Password?</button>}
                            </div>
                            <div className="relative">
                                <input 
                                    required
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-800 rounded-xl px-4 py-4 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all outline-none"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? 'visibility' : 'visibility_off'}
                                </button>
                            </div>
                        </div>

                        <button 
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full bg-brand-dark hover:bg-brand-green text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-green/20 flex items-center justify-center gap-2 group transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100 dark:border-gray-800"></div></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-[#181311] px-4 text-gray-400 font-bold tracking-widest">Or continue with</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={handleGoogleSignIn} className="flex items-center justify-center gap-2 py-3 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-semibold text-sm text-brand-dark">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="size-5" />
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-semibold text-sm text-brand-dark">
                            <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" className="size-5 dark:invert" />
                            Apple
                        </button>
                    </div>

                    <p className="mt-10 text-center text-gray-500 text-sm">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                        <button 
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-brand-green font-bold hover:underline"
                        >
                            {isLogin ? 'Sign up for free' : 'Login here'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
