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

const isDoubleFace = (layout: string) => {
    return ['flip', 'transform', 'double_faced_token', 'modal_dfc'].includes(
        layout
    );
};

export function QnA({ a, q, imgs = [] }: QnAInterface) {
    const [question, setQuestion] = useState(q);
    const [imgLinks, setImgLinks] = useState<string[]>([]);
    const [showAnswer, setShowAnswer] = useState(false);
    const [sfLinks, setSFLinks] = useState<string[]>([]);

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
                    layout: string;
                    scryfall_uri: string;
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
                        if (isDoubleFace(res.layout)) {
                            // return res.card_faces[0].image_uris.normal;
                            return res.card_faces.find(
                                (face) => face.name === imgs[idx]
                            )!.image_uris.normal;
                        }
                        return res.image_uris.normal;
                    })
                );
                setSFLinks(
                    results.map((res) => {
                        return res.scryfall_uri;
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
            {imgLinks?.map((img, idx) => (
                <a
                    key={img}
                    href={sfLinks[idx]}
                    target="_blank"
                    className="m-2 rounded-xl overflow-hidden inline-block"
                >
                    <Image
                        className="max-w-72"
                        loader={imageLoader}
                        src={img}
                        alt="card image"
                        width={500}
                        height={500}
                    />
                </a>
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
