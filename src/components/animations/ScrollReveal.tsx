"use client";
import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  /** Number of pixels to animate over (overrides rotationEnd/wordAnimationEnd when provided) */
  distancePx?: number;
  /** Custom start position for triggers (defaults to 'top 85%') */
  start?: string;
  /** Set to true to debug ScrollTrigger markers */
  markers?: boolean;
  /** Scrub amount for smoother catch-up (boolean or seconds); defaults to true */
  scrub?: boolean | number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
  distancePx,
  start = 'top 85%',
  markers = false,
  scrub = true,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (/^\s+$/.test(word)) return word;
      return (
        <span
          className="inline-block word"
          key={index}
          style={{
            opacity: baseOpacity,
            filter: enableBlur ? `blur(${blurStrength}px)` : undefined,
          }}
        >
          {word}
        </span>
      );
    });
  }, [children, baseOpacity, enableBlur, blurStrength]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const endValue = distancePx ? `+=${distancePx}` : wordAnimationEnd;

    const wordElements = el.querySelectorAll<HTMLElement>('.word');

    const wordsOpacityTween = gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: 'opacity' },
      {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start,
          end: endValue,
          scrub,
          markers,
          once: true,
        }
      }
    );

  let blurTween: gsap.core.Tween | undefined;
    if (enableBlur) {
      blurTween = gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start,
            end: endValue,
            scrub,
            markers,
            once: true,
          }
        }
      );
    }

    return () => {
      wordsOpacityTween.scrollTrigger?.kill();
      wordsOpacityTween.kill();
      if (blurTween) {
        blurTween.scrollTrigger?.kill();
        blurTween.kill();
      }
    };
  }, [scrollContainerRef, enableBlur, baseOpacity, wordAnimationEnd, blurStrength, distancePx, start, markers, scrub]);  return (
    <h2 ref={containerRef} className={`my-5 ${containerClassName}`}>
      <p className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] ${textClassName}`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal;
