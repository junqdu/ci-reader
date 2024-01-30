import List from '@/../public/data/list.json';
import { QnAList } from '@/app/components/QnAList';

export async function generateStaticParams() {
    const res = List.map((post) => ({
        slug: `${post.id}`,
    }));
    return res;
}

export default function Post({ params }: { params: { slug: string } }) {
    const { slug } = params;

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
            <QnAList id={slug} />
        </main>
    );
}
