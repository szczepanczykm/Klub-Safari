'use client';
import Image from "next/image";
import { useEffect, useState } from 'react';

const TOTAL_IMAGES = 215;
const ROTATION_INTERVAL = 5000; // 5 seconds between changes

export default function Home() {
    const [mounted, setMounted] = useState(false);
    const [randomImage, setRandomImage] = useState(1);

    // Initial setup
    useEffect(() => {
        setMounted(true);
        setRandomImage(Math.floor(Math.random() * TOTAL_IMAGES) + 1);
    }, []);

    // Auto-rotation effect
    useEffect(() => {
        if (!mounted) return;

        const interval = setInterval(() => {
            setRandomImage(current => {
                let next;
                do {
                    next = Math.floor(Math.random() * TOTAL_IMAGES) + 1;
                } while (next === current); // Ensure we don't show the same image twice
                return next;
            });
        }, ROTATION_INTERVAL);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background Image */}
            <Image
                src={`/gallery/img (${randomImage}).jpg`}
                alt="Background"
                fill
                className="object-cover opacity-30 transition-all duration-1000 -z-10"
            />

            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
                {/* Header Section */}
                <header className="opacity-30 row-start-1 flex justify-center">
                    <Image
                        src="/logo.png"
                        alt="Klub Safari Logo"
                        width={250}
                        height={250}
                    />
                </header>

                {/* Main Content */}
                <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center opacity-30">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-center">
                        Witamy na stronie Klubu Safari!
                    </h1>
                    <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-center">
                        Strona w budowie, zapraszamy wkrótce...
                    </h2>
                </main>

                {/* Footer Section */}
                <footer className="row-start-3 flex justify-center text-sm text-gray-500">
                    © 2024 Klub Safari. All rights reserved.
                </footer>
            </div>
        </div>
    );
}