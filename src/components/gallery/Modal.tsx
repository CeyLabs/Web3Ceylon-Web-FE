"use client";

import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useKeypress from "react-use-keypress";
import type { ImageProps } from "@/lib/gallery/types";
import SharedModal from "./SharedModal";

interface ModalProps {
    images: ImageProps[];
    onClose?: (lastViewed: number | null) => void;
    imageAlt?: string;
}

export default function Modal({ images, onClose, imageAlt }: ModalProps) {
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const photoIdParam = searchParams.get("photoId");
    const isOpen = photoIdParam !== null;
    const index = isOpen ? Number(photoIdParam) : 0;

    const [direction, setDirection] = useState(0);
    const [curIndex, setCurIndex] = useState(index);

    useEffect(() => {
        if (isOpen && !Number.isNaN(index)) {
            setCurIndex(index);
        }
    }, [index, isOpen]);

    const updateQuery = (nextIndex: number | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (nextIndex === null) {
            params.delete("photoId");
        } else {
            params.set("photoId", String(nextIndex));
        }

        const query = params.toString();
        const url = query ? `${pathname}?${query}` : pathname;
        router.push(url, { scroll: false });
    };

    const handleClose = () => {
        updateQuery(null);
        onClose?.(curIndex);
    };

    const changePhotoId = (newVal: number) => {
        setDirection(newVal > curIndex ? 1 : -1);
        setCurIndex(newVal);
        updateQuery(newVal);
    };

    useKeypress("ArrowRight", () => {
        if (!isOpen) return;
        if (curIndex + 1 < images.length) {
            changePhotoId(curIndex + 1);
        }
    });

    useKeypress("ArrowLeft", () => {
        if (!isOpen) return;
        if (curIndex > 0) {
            changePhotoId(curIndex - 1);
        }
    });

    if (!isOpen || Number.isNaN(index)) {
        return null;
    }

    return (
        <Dialog
            static
            open
            onClose={handleClose}
            initialFocus={overlayRef}
            className="fixed inset-0 z-10 flex items-center justify-center"
        >
            <Dialog.Overlay
                ref={overlayRef}
                as={motion.div}
                key="backdrop"
                className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            />
            <SharedModal
                index={curIndex}
                direction={direction}
                images={images}
                changePhotoId={changePhotoId}
                closeModal={handleClose}
                navigation
                imageAlt={imageAlt}
            />
        </Dialog>
    );
}
