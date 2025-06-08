// app/result/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ResultPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const score = searchParams.get('score');
    const [name, setName] = useState('');

    useEffect(() => {
        const storedName = localStorage.getItem('username');
        if (storedName) {
            setName(storedName);
        }
    }, []);

    return (
        <main className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            <div className="bg-white rounded-xl shadow-md w-full max-w-md p-6 text-center">
                <h1 className="text-2xl font-bold mb-2">🎉 Quiz Completed!</h1>
                <p className="text-lg mb-4">
                    Well done, <span className="font-semibold">{name || 'Guest'}</span>!
                </p>
                <p className="text-3xl font-bold text-blue-600 mb-6">{score}</p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => router.push('/')}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => router.push('/leaderboard')}
                        className="text-blue-600 hover:underline"
                    >
                        View Leaderboard →
                    </button>
                </div>
            </div>
        </main>
    );
}
