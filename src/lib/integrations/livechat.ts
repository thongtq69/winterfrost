// TODO_BACKEND: Live chat widget (Zalo OA / Crisp / Tawk.to)
// Để gắn thật: set LIVECHAT_PROVIDER_ID env, import widget script trong layout.

export const livechatProviders = {
  // Khi có ZALO_OA_ID, dán https://zalo.me/{ID} vào nút
  zalo: { url: "https://zalo.me/0971450454", label: "Chat Zalo" },
  whatsapp: { url: "https://wa.me/+84971450454", label: "WhatsApp" },
  hotline: { url: "tel:+84971450454", label: "Gọi 097 145 04 54" },
};
