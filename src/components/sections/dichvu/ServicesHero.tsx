"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLocalizedServicesPage } from "@/i18n/content";
import s from "./ServicesHero.module.css";

export function ServicesHero() {
  const dichVuPage = useLocalizedServicesPage();
  const h = dichVuPage.hero;
  const tags = h.marqueeTags;
  const loop = [...tags, ...tags, ...tags];
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const cubeRef = useRef<HTMLDivElement | null>(null);
  const cubeWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const cube = cubeRef.current;
    const cubeWrapper = cubeWrapperRef.current;
    if (!marquee || !cube || !cubeWrapper) return;

    let frame = 0;
    let marqueeOffset = 0;
    let cubeAngle = 0;

    const syncCubeDepth = () => {
      const width = cubeWrapper.getBoundingClientRect().width;
      cubeWrapper.style.setProperty("--tz", `${width / 2}px`);
    };
    const resizeObserver = new ResizeObserver(syncCubeDepth);
    resizeObserver.observe(cubeWrapper);
    syncCubeDepth();

    const animate = () => {
      const loopWidth = marquee.scrollWidth / 3;
      marqueeOffset = loopWidth > 0 ? (marqueeOffset + 0.4) % loopWidth : 0;
      cubeAngle = (cubeAngle + 0.4) % 360;
      marquee.style.transform = `translate3d(${-marqueeOffset}px, 0, 0)`;
      cube.style.transform = `rotateY(${cubeAngle}deg)`;
      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div className={s.fixedBgWrapper} aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/migrated/homenest-software/wp-content/uploads/2026/04/HomeNest-Software-main-background.jpg"
          alt=""
          className={s.bgImage}
        />
      </div>
      <section className={s.heroSection}>

        <div className={s.marqueeWrapper}>
          <div ref={marqueeRef} className={s.marqueeTrack}>
            {loop.map((tag, i) => (
              <div key={i} className={s.serviceTag}>
                <DiamondIcon />
                <span>{tag}</span>
              </div>
            ))}
          </div>
        </div>

        <svg className={s.headingSvg} viewBox="0 0 1039 226" aria-hidden>
          <foreignObject width="100%" height="100%">
            <p className={s.headingText}>{h.bgText}</p>
          </foreignObject>
        </svg>

        <div className={s.bottomRow}>
          <h1 className={s.bottomText}>{h.title}</h1>
          <p className={s.bottomText}>{h.description}</p>
        </div>

        <div ref={cubeWrapperRef} className={s.cubeWrapper}>
          <div ref={cubeRef} className={s.cubeInner}>
            <div className={`${s.cubeFace} ${s.cubeFront}`}>
              <Image
                src={h.cubeFaces.front}
                alt=""
                fill
                sizes="450px"
                unoptimized
              />
            </div>
            <div className={`${s.cubeFace} ${s.cubeRight}`}>
              <Image
                src={h.cubeFaces.right}
                alt=""
                fill
                sizes="450px"
                unoptimized
              />
            </div>
            <div className={`${s.cubeFace} ${s.cubeBack}`}>
              <Image
                src={h.cubeFaces.back}
                alt=""
                fill
                sizes="450px"
                unoptimized
              />
            </div>
            <div className={`${s.cubeFace} ${s.cubeLeft}`}>
              <Image
                src={h.cubeFaces.left}
                alt=""
                fill
                sizes="450px"
                unoptimized
              />
            </div>
            <div className={`${s.cubeFace} ${s.cubeTop}`} />
            <div className={`${s.cubeFace} ${s.cubeBottom}`} />
          </div>
        </div>
      </section>
    </>
  );
}

function DiamondIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 256 256" aria-hidden>
      <path
        d="M240,128a15.79,15.79,0,0,1-10.5,15l-63.44,23.07L143,229.5a16,16,0,0,1-30,0L89.94,166.06,26.5,143a16,16,0,0,1,0-30L89.94,89.94,113,26.5a16,16,0,0,1,30,0l23.07,63.44L229.5,113A15.79,15.79,0,0,1,240,128Z"
      />
    </svg>
  );
}
