'use client';
import { useEffect, useState } from 'react';
import { QnA, QnAInterface } from './QnA';
import { isProd } from '../utils/isProd';

export function QnAList({ id }: { id: string }) {
    const [source, setSource] = useState<QnAInterface[]>([]);
    useEffect(() => {
        fetch(`${isProd() ? '/ci-reader' : ''}/data/${id}.json`)
            .then((data) => data.json())
            .then((data) => setSource(data));
    }, [id]);

    return (
        <div className="flex flex-col divide-y-2 divide-neutral-700">
            <div className="mb-4">
                Source:{' '}
                <a
                    className="text-blue-500"
                    target="_blank"
                    href={`https://www.cranial-insertion.com/article/${id}`}
                >{`https://www.cranial-insertion.com/article/${id}`}</a>
            </div>
            {source.map((item, idx) => (
                <QnA key={idx} {...item} />
            ))}
        </div>
    );
}
