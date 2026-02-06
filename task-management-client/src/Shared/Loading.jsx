import React from 'react';



const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen gap-1">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className={`w-2 h-10 rounded-sm animate-bounce-fast ${i % 2 === 0 ? 'bg-primary' : 'bg-secondary'}`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
            ))}


            <style>
                {`@keyframes bounce-fast {
                0%, 100% { transform: scaleY(0.4); }
                50% { transform: scaleY(1); }
                }
                .animate-bounce-fast {
                animation: bounce-fast 1s infinite ease-in-out;
}`}
            </style>
        </div>
    );
};

export default Loading;