"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AnchorMenu() {
    const menuRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!menuRef.current) return;

            const sections = document.querySelectorAll('h2[id], h3[id]');
            const navLinks = menuRef.current.querySelectorAll('nav ul li a');

            let closestSection = null;
            let minDistance = Number.POSITIVE_INFINITY;

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const distance = Math.abs(rect.top);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestSection = section;
                }
            });

            if (closestSection) {
                const id = (closestSection as HTMLElement).getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.add('text-gray-600');
                    link.classList.remove('font-semibold', 'text-black');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.remove('text-gray-600');
                        link.classList.add('font-semibold', 'text-black');
                    }
                });
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call to set the active link based on the initial scroll position

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <aside ref={menuRef} className="hidden sm:block sm:min-w-16 w-1/4 sticky top-24 h-screen px-8">
            <h2 className='font-semibold text-lg mb-4'>On this Page</h2>
            <nav className='flex flex-col'>
                <ul className='space-y-3'>
                    <li><Link href="#copyright" className="block text-gray-600">Copyright Policy</Link></li>
                    <li><Link href="#termsofuse" className="block text-gray-600">Terms of Use</Link></li>
                    <li><Link href="#privacy" className="block text-gray-600">Privacy Policy</Link></li>
                    <li><Link href="#collecteddata" className="ml-3 block text-gray-600">Collected Data</Link></li>
                    <li><Link href="#datause" className="ml-3 block text-gray-600">Data Use</Link></li>
                    <li><Link href="#modifications" className="block text-gray-600">Modifications</Link></li>
                    <li><Link href="#contact" className="block text-gray-600">Contact Us</Link></li>
                </ul>
            </nav>
        </aside>
    );
};