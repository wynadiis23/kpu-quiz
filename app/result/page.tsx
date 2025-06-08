import { Suspense } from 'react';
import ResultContent from './ResultContent';

export default function ResultPage() {
    return (
        <Suspense fallback={<div className="text-center p-6">Loading result...</div>}>
            <ResultContent />
        </Suspense>
    );
}
