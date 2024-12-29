import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useSwipeGesture } from "./hooks/useSwipeGesture";
import { NavBar } from "./components/NavBar";

function App() {
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const { swipeProgress } = useSwipeGesture(cardRef, {
    onSwipe: (direction) => {
      console.log(`Swiped ${direction}`);
    },
    minSwipeDistance: 100,
  });

  return (
    <div className="min-h-screen bg-slate-100 overflow-hidden">
      <NavBar title="Swipe Cards" />

      {/* Card Container */}
      <div className="p-4 h-[calc(100vh-3.5rem)]">
        <div ref={cardRef} className="relative h-full rounded-xl">
          <div
            className="h-full bg-white shadow-lg rounded-xl transition-transform"
            style={{
              transform: `translateX(${swipeProgress * 0.5}px) rotate(${
                swipeProgress * 0.05
              }deg)`,
            }}
          >
            <div className="p-8">
              <div className="flex justify-center gap-8">
                <a
                  href="https://vite.dev"
                  target="_blank"
                  className="hover:scale-110 transition-transform"
                >
                  <img src={viteLogo} className="w-32 h-32" alt="Vite logo" />
                </a>
                <a
                  href="https://react.dev"
                  target="_blank"
                  className="hover:scale-110 transition-transform"
                >
                  <img src={reactLogo} className="w-32 h-32" alt="React logo" />
                </a>
              </div>
              <h1 className="text-4xl font-bold text-indigo-600 mt-8">
                Vite + React
              </h1>
              <div className="mt-8 space-y-6">
                <button
                  onClick={() => setCount((count) => count + 1)}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  count is {count}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button className="w-12 h-12 rounded-full bg-white text-green-500 shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button 
            className="w-12 h-12 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-all flex items-center justify-center transition-colors"
            style={{
              transform: `scale(${1 + swipeProgress * 0.005})`,
              backgroundColor: swipeProgress > 50 ? '#ef4444' : '#ffffff'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke={swipeProgress > 50 ? '#ffffff' : '#000000'}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
