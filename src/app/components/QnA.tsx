'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export interface QnAInterface {
    a: string;
    q: string;
    imgs: string[];
}

const getSFUrl = (name: string) => {
    return `https://api.scryfall.com/cards/named?fuzzy=${name.replace(
        / /g,
        '+'
    )}`;
};

const imageLoader = ({ src }: { src: string }) => {
    return src;
};

export function QnA({ a, q, imgs = [] }: QnAInterface) {
    const [question, setQuestion] = useState(q);
    const [imgLinks, setImgLinks] = useState<string[]>([]);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        const fetchImg = async () => {
            try {
                const promises = imgs.map((i) => {
                    // setQuestion((prev) =>
                    //     prev.replace(i, `<span class="card-name">${i}</span>`)
                    // );
                    return fetch(getSFUrl(i)).then((data) => data.json());
                });
                const results = (await Promise.all(promises).then(
                    (data) => data
                )) as {
                    image_uris: {
                        normal: string;
                    };
                    card_faces: {
                        name: string;
                        image_uris: {
                            normal: string;
                        };
                    }[];
                }[];
                // console.log(results);
                setImgLinks(
                    results.map((res, idx) => {
                        if (res.card_faces) {
                            // return res.card_faces[0].image_uris.normal;
                            return res.card_faces.find(
                                (face) => face.name === imgs[idx]
                            )!.image_uris.normal;
                        }
                        return res.image_uris.normal;
                    })
                );
            } catch (e) {
                console.log(imgs);
                console.error(e);
            }
        };
        fetchImg();
    }, [imgs]);

    return (
        <div className="py-8">
            <div>
                Q: <span dangerouslySetInnerHTML={{ __html: question }} />
            </div>
            {imgLinks?.map((img) => (
                <Image
                    className="my-4 rounded-xl overflow-hidden max-w-72"
                    key={img}
                    loader={imageLoader}
                    src={img}
                    alt="card image"
                    width={500}
                    height={500}
                />
            ))}
            <div>
                {!showAnswer ? (
                    <button
                        className="rounded-lg border bg-slate-400 px-2"
                        onClick={() => setShowAnswer(true)}
                    >
                        Show Answer
                    </button>
                ) : (
                    <>
                        A: <span dangerouslySetInnerHTML={{ __html: a }} />
                    </>
                )}
            </div>
        </div>
    );
}
