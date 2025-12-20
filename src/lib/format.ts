export const telHref = (phone: string) => `tel:${phone.replace(/\s+/g, '')}`;
export const mailHref = (email: string) => `mailto:${email}`;
