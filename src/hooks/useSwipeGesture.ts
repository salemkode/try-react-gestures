import { useEffect, useState } from 'react';

interface SwipeState {
    sX: number;
    sY: number;
    eX: number;
    eY: number;
}

interface UseSwipeGestureProps {
    onSwipe?: (direction: 'l' | 'r' | 'u' | 'd') => void;
    minSwipeDistance?: number;
}

export const useSwipeGesture = (ref: React.RefObject<HTMLElement>, {
    onSwipe,
    minSwipeDistance = 50
}: UseSwipeGestureProps = {}) => {
    const [swipeProgress, setSwipeProgress] = useState(0);
    const [swipeState, setSwipeState] = useState<SwipeState>({
        sX: 0,
        sY: 0,
        eX: 0,
        eY: 0
    });

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleTouchStart = (e: TouchEvent) => {
            const touch = e.touches[0];
            setSwipeState({
                sX: touch.clientX,
                sY: touch.clientY,
                eX: touch.clientX,
                eY: touch.clientY
            });
            setSwipeProgress(0);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!e.touches.length) return;

            const touch = e.touches[0];
            setSwipeState((prev) => ({
                ...prev,
                eX: touch.clientX,
                eY: touch.clientY
            }));

            // Calculate horizontal and vertical differences
            const deltaX = swipeState.eX - swipeState.sX;
            const deltaY = swipeState.eY - swipeState.sY;

            // Calculate progress based on the larger movement
            const progress = Math.abs(deltaX) > Math.abs(deltaY)
                ? (Math.abs(deltaX) / minSwipeDistance) * 100
                : (Math.abs(deltaY) / minSwipeDistance) * 100;

            setSwipeProgress(Math.min(progress, 100));
        };

        const handleTouchEnd = () => {
            const deltaX = swipeState.eX - swipeState.sX;
            const deltaY = swipeState.eY - swipeState.sY;

            // Determine if the swipe was primarily horizontal or vertical
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (Math.abs(deltaX) >= minSwipeDistance) {
                    onSwipe?.(deltaX > 0 ? 'r' : 'l');
                }
            } else {
                if (Math.abs(deltaY) >= minSwipeDistance) {
                    onSwipe?.(deltaY > 0 ? 'd' : 'u');
                }
            }

            // Reset progress
            setSwipeProgress(0);
        };

        element.addEventListener('touchstart', handleTouchStart);
        element.addEventListener('touchmove', handleTouchMove);
        element.addEventListener('touchend', handleTouchEnd);

        return () => {
            element.removeEventListener('touchstart', handleTouchStart);
            element.removeEventListener('touchmove', handleTouchMove);
            element.removeEventListener('touchend', handleTouchEnd);
        };
    }, [ref, minSwipeDistance, onSwipe, swipeState.eX, swipeState.sX, swipeState.eY, swipeState.sY]);

    return { swipeProgress };
}; 
    