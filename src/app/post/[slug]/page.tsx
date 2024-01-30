'use client';
import { useEffect, useState } from 'react';
import { QnA, QnAInterface } from '../../components/QnA';

export default function Post({ params }: { params: { slug: string } }) {
    const [source, setSource] = useState<QnAInterface[]>([]);
    useEffect(() => {
        fetch(`/data/${params.slug}.json`)
            .then((data) => data.json())
            .then((data) => setSource(data));
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12">
            <nav className="flex sm:justify-center space-x-4">
                {[['Home', '/']].map(([title, url]) => (
                    <a
                        key="title"
                        href={url}
                        className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
                    >
                        {title}
                    </a>
                ))}
            </nav>
            <div className="flex flex-col divide-y-2 divide-neutral-700">
                <div className="mb-4">
                    Source:{' '}
                    <a
                        className="text-blue-500"
                        target="_blank"
                        href={`https://www.cranial-insertion.com/article/${params.slug}`}
                    >{`https://www.cranial-insertion.com/article/${params.slug}`}</a>
                </div>
                {source.map((item, idx) => (
                    <QnA key={idx} {...item} />
                ))}
            </div>
        </main>
    );
}
