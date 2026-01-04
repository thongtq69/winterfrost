const contactEmails = [
  { label: 'Email công việc', address: 'info@winterfrost.tech' },
  { label: 'Email hỗ trợ khách hàng', address: 'support@winterfrost.tech' },
  { label: 'Email tuyển dụng', address: 'recruitment@winterfrost.tech' },
] as const;

export const siteConfig = {
  brand: {
    name: 'WinterFrost',
    domain: 'winterfrost.tech',
    tagline: 'Tư vấn phát triển website',
    description: 'WinterFrost thiết kế và tối ưu website chuẩn SEO, tốc độ và chuyển đổi cho doanh nghiệp.',
  },
  contact: {
    phoneDisplay: '0971450454',
    phoneTel: '0971450454',
    email: contactEmails[0].address,
    emails: contactEmails,
    address: 'BE3 Vinhomes Grand Park, Quận 9, TP.HCM',
    onlineSupport: '24/7',
    officeHours: 'T2–T7 09:00–18:00',
  },
  links: {
    zalo: 'https://zalo.me/84971450454',
    facebook: 'https://www.facebook.com/profile.php?id=61585603883149',
    tiktok: 'https://www.tiktok.com/@thongtq68',
    github: 'https://github.com/thongtq69',
    linkedin: 'https://example.com/linkedin',
    youtube: 'https://example.com/youtube',
    instagram: 'https://example.com/instagram',
  },
  socialLabels: {
    zalo: 'Winterforst Tech',
    facebook: 'WinterFort',
  },
  cta: {
    primaryText: 'Liên hệ ngay',
    primaryHref: '/lien-he',
    secondaryText: 'Tư vấn 1-1',
    secondaryHref: '/lien-he',
    zaloText: 'Chat Zalo ngay',
  },
  legal: {
    privacyHref: '/chinh-sach-bao-mat',
    termsHref: '/dieu-khoan',
  },
  assets: {
    logoPath: '/brand/logo.png',
    markPath: '/brand/mark.png',
    zaloQrPath: '/brand/zalo-qr.png',
    ogImagePath: '/og.jpg',
    faviconPath: '/favicon.ico',
  },
} as const;
