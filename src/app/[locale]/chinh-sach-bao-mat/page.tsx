import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { Rocket } from "lucide-react";
import s from "./page.module.css";
import { LocalizedTree } from "@/components/i18n/LocalizedTree";
import { getAutoText } from "@/i18n/auto-text-server";
import { isSupportedLocale, routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: candidate } = await params;
  const locale = isSupportedLocale(candidate) ? candidate : routing.defaultLocale;
  const tr = await getAutoText(locale);
  return {
    title: tr("Chính sách bảo mật"),
    description: tr("Chính sách bảo mật thông tin khách hàng và người dùng tại Winterfrost."),
  };
}

const purposeCards = [
  { title: "Lưu trữ hồ sơ nội bộ", text: "Quản lý thông tin khách hàng và đối tác." },
  { title: "Cải thiện dịch vụ", text: "Chúng tôi có thể sử dụng thông tin để cải thiện các sản phẩm và dịch vụ phần mềm của mình." },
  { title: "Tiếp thị và truyền thông", text: "Định kỳ, chúng tôi có thể gửi email quảng cáo về các dịch vụ mới, các ưu đãi đặc biệt hoặc các thông tin khác mà chúng tôi cho rằng bạn sẽ quan tâm thông qua địa chỉ email bạn đã cung cấp." },
];

const controlCards = [
  { title: "Tại thời điểm cung cấp thông tin", text: "Bất cứ khi nào bạn được yêu cầu điền vào một biểu mẫu trên trang web, hãy tìm ô chọn để chỉ định rằng bạn không muốn thông tin của mình được bất kỳ ai sử dụng cho mục đích tiếp thị trực tiếp." },
  { title: "Thay đổi quyết định và rút lại sự cho phép", text: "Nếu trước đây bạn đã đồng ý cho chúng tôi sử dụng thông tin cá nhân cho mục đích tiếp thị trực tiếp, bạn có thể thay đổi quyết định bất cứ lúc nào bằng cách viết thư hoặc gửi email cho chúng tôi." },
];

