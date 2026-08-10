"use client";

import {
  type CSSProperties,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./CaseStudyShowcase.module.css";

type Props = {
  centerImages: string[];
  marqueeImages?: string[];
  mobileImages?: string[];
};

const MARQUEE_COPIES = 21;
const MIDDLE_COPY = Math.floor(MARQUEE_COPIES / 2);
const SPRING_STIFFNESS = 200;
const SPRING_DAMPING = 25;
const SPRING_MASS = 1;

function modulo(value: number, length: number) {
  return length ? ((value % length) + length) % length : 0;
}

export function CaseStudyShowcase({ centerImages, marqueeImages, mobileImages = [] }: Props) {
  const marquee = marqueeImages?.length ? marqueeImages : centerImages;
  const originIndex = MIDDLE_COPY * marquee.length;
  const slides = useMemo(
    () => Array.from({ length: MARQUEE_COPIES }, () => marquee).flat(),
    [marquee],
  );
  const [slideIndex, setSlideIndex] = useState(originIndex);
  const [cardStride, setCardStride] = useState(416);
  const [resetting, setResetting] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const resetFrameRef = useRef<number | null>(null);
  const positionRef = useRef(-originIndex * cardStride);
  const velocityRef = useRef(0);
  const initializedRef = useRef(false);
  const previousImageCountRef = useRef(marquee.length);
  const active = modulo(slideIndex, centerImages.length);
  const activeMobile = modulo(slideIndex, mobileImages.length);

  useLayoutEffect(() => {
    const updateStride = () => {
      if (window.innerWidth <= 480) setCardStride(198);
      else if (window.innerWidth <= 768) setCardStride(260);
      else if (window.innerWidth <= 1100) setCardStride(334);
      else setCardStride(416);
    };

    updateStride();
    window.addEventListener("resize", updateStride);
    return () => window.removeEventListener("resize", updateStride);
  }, []);

  useLayoutEffect(() => {
    if (previousImageCountRef.current === marquee.length) return;
    previousImageCountRef.current = marquee.length;
    setResetting(true);
    setSlideIndex(originIndex);
  }, [marquee.length, originIndex]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || !marquee.length) return;

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const target = -slideIndex * cardStride;
    const setTrackPosition = (position: number) => {
      positionRef.current = position;
      track.style.transform = `translate3d(${position}px, 0, 0)`;
    };
    const normalizeIfNeeded = () => {
      if (Math.abs(slideIndex - originIndex) < 3 * marquee.length) return;
      setResetting(true);
      setSlideIndex(originIndex + modulo(slideIndex, marquee.length));
    };
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!initializedRef.current || resetting || prefersReducedMotion) {
      initializedRef.current = true;
      velocityRef.current = 0;
      setTrackPosition(target);

      if (resetting) {
        if (resetFrameRef.current !== null) {
          window.cancelAnimationFrame(resetFrameRef.current);
        }
        resetFrameRef.current = window.requestAnimationFrame(() => {
          resetFrameRef.current = null;
          setResetting(false);
        });
      } else {
        normalizeIfNeeded();
      }

      return;
    }

    const startPosition = positionRef.current;
    const startVelocity = velocityRef.current;
    if (Math.abs(startPosition - target) < 0.01 && Math.abs(startVelocity) < 0.01) {
      velocityRef.current = 0;
      setTrackPosition(target);
      normalizeIfNeeded();
      return;
    }

    const startTime = performance.now();
    const decay = SPRING_DAMPING / (2 * SPRING_MASS);
    const angularFrequency = Math.sqrt(
      SPRING_STIFFNESS / SPRING_MASS - decay * decay,
    );
    const displacement = startPosition - target;
    const sineCoefficient = (startVelocity + decay * displacement) / angularFrequency;

    const animateSpring = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      const envelope = Math.exp(-decay * elapsed);
      const cosine = Math.cos(angularFrequency * elapsed);
      const sine = Math.sin(angularFrequency * elapsed);
      const relativePosition =
        envelope * (displacement * cosine + sineCoefficient * sine);
      const relativeVelocity =
        envelope *
        (
          -decay * (displacement * cosine + sineCoefficient * sine)
          + angularFrequency * (-displacement * sine + sineCoefficient * cosine)
        );
      const nextPosition = target + relativePosition;

      setTrackPosition(nextPosition);
      velocityRef.current = relativeVelocity;

      if (
        (Math.abs(relativePosition) < 0.01 && Math.abs(relativeVelocity) < 0.01)
        || elapsed >= 2
      ) {
        animationFrameRef.current = null;
        velocityRef.current = 0;
        setTrackPosition(target);
        normalizeIfNeeded();
        return;
      }

      animationFrameRef.current = window.requestAnimationFrame(animateSpring);
    };

    animationFrameRef.current = window.requestAnimationFrame(animateSpring);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [cardStride, marquee.length, originIndex, resetting, slideIndex]);

  useEffect(() => {
    if (centerImages.length < 2 || resetting) return;
    const id = window.setInterval(() => {
      setSlideIndex((index) => index + 1);
    }, 3000);
    return () => window.clearInterval(id);
  }, [centerImages.length, resetting, slideIndex]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      if (resetFrameRef.current !== null) {
        window.cancelAnimationFrame(resetFrameRef.current);
      }
    };
  }, []);

  const showPrevious = () => {
    if (resetting) return;
    setSlideIndex((index) => Math.max(0, index - 1));
  };

  const showNext = () => {
    if (resetting) return;
    setSlideIndex((index) => Math.min(slides.length - 1, index + 1));
  };

  return (
    <section className={styles.section} aria-label="Showcase">
      <div className={styles.marqueeWrapper} aria-hidden="true">
        <div
          ref={trackRef}
          className={styles.marqueeTrack}
          style={
            {
              "--showcase-initial-x": `${-originIndex * 416}px`,
            } as CSSProperties
          }
        >
          {slides.map((src, i) => (
            <button
              key={i}
              type="button"
              className={styles.marqueeCard}
              tabIndex={-1}
              onClick={() => {
                if (!resetting) setSlideIndex(i);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" draggable={false} />
            </button>
          ))}
        </div>
      </div>

      <div className={styles.frame}>
        <div className={styles.screen}>
          {centerImages.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src + i}
              src={src}
              alt={`Giao diện dự án ${i + 1}`}
              className={`${styles.screenImg} ${i === active ? styles.active : ""}`}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          ))}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/migrated/homenest-com-vn/wp-content/uploads/2026/06/Man-hinh-IMAC.png"
          alt="Khung mô phỏng giao diện website chuyên nghiệp"
          className={styles.frameImage}
        />
        {mobileImages.length > 0 && (
          <div className={styles.phoneFrame}>
            <div className={styles.phoneScreen}>
              {mobileImages.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src + i}
                  src={src}
                  alt={`Giao diện mobile dự án ${i + 1}`}
                  className={`${styles.phoneImg} ${i === activeMobile ? styles.active : ""}`}
                />
              ))}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/migrated/homenest-com-vn/wp-content/uploads/2026/06/Khung-dien-thoai-Casestudy-scaled.png"
              alt="Khung mô phỏng giao diện mobile"
              className={styles.phoneFrameImage}
            />
          </div>
        )}
      </div>

      {centerImages.length > 1 && (
        <>
          <button type="button" className={styles.navPrev} aria-label="Previous image" onClick={showPrevious}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
          </button>
          <button type="button" className={styles.navNext} aria-label="Next image" onClick={showNext}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </button>
        </>
      )}
    </section>
  );
}
