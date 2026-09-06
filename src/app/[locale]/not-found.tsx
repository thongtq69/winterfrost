import { Link } from "@/i18n/routing";
import { LocalizedTree } from "@/components/i18n/LocalizedTree";

const BG = "/images/migrated/homenest-software/wp-content/uploads/2026/04/HomeNest-Software-main-background.jpg";
const NOT_FOUND_CSS = `
  @keyframes wf-not-found-zoom-out {
    from { transform: scale(1.12); }
    to { transform: scale(1); }
  }
  .wf-not-found-bg {
    position: fixed; z-index: 0; top: 0; left: 0; overflow: hidden;
    width: 100vw; height: 100vh;
  }
  .wf-not-found-bg-image {
    display: block; width: 100%; height: 100%;
    animation: wf-not-found-zoom-out 1.4s cubic-bezier(.25,.46,.45,.94) forwards;
    object-fit: cover; object-position: center;
  }
  .wf-not-found-nav {
    display: flex; width: 100%; align-items: center; justify-content: space-between;
    margin-bottom: 100px; padding: 0;
  }
  .wf-not-found-nav-link {
    display: flex; align-items: center; gap: 6px; color: #1a3b91;
    font-size: 16px; font-weight: 500; text-decoration: none;
    transition: opacity .2s; pointer-events: auto;
  }
  .wf-not-found-nav-link:hover { opacity: .7; }
  .wf-not-found-nav-arrow { font-size: 16px; }
  .wf-not-found-hero {
    position: relative; z-index: 1; display: flex; width: 100%;
    max-width: 1080px; min-height: 100vh; flex-direction: column;
    align-items: center; justify-content: flex-start; gap: 32px;
    margin: 0 auto; padding: 144px 44px 128px; line-height: normal;
  }
  .wf-not-found-code {
    margin: 0; background: linear-gradient(300deg,#2b5cb5 0%,#0c1e5b 85%);
    background-clip: text; color: transparent; font-size: 280px;
    font-weight: 600; letter-spacing: -.03em; line-height: .85;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .wf-not-found-heading {
    margin: 0; color: #0c1e5b; font-size: 64px; font-weight: 500;
    letter-spacing: -.02em; line-height: 1.1; text-align: center;
  }
  .wf-not-found-sub {
    margin: 0; color: #545454; font-size: 16px; line-height: 1.6;
    text-align: center;
  }
  .wf-not-found-btn {
    display: inline-flex; align-items: center; justify-content: center;
    border-radius: 24px; padding: 14px 32px; color: #fff;
    background: linear-gradient(121deg,#021b7b 0%,#1670de 29%,#193493 100%);
    box-shadow: rgba(255,255,255,.4) 0 2px 4px inset,
      rgba(123,139,209,.33) 0 .74px .74px -.75px,
      rgba(123,139,209,.32) 0 2.02px 2.02px -1.5px,
      rgba(123,139,209,.3) 0 4.43px 4.43px -2.25px,
      rgba(123,139,209,.25) 0 9.83px 9.83px -3px,
      rgba(123,139,209,.11) 0 25px 25px -3.75px,
      #4d6ed1 0 0 0 1px;
    font-size: 15px; font-weight: 500; text-decoration: none;
    transition: opacity .2s, transform .2s;
  }
  .wf-not-found-btn:hover { opacity: .9; transform: translateY(-1px); }
  @media (max-width: 1200px) {
    .wf-not-found-code { font-size: 200px; }
    .wf-not-found-heading { font-size: 54px; }
  }
  @media (max-width: 996px) {
    .wf-not-found-nav-link { font-size: 14px; }
    .wf-not-found-code { font-size: 150px; }
    .wf-not-found-heading { font-size: 46px; }
    .wf-not-found-nav { margin-bottom: 50px; }
  }
  @media (max-width: 768px) {
    .wf-not-found-code { font-size: 100px; }
    .wf-not-found-hero { gap: 24px; padding: 100px 24px 80px; }
    .wf-not-found-heading { font-size: 36px; }
    .wf-not-found-sub { font-size: 14px; }
  }
`;

export default function NotFound() {
  return (
    <LocalizedTree>
    <>
      <style>{NOT_FOUND_CSS}</style>
      <div className="wf-not-found-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BG}
          alt="Hình nền SoftBuild"
          title="Hình nền SoftBuild"
          className="wf-not-found-bg-image"
          loading="lazy"
        />
      </div>
      <section className="wf-not-found-hero">
        <nav className="wf-not-found-nav">
          <Link className="wf-not-found-nav-link" href="/dich-vu">
            <span className="wf-not-found-nav-arrow">←</span>{" "}
            Những dịch vụ của chúng tôi
          </Link>
          <Link className="wf-not-found-nav-link" href="/wiki">
            Wiki <span className="wf-not-found-nav-arrow">→</span>
          </Link>
        </nav>
        <p className="wf-not-found-code">404</p>
        <h1 className="wf-not-found-heading">Không tìm thấy trang</h1>
        <p className="wf-not-found-sub">
          Chúng tôi không tìm thấy trang bạn đang tìm kiếm. Vui lòng kiểm tra URL hoặc quay lại trang chủ.
        </p>
        <Link className="wf-not-found-btn" href="/">Back Home</Link>
      </section>
    </>
    </LocalizedTree>
  );
}
