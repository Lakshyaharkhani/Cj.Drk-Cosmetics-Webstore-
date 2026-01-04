
import React from 'react';

const StaticPage = ({ title }: { title: string }) => (
    <div className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-6">{title}</h1>
        <p className="text-gray-500">This is a simulation page for {title}. In a real application, this would contain rich information about our brand and practices.</p>
    </div>
);

export default function IngredientsPage() {
    return <StaticPage title="Our Ingredients" />;
}
