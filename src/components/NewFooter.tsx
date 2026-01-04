
import Link from 'next/link';
import React from 'react';

const footerSections = {
  shop: [
    { href: "/products", label: "All Products" },
    { href: "/products?category=soaps", label: "Soaps" },
    { href: "/products?category=solid-perfumes", label: "Solid Perfumes" },
    { href: "/products?category=serums", label: "Serums" },
    { href: "/products?category=gift-sets", label: "Gift Sets" },
  ],
  about: [
    { href: "/about", label: "Our Story" },
    { href: "#", label: "Ingredients" },
    { href: "#", label: "Sustainability" },
    { href: "/blog", label: "Blog" },
    { href: "#", label: "Contact" },
  ],
  support: [
    { href: "/policy/shipping-policy", label: "Shipping & Returns" },
    { href: "/faq", label: "FAQs" },
    { href: "/policy/terms-and-conditions", label: "Terms of Service" },
    { href: "/policy/privacy-policy", label: "Privacy Policy" },
  ],
};

const SocialLinks = () => (
    <div className="flex gap-4">
        <a href="#" className="text-gray-400 hover:text-primary transition-colors">
            <span className="sr-only">Instagram</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-primary transition-colors">
            <span className="sr-only">Facebook</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
        </a>
    </div>
);

const PaymentMethods = () => (
    <div className="flex gap-4">
        <div className="h-6 w-10 bg-gray-200 dark:bg-gray-700 rounded" data-alt="Payment Method 1"></div>
        <div className="h-6 w-10 bg-gray-200 dark:bg-gray-700 rounded" data-alt="Payment Method 2"></div>
        <div className="h-6 w-10 bg-gray-200 dark:bg-gray-700 rounded" data-alt="Payment Method 3"></div>
    </div>
);

export default function NewFooter() {
    return (
        <footer className="bg-white dark:bg-[#181311] border-t border-gray-100 dark:border-gray-800 pt-16 pb-8">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary text-2xl">spa</span>
                            <h2 className="text-lg font-bold">Cj.Drk Cosmetic Store</h2>
                        </div>
                        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                            Handcrafted organic skincare made with love and intention. Sustainable, ethical, and pure.
                        </p>
                        <SocialLinks />
                    </div>
                    {(Object.keys(footerSections) as Array<keyof typeof footerSections>).map((key) => (
                        <div key={key}>
                            <h3 className="font-bold text-sm mb-4 capitalize">{key}</h3>
                            <ul className="space-y-3 text-sm text-gray-500">
                                {footerSections[key].map(link => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="hover:text-primary transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-400">© {new Date().getFullYear()} Cj.Drk Cosmetic Store. All rights reserved.</p>
                    <PaymentMethods />
                </div>
            </div>
        </footer>
    );
}

    