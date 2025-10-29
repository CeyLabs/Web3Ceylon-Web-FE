export interface ImageProps {
    id: number;
    height: number;
    width: number;
    public_id: string;
    format: string;
    blurDataUrl?: string;
}

export interface AlbumHeroContent {
    title: string;
    description: string;
    eyebrow?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    ctaLabel?: string;
    ctaHref?: string;
    ctaTarget?: string;
    image?: {
        src: string;
        alt: string;
        width?: number;
        height?: number;
        className?: string;
    };
}

export interface SharedModalProps {
    index: number;
    images?: ImageProps[];
    currentPhoto?: ImageProps;
    changePhotoId: (newVal: number) => void;
    closeModal: () => void;
    navigation: boolean;
    direction?: number;
    imageAlt?: string;
}
