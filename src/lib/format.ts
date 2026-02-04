export const telHref = (phone: string) => `tel:${phone.replace(/\s+/g, '')}`;
export const mailHref = (email: string) => `mailto:${email}`;
export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

const chuSo = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];

function docBlock(so: number, đầyĐủ: boolean): string {
    let chuoi = "";
    const tram = Math.floor(so / 100);
    const chuc = Math.floor((so % 100) / 10);
    const donVi = so % 10;

    if (tram > 0 || đầyĐủ) {
        chuoi += chuSo[tram] + " trăm ";
    }

    if (chuc > 1) {
        chuoi += chuSo[chuc] + " mươi ";
        if (donVi === 1) chuoi += "mốt";
        else if (donVi === 5) chuoi += "lăm";
        else if (donVi > 0) chuoi += chuSo[donVi];
    } else if (chuc === 1) {
        chuoi += "mười ";
        if (donVi === 5) chuoi += "lăm";
        else if (donVi > 0) chuoi += chuSo[donVi];
    } else if (donVi > 0) {
        if (tram > 0 || đầyĐủ) chuoi += "lẻ ";
        chuoi += chuSo[donVi];
    }

    return chuoi.trim();
}

export const numberToWords = (amount: number): string => {
    if (amount === 0) return "Không đồng";
    if (amount < 0) return "Âm " + numberToWords(Math.abs(amount));

    let res = "";
    let so = amount;
    const dv = ["", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ"];
    let i = 0;

    do {
        const block = so % 1000;
        const leftPart = Math.floor(so / 1000);
        if (block > 0) {
            const s = docBlock(block, leftPart > 0);
            res = s + dv[i] + (res ? " " + res : "");
        }
        so = leftPart;
        i++;
    } while (so > 0);

    res = res.trim();
    res = res.charAt(0).toUpperCase() + res.slice(1);
    return res + " đồng";
};
