"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Phone, Send, Smile, X } from "lucide-react";
import { livechatProviders } from "@/lib/integrations/livechat";
import s from "./FloatingButtons.module.css";

const ZALO_ICON = "/images/brand/softbuild/contact/zalo.png";
const ROBOT_GIF = "/images/brand/softbuild/softbuild-symbol-transparent.png";
const CHATBOT_AVATAR =
  "/images/brand/softbuild/softbuild-symbol-transparent.png";
const CHATBOT_BRAND = "/images/brand/softbuild/softbuild-symbol-transparent.png";

function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30" aria-hidden {...props}>
      <path d="M20.52 3.48A11.94 11.94 0 0 0 12.04 0C5.5 0 .19 5.31.19 11.85c0 2.09.55 4.13 1.6 5.92L0 24l6.4-1.68a11.84 11.84 0 0 0 5.64 1.43h.01c6.54 0 11.85-5.31 11.85-11.85 0-3.16-1.23-6.13-3.38-8.42zM12.04 21.78h-.01a9.96 9.96 0 0 1-5.07-1.39l-.36-.21-3.79 1 1.01-3.7-.24-.38a9.94 9.94 0 0 1-1.52-5.25c0-5.5 4.48-9.97 9.99-9.97 2.66 0 5.16 1.04 7.04 2.92a9.9 9.9 0 0 1 2.92 7.05c0 5.5-4.48 9.93-9.97 9.93zm5.47-7.46c-.3-.15-1.78-.88-2.06-.98s-.48-.15-.68.15-.78.98-.96 1.18-.36.22-.66.07c-.3-.15-1.27-.47-2.42-1.49a9.05 9.05 0 0 1-1.67-2.08c-.18-.3-.02-.46.13-.61.13-.13.3-.36.45-.54s.2-.3.3-.5.05-.37-.02-.52c-.07-.15-.68-1.63-.93-2.23-.24-.59-.49-.51-.68-.52h-.58c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.1 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.78-.73 2.03-1.43s.25-1.31.18-1.43c-.07-.13-.27-.21-.57-.36z" />
    </svg>
  );
}

function ChatWidget({ raised }: { raised: boolean }) {
  const t = useTranslations("FloatingButtons");
  const [isOpen, setIsOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    const storageKey = "softbuild-chat-greeting-seen";
    let hideDelay = 6000;

    try {
      if (window.sessionStorage.getItem(storageKey)) {
        hideDelay = 0;
      } else {
        window.sessionStorage.setItem(storageKey, "1");
      }
    } catch {
      // Keep the timed greeting when storage is unavailable.
    }

    const hideTimer = window.setTimeout(() => setShowPreview(false), hideDelay);
    return () => window.clearTimeout(hideTimer);
  }, []);

  if (isOpen) {
    return (
      <div className={`${s.chatRoot} ${s.chatRootOpen}`} data-visual-id="chat-widget">
        <section className={s.chatPopup} aria-label={t("chatLabel")}>
          <header className={s.chatHeader}>
            <div className={s.chatHeaderInfo}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CHATBOT_AVATAR} alt="Logo" className={s.chatHeaderAvatar} />
              <strong className={s.chatHeaderTitle}>SoftBuild AI</strong>
            </div>
            <button
              type="button"
              className={s.chatActionButton}
              aria-label={t("closeChat")}
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
          </header>

          <div className={s.chatMessages}>
            <div className={s.chatMessageContent}>
              <div className={s.chatMessageBubble}>
                {t("greeting")}
                <br />
                <br />
                {t("question")}
              </div>
              <div className={s.chatMessageMeta}>14:42</div>
            </div>
          </div>

          <div className={s.chatBottomArea}>
            <div className={s.chatInputWrapper}>
              <div className={s.chatInputPill}>
                <input className={s.chatInput} placeholder={t("messagePlaceholder")} aria-label={t("messageLabel")} />
                <button type="button" className={s.chatToolbarButton} aria-label={t("emoji")}>
                  <Smile size={20} />
                </button>
              </div>
              <button type="button" className={s.chatSendButton} aria-label={t("send")}>
                <Send size={22} />
              </button>
            </div>
            <div className={s.chatFooter}>
              <span>POWERED BY</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CHATBOT_BRAND} alt="SoftBuild" />
              <strong>SOFTBUILD</strong>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div
      className={`${s.chatRoot} ${raised ? s.chatRootRaised : ""}`}
      data-visual-id="chat-widget"
    >
      <div className={s.chatCollapsed}>
        {showPreview && (
          <div className={s.chatPreview}>
            <div className={s.chatPreviewHeader}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CHATBOT_AVATAR} alt="Bot" className={s.chatPreviewAvatar} />
              <span className={s.chatPreviewTitle}>SoftBuild AI</span>
              <button
                type="button"
                className={s.chatPreviewClose}
                aria-label={t("closeGreeting")}
                onClick={() => setShowPreview(false)}
              >
                <X size={16} />
              </button>
            </div>
            <div className={s.chatPreviewMessage}>{t("preview")}</div>
          </div>
        )}
        <button
          type="button"
          className={s.chatToggle}
          aria-label={t("openChat")}
          onClick={() => {
            setShowPreview(false);
            setIsOpen(true);
          }}
        >
          <span className={s.chatToggleGlow} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={CHATBOT_AVATAR} alt="Chatbot" className={s.chatToggleImage} />
          <span className={s.chatNotification}>1</span>
        </button>
      </div>
    </div>
  );
}

export function FloatingButtons() {
  const t = useTranslations("FloatingButtons");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <ChatWidget raised={showTop} />
      <div className={s.container} data-visual-id="floating-contact-buttons">
      <a
        href={livechatProviders.whatsapp.url}
        target="_blank"
        rel="noreferrer"
        aria-label={t("whatsapp")}
        title={t("whatsapp")}
        className={`${s.btn} ${s.btnWhatsApp}`}
      >
        <span className={`${s.pulse} ${s.pulseGreen}`} />
        <WhatsappIcon />
      </a>

      <a
        href={livechatProviders.zalo.url}
        target="_blank"
        rel="nofollow"
        aria-label="Chat on Zalo"
        title="Chat on Zalo"
        className={`${s.btn} ${s.btnZalo}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ZALO_ICON}
          alt={t("zalo")}
          className={s.iconZaloImg}
          width={56}
          height={56}
        />
      </a>

      <a
        href={livechatProviders.hotline.url}
        aria-label={t("call")}
        title={t("call")}
        className={`${s.btn} ${s.btnPhone}`}
      >
        <span className={`${s.pulse} ${s.pulseOrange}`} />
        <Phone size={24} />
      </a>

      <div className={`${s.topWrapper} ${showTop ? s.topWrapperVisible : ""}`}>
        <button
          type="button"
          className={s.btnTop}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t("backToTop")}
          title={t("backToTop")}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ROBOT_GIF} alt={t("backToTop")} />
        </button>
      </div>
      </div>
    </>
  );
}
