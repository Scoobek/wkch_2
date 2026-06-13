"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import type { GalleryImage } from "@/lib/news";
import styles from "./ArticleGallery.module.css";

interface Props {
    images: GalleryImage[];
}

const VISIBLE = 5;

export default function GalleryClient({ images }: Props) {
    const [index, setIndex] = useState(-1);

    const visible = images.slice(0, VISIBLE);
    const overflow = images.length - VISIBLE;

    const slides = images.map((img) => ({
        src: img.src,
        alt: img.alt ?? "",
        title: img.caption,
    }));

    return (
        <>
            <ul className={styles.grid}>
                {visible.map((img, i) => (
                    <li
                        key={img.src}
                        className={`${styles.imgItem}${i === 0 ? ` ${styles.imgMain}` : ""}`}
                    >
                        <button
                            className={styles.imgBtn}
                            onClick={() => setIndex(i)}
                            aria-label={`Open full size: ${img.alt ?? `Photo ${i + 1}`}`}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt ?? ""}
                                fill
                                sizes={
                                    i === 0
                                        ? "(max-width: 768px) 100vw, 50vw"
                                        : "(max-width: 768px) 50vw, 25vw"
                                }
                                className={styles.imgFill}
                            />
                            {i === VISIBLE - 1 && overflow > 0 && (
                                <span className={styles.imgOverlay}>
                                    +{overflow}
                                </span>
                            )}
                        </button>
                    </li>
                ))}
            </ul>

            <Lightbox
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                slides={slides}
                plugins={[Captions, Zoom]}
            />
        </>
    );
}