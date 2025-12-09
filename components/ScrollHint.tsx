import React, { useEffect, useState, useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export const ScrollHint: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isFirstTime, setIsFirstTime] = useState(true);

    const elementRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLElement | null>(null);
    const triggerCountRef = useRef(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Find scroll container and setup listeners
    useEffect(() => {
        if (!elementRef.current) return;

        // Assuming ScrollHint is placed immediately before the scroll container
        const container = elementRef.current.nextElementSibling as HTMLElement;
        if (!container) return;

        scrollContainerRef.current = container;

        const checkScroll = () => {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            // Use a small tolerance for float calculations
            setCanScrollLeft(scrollLeft > 5);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
        };

        // Check initially and on events
        checkScroll();
        container.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);

        return () => {
            container.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    // Intersection Observer for visibility
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Force a scroll check when entering viewport
                    if (scrollContainerRef.current) {
                        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
                        setCanScrollLeft(scrollLeft > 5);
                        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
                    }

                    setIsVisible(true);

                    if (timeoutRef.current) clearTimeout(timeoutRef.current);

                    const firstTime = triggerCountRef.current === 0;
                    setIsFirstTime(firstTime);

                    const duration = firstTime ? 6000 : 3000;
                    triggerCountRef.current += 1;

                    timeoutRef.current = setTimeout(() => {
                        setIsVisible(false);
                    }, duration);
                } else {
                    setIsVisible(false);
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                }
            },
            { threshold: 0.2 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            observer.disconnect();
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div ref={elementRef} className="absolute inset-0 pointer-events-none z-[100] md:hidden">

            {/* Left Hint */}
            <div
                className={`absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black/60 to-transparent flex items-center justify-start pl-4 transition-opacity duration-700 ease-in-out ${isVisible && canScrollLeft ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="flex items-center gap-1 bg-white/90 px-3 py-2 rounded-full shadow-xl animate-pulse">
                    <ChevronLeft className="text-zinc-900" size={16} />
                    {isFirstTime && <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-900">Deslizar</span>}
                </div>
            </div>

            {/* Right Hint */}
            <div
                className={`absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black/60 to-transparent flex items-center justify-end pr-4 transition-opacity duration-700 ease-in-out ${isVisible && canScrollRight ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="flex items-center gap-1 bg-white/90 px-3 py-2 rounded-full shadow-xl animate-pulse">
                    {isFirstTime && <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-900">Deslizar</span>}
                    <ChevronRight className="text-zinc-900" size={16} />
                </div>
            </div>
        </div>
    );
};
