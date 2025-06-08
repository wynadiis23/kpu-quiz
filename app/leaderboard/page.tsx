// app/leaderboard/page.tsx
import db from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic'; // enable server-side fetching

export default async function LeaderboardPage() {
    // Directly query the database
    const rows = db
        .prepare("SELECT id, name, score, created_at FROM leaderboard ORDER BY score DESC LIMIT 100")
        .all();

    return (
        <main className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            <div className="bg-white rounded-xl shadow-md w-full max-w-md p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">🏆 Top 100 Leaderboard</h1>
                <div className="max-h-80 overflow-y-auto mb-6">
                    <ul className="space-y-3">
                        {rows.map((entry, index) => (
                            <li
                                key={entry.id}
                                className="flex justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
                            >
                                <span>
                                    {index + 1}. {entry.name}
                                </span>
                                <span className="font-semibold text-blue-600">{entry.score}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <Link
                    href="/"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </Link>
            </div>
        </main>
    );
}
