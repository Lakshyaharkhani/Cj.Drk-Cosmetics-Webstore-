import React from 'react';
import { useFirebase } from '../firebase/FirebaseProvider';
import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
    const { isAdmin, loading } = useFirebase();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!loading && !isAdmin) {
            navigate('/');
        }
    }, [isAdmin, loading, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-serif font-bold text-brand-dark mb-8">Admin Dashboard</h1>
                <p>Welcome, Admin! Here you can manage products, orders, and users.</p>
                {/* Admin components will go here */}
            </div>
        </div>
    );
};

export default Admin;