function NumberCard({ index, title, text }: { index: number; title: string; text: string }) {
  return (
    <article className={s.numberCard}>
      <span className={s.bigNumber}>{index}</span>
      <Rocket aria-hidden="true" />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <LocalizedTree>
    <main className={s.main}>
      <div className={s.container}>
        <nav className={s.breadcrumb}><Link href="/">Trang chủ</Link><span>/</span><span>Chính sách bảo mật</span></nav>

        <section className={s.introBox}>
          <h1>Chính sách bảo mật</h1>
          <p>Chính sách bảo mật này quy định cách thức Winterfrost sử dụng và bảo vệ bất kỳ thông tin nào bạn cung cấp khi sử dụng trang web https://winterfrost.tech</p>
          <p>Winterfrost cam kết bảo vệ quyền riêng tư của bạn. Khi chúng tôi yêu cầu bạn cung cấp một số thông tin nhất định để nhận diện trong quá trình sử dụng trang web này, bạn có thể hoàn toàn yên tâm rằng thông tin đó sẽ chỉ được sử dụng theo đúng các điều khoản trong tuyên bố bảo mật này.</p>
          <p>Winterfrost có thể thay đổi chính sách này tùy theo từng thời điểm bằng cách cập nhật trên trang web. Bạn nên kiểm tra trang này định kỳ để đảm bảo luôn nắm bắt và đồng ý với các thay đổi. Chính sách này có hiệu lực từ ngày 1 tháng 1 năm 2017</p>
        </section>

        <section className={s.section}>
          <h2 className={s.leftTitle}>Chúng tôi làm gì với thông tin thu thập được</h2>
          <div className={s.cards3}>{purposeCards.map((card, index) => <NumberCard {...card} index={index + 1} key={card.title} />)}</div>
        </section>

        <section className={s.section}>
          <h2>Những thông tin chúng tôi thu thập</h2>
          <p>Chúng tôi có thể thu thập các thông tin sau:</p>
          <ul className={s.infoList}>
            <li>Thông tin liên hệ bao gồm địa chỉ email, số điện thoại.</li>
            <li>Thông tin nhân khẩu học như mã bưu điện, sở thích và mối quan tâm.</li>
            <li>Các thông tin khác có liên quan đến khảo sát khách hàng và/hoặc các chương trình ưu đãi.</li>
          </ul>
        </section>

        <section className={s.section}>
          <h2>Bảo mật</h2>
          <p>Chúng tôi cam kết đảm bảo rằng thông tin của bạn được an toàn. Để ngăn chặn các hành vi truy cập hoặc tiết lộ trái phép, chúng tôi đã áp dụng các quy trình quản lý, điện tử và vật lý phù hợp để bảo vệ và bảo mật mọi thông tin thu thập trực tuyến.</p>
        </section>

        <section className={s.section}>
          <h2>Cách chúng tôi sử dụng Cookie</h2>
          <p>Cookie là một tệp nhỏ yêu cầu quyền được lưu trữ trên ổ cứng máy tính của bạn. Khi bạn đồng ý, tệp sẽ được thêm vào và cookie giúp phân tích lưu lượng truy cập web hoặc thông báo cho bạn biết khi bạn truy cập một trang cụ thể. Cookie cho phép các ứng dụng web phản hồi bạn với tư cách là một cá nhân độc lập. Ứng dụng web có thể tùy chỉnh các hoạt động theo nhu cầu, sở thích của bạn bằng cách thu thập và ghi nhớ thông tin.</p>
          <p>Chúng tôi sử dụng cookie nhật ký lưu lượn để xác định các trang đang được sử dụng. Điều này giúp chúng tôi phân tích dữ liệu về lưu lượng trang web và cải thiện nền tảng nhằm đáp ứng tốt hơn nhu cầu của khách hàng. Chúng tôi chỉ sử dụng thông tin này cho mục đích phân tích thống kê, sau đó dữ liệu sẽ được xóa khỏi hệ thống.</p>
          <p>Nhìn chung, cookie giúp chúng tôi cung cấp cho bạn một trang web hoạt động tốt hơn bằng cách theo dõi các trang bạn thấy hữu ích và các trang thì không. Cookie hoàn toàn không cấp cho chúng tôi quyền truy cập vào máy tính của bạn hoặc bất kỳ thông tin nào về bạn, ngoại trừ dữ liệu bạn chủ động chia sẻ với chúng tôi.</p>
          <p>Bạn có thể chọn chấp nhận hoặc từ chối cookie. Hầu hết các trình duyệt web tự động chấp nhận cookie, nhưng bạn thường có thể sửa đổi cài đặt trình duyệt của mình để từ chối cookie nếu muốn. Tuy nhiên, điều này có thể ngăn bạn tận dụng tối đa các tính năng của trang web.</p>
        </section>

        <section className={s.section}>
          <h2>Liên kết đến các trang web khác</h2>
          <p>Trang web của chúng tôi có thể chứa các liên kết dẫn đến các trang web khác. Tuy nhiên, một khi bạn đã sử dụng các liên kết này để rời khỏi trang web của Winterfrost, bạn cần lưu ý rằng chúng tôi không có bất kỳ quyền kiểm soát nào đối với trang web của bên thứ ba đó. Do đó, chúng tôi không thể chịu trách nhiệm về việc bảo vệ quyền riêng tư đối với bất kỳ thông tin nào bạn cung cấp khi truy cập các trang này, và các trang đó cũng không chịu sự chi phối của tuyên bố bảo mật này. Bạn nên thận trọng và xem xét các chính sách bảo mật áp dụng cho trang web được đề cập.</p>
        </section>

        <section className={`${s.section} ${s.controlSection}`}>
          <h2>Kiểm soát thông tin cá nhân của bạn</h2>
          <p>Bạn có thể chọn hạn chế việc thu thập hoặc sử dụng thông tin cá nhân của mình theo các cách sau:</p>
          <div className={s.cards2}>{controlCards.map((card, index) => <NumberCard {...card} index={index + 1} key={card.title} />)}</div>
          <p>Chúng tôi sẽ không bán, phân phối hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba trừ khi chúng tôi có sự cho phép của bạn hoặc bị pháp luật yêu cầu. Chúng tôi có thể sử dụng thông tin cá nhân của bạn để gửi cho bạn thông tin quảng cáo về các bên thứ ba mà chúng tôi nghĩ rằng bạn có thể thấy thú vị nếu bạn cho chúng tôi biết bạn muốn điều này xảy ra.</p>
          <p>Nếu bạn cho rằng bất kỳ thông tin nào chúng tôi đang lưu giữ về bạn là không chính xác hoặc không đầy đủ, vui lòng liên hệ ngay với chúng tôi. Chúng tôi sẽ nhanh chóng sửa chữa bất kỳ thông tin nào được phát hiện là chưa chính xác.</p>
          <p>Nếu bạn có bất kỳ câu hỏi nào về chính sách này, vui lòng liên hệ trực tiếp tại văn phòng của chúng tôi ở Vinhomes Grand Park, Quận 9, Thành phố Hồ Chí Minh, hoặc qua email info@winterfrost.tech để nhận được sự hỗ trợ của công ty.</p>
        </section>
      </div>
    </main>
    </LocalizedTree>
  );
}
