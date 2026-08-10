import { useLocalizedHome } from "@/i18n/content";
import s from "./AboutSection.module.css";

const MAP_VIDEO =
  "/images/brand/winterfrost/about/winterfrost-market-map.mp4?v=wf-map-20260727";

export function AboutSection() {
  const { about } = useLocalizedHome();

  return (
    <section className={s.aboutSection}>
      <div className={s.container}>
        <div className={s.header}>
          <div className={s.labelMotion}>
            <div className={s.label}>
              <div className={s.labelIcon} role="img" aria-label="Star Icon">
                <svg overflow="visible" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinejoin="round" d="m1 32 25 6 6 25 6-25 25-6-25-6-6-25-6 25z" />
                </svg>
              </div>
              <p className={s.labelText}>{about.label}</p>
            </div>
          </div>
          <div className={s.aboutHeading}>
            <h2 className={s.heading}>
              <span className={s.headingLight}>{about.headline}</span>
            </h2>
          </div>
        </div>

        <div className={s.body}>
          <div className={s.textCol}>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                <span>{paragraph}</span>
              </p>
            ))}
          </div>
          <div className={s.imageCol}>
            <video autoPlay loop playsInline muted title="Thị trường Winterfrost phục vụ">
              <source src={MAP_VIDEO} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
