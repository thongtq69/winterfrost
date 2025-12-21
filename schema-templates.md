# SCHEMA MARKUP TEMPLATES
## winterfrost.tech - Ready to Use

Copy và paste các templates này vào website của bạn. Thay thế các giá trị trong ngoặc [] bằng thông tin thực tế.

---

## 1. LOCAL BUSINESS SCHEMA (Homepage)

Paste vào `<head>` section của homepage:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "WinterFrost",
  "image": "https://winterfrost.tech/brand/mark.png",
  "description": "WinterFrost thiết kế và tối ưu website chuẩn SEO, tốc độ và chuyển đổi cho doanh nghiệp",
  "@id": "https://winterfrost.tech",
  "url": "https://winterfrost.tech",
  "telephone": "0971450454",
  "email": "quocthong0801@gmail.com",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "BE3 Vinhomes Grand Park",
    "addressLocality": "Quận 9",
    "addressRegion": "TP.HCM",
    "postalCode": "700000",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 10.8471,
    "longitude": 106.8358
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/winterfrost",
    "https://www.linkedin.com/company/winterfrost",
    "https://www.tiktok.com/@winterfrost"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "69"
  }
}
</script>
```

---

## 2. ORGANIZATION SCHEMA (Alternative)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "WinterFrost",
  "alternateName": "WinterFrost Tech",
  "url": "https://winterfrost.tech",
  "logo": "https://winterfrost.tech/brand/mark.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+84-971-450-454",
    "contactType": "customer service",
    "areaServed": "VN",
    "availableLanguage": ["Vietnamese", "English"]
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "BE3 Vinhomes Grand Park",
    "addressLocality": "Quận 9",
    "addressRegion": "TP.HCM",
    "postalCode": "700000",
    "addressCountry": "VN"
  },
  "sameAs": [
    "https://www.facebook.com/winterfrost",
    "https://www.linkedin.com/company/winterfrost",
    "https://www.tiktok.com/@winterfrost"
  ]
}
</script>
```

---

## 3. WEBSITE SCHEMA

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "WinterFrost",
  "url": "https://winterfrost.tech",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://winterfrost.tech/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
</script>
```

---

## 4. SERVICE SCHEMA - Thiết Kế Website Bán Hàng

Paste vào trang: `/dich-vu/thiet-ke-website-ban-hang/`

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Thiết kế website bán hàng",
  "provider": {
    "@type": "LocalBusiness",
    "name": "WinterFrost",
    "telephone": "0971450454",
    "url": "https://winterfrost.tech"
  },
  "url": "https://winterfrost.tech/dich-vu/thiet-ke-website-ban-hang",
  "name": "Thiết Kế Website Bán Hàng Chuyên Nghiệp",
  "description": "Thiết kế website bán hàng online chuẩn UX, tối ưu chuyển đổi, tích hợp cổng thanh toán và bảo mật cao",
  "areaServed": {
    "@type": "Country",
    "name": "Vietnam"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Gói dịch vụ thiết kế website bán hàng",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Website bán hàng cơ bản"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Website bán hàng chuyên nghiệp"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Website bán hàng cao cấp"
        }
      }
    ]
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "VND",
    "lowPrice": "15000000",
    "highPrice": "50000000"
  }
}
</script>
```

---

## 5. SERVICE SCHEMA - Thiết Kế Website Doanh Nghiệp

Paste vào trang: `/dich-vu/thiet-ke-website-doanh-nghiep/`

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Thiết kế website doanh nghiệp",
  "provider": {
    "@type": "LocalBusiness",
    "name": "WinterFrost",
    "telephone": "0971450454",
    "url": "https://winterfrost.tech"
  },
  "url": "https://winterfrost.tech/dich-vu/thiet-ke-website-doanh-nghiep",
  "name": "Thiết Kế Website Doanh Nghiệp Chuyên Nghiệp",
  "description": "Thiết kế website doanh nghiệp thể hiện uy tín thương hiệu, chuẩn SEO technical và dễ mở rộng",
  "areaServed": {
    "@type": "Country",
    "name": "Vietnam"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "VND",
    "lowPrice": "20000000",
    "highPrice": "80000000"
  }
}
</script>
```

---

## 6. SERVICE SCHEMA - Thiết Kế Landing Page

Paste vào trang: `/dich-vu/thiet-ke-landing-page-chuyen-nghiep/`

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Thiết kế landing page",
  "provider": {
    "@type": "LocalBusiness",
    "name": "WinterFrost",
    "telephone": "0971450454",
    "url": "https://winterfrost.tech"
  },
  "url": "https://winterfrost.tech/dich-vu/thiet-ke-landing-page-chuyen-nghiep",
  "name": "Thiết Kế Landing Page Tối Ưu Chuyển Đổi",
  "description": "Thiết kế landing page chuyên nghiệp cho chiến dịch quảng cáo với storytelling theo hành trình và CTA rõ ràng",
  "areaServed": {
    "@type": "Country",
    "name": "Vietnam"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "VND",
    "lowPrice": "8000000",
    "highPrice": "25000000"
  }
}
</script>
```

---

## 7. BREADCRUMB SCHEMA - Template

Sử dụng cho service pages, blog posts, project pages:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Trang chủ",
      "item": "https://winterfrost.tech/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Dịch vụ",
      "item": "https://winterfrost.tech/dich-vu"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[Tên dịch vụ cụ thể]",
      "item": "[URL đầy đủ]"
    }
  ]
}
</script>
```

**Ví dụ cho website bán hàng:**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Trang chủ",
      "item": "https://winterfrost.tech/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Dịch vụ",
      "item": "https://winterfrost.tech/dich-vu"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Thiết kế website bán hàng",
      "item": "https://winterfrost.tech/dich-vu/thiet-ke-website-ban-hang"
    }
  ]
}
</script>
```

---

## 8. FAQ SCHEMA - Template

Thêm vào cuối mỗi service page:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Chi phí thiết kế website bán hàng là bao nhiêu?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chi phí thiết kế website bán hàng thường từ 15-50 triệu VNĐ tùy vào quy mô và tính năng. WinterFrost cung cấp 3 gói: Basic (15-20tr), Professional (25-35tr) và Premium (40-50tr). Liên hệ 0971450454 để được tư vấn chi tiết."
      }
    },
    {
      "@type": "Question",
      "name": "Thời gian hoàn thành website bán hàng là bao lâu?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Thời gian triển khai website bán hàng thường từ 2-6 tuần tùy độ phức tạp. Gồm: Nghiên cứu & lên kế hoạch (1 tuần), Thiết kế UI/UX (1-2 tuần), Phát triển & test (1-2 tuần), Launch & đào tạo (1 tuần)."
      }
    },
    {
      "@type": "Question",
      "name": "Website có được tối ưu SEO không?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tất cả website của WinterFrost đều được tối ưu SEO technical từ đầu: tốc độ tải nhanh, mobile-friendly, schema markup, sitemap, meta tags chuẩn. Chúng tôi cung cấp hướng dẫn SEO on-page và có dịch vụ SEO nâng cao nếu cần."
      }
    },
    {
      "@type": "Question",
      "name": "Có hỗ trợ sau khi bàn giao website không?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WinterFrost cung cấp 3-6 tháng hỗ trợ miễn phí sau bàn giao (tùy gói). Bao gồm: sửa lỗi kỹ thuật, hướng dẫn sử dụng, tư vấn nội dung. Có gói bảo trì dài hạn với chi phí ưu đãi."
      }
    },
    {
      "@type": "Question",
      "name": "Website có tích hợp được với hệ thống hiện tại không?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Có, WinterFrost có kinh nghiệm tích hợp website với các hệ thống: CRM, ERP, payment gateway, email marketing, analytics, và các API bên thứ 3. Chúng tôi phân tích nhu cầu và đề xuất giải pháp phù hợp."
      }
    }
  ]
}
</script>
```

---

## 9. REVIEW/RATING SCHEMA

Cho trang project hoặc testimonials:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "name": "WinterFrost"
  },
  "author": {
    "@type": "Person",
    "name": "[Tên khách hàng]"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "reviewBody": "[Nội dung đánh giá của khách hàng]",
  "datePublished": "2024-12-01"
}
</script>
```

**Aggregate Rating (cho homepage):**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "WinterFrost",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "69",
    "bestRating": "5",
    "worstRating": "4"
  }
}
</script>
```

---

## 10. ARTICLE SCHEMA (Cho Blog Posts)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Tiêu đề bài viết]",
  "description": "[Meta description]",
  "image": "[URL hình đại diện]",
  "author": {
    "@type": "Person",
    "name": "WinterFrost Team",
    "url": "https://winterfrost.tech"
  },
  "publisher": {
    "@type": "Organization",
    "name": "WinterFrost",
    "logo": {
      "@type": "ImageObject",
      "url": "https://winterfrost.tech/brand/mark.png"
    }
  },
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "[URL bài viết đầy đủ]"
  }
}
</script>
```

---

## 11. HOW-TO SCHEMA (Cho Tutorial Posts)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "[Tiêu đề hướng dẫn]",
  "description": "[Mô tả ngắn]",
  "image": "[URL hình ảnh]",
  "totalTime": "PT2H",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "VND",
    "value": "0"
  },
  "tool": [
    {
      "@type": "HowToTool",
      "name": "[Công cụ 1]"
    },
    {
      "@type": "HowToTool",
      "name": "[Công cụ 2]"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "[Tên bước 1]",
      "text": "[Mô tả bước 1]",
      "image": "[URL hình ảnh bước 1]",
      "url": "[URL anchor đến bước 1]"
    },
    {
      "@type": "HowToStep",
      "name": "[Tên bước 2]",
      "text": "[Mô tả bước 2]",
      "image": "[URL hình ảnh bước 2]",
      "url": "[URL anchor đến bước 2]"
    }
  ]
}
</script>
```

---

## 12. VIDEO SCHEMA (Cho Video Content)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "[Tiêu đề video]",
  "description": "[Mô tả video]",
  "thumbnailUrl": "[URL thumbnail]",
  "uploadDate": "[YYYY-MM-DD]",
  "duration": "PT5M30S",
  "contentUrl": "[URL video]",
  "embedUrl": "[URL embed]",
  "publisher": {
    "@type": "Organization",
    "name": "WinterFrost",
    "logo": {
      "@type": "ImageObject",
      "url": "https://winterfrost.tech/brand/mark.png"
    }
  }
}
</script>
```

---

## 13. COURSE SCHEMA (Nếu có khóa học)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Khóa học thiết kế website WordPress với Elementor",
  "description": "Khóa học toàn diện từ cơ bản đến nâng cao về thiết kế website WordPress",
  "provider": {
    "@type": "Organization",
    "name": "WinterFrost",
    "sameAs": "https://winterfrost.tech"
  },
  "offers": {
    "@type": "Offer",
    "category": "Paid",
    "priceCurrency": "VND",
    "price": "2990000"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "Online",
    "courseWorkload": "PT40H"
  }
}
</script>
```

---

## IMPLEMENTATION CHECKLIST

### Priority 1 (Must Have):
- [ ] LocalBusiness Schema (Homepage)
- [ ] Service Schema (All service pages)
- [ ] BreadcrumbList Schema (All pages except homepage)
- [ ] FAQ Schema (Service pages)

### Priority 2 (Should Have):
- [ ] Organization Schema (Homepage)
- [ ] Website Schema (Homepage)
- [ ] Review/Rating Schema (Testimonials page)
- [ ] Article Schema (Blog posts)

### Priority 3 (Nice to Have):
- [ ] HowTo Schema (Tutorial posts)
- [ ] Video Schema (If applicable)
- [ ] Course Schema (If applicable)
- [ ] AggregateRating (Homepage)

---

## TESTING & VALIDATION

**After implementing, test with these tools:**

1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Test each page individually

2. **Schema.org Validator**
   - URL: https://validator.schema.org/
   - Paste code or test live URL

3. **Google Search Console**
   - Check "Enhancements" section
   - Monitor rich results status

**Common Issues to Check:**
- ✅ No syntax errors
- ✅ All required properties included
- ✅ Dates in ISO format (YYYY-MM-DD)
- ✅ URLs are absolute (include https://)
- ✅ Images are accessible
- ✅ No duplicate schemas

---

## NEXT.JS IMPLEMENTATION

Nếu dùng Next.js, implement schema trong component:

```javascript
// components/Schema.tsx
interface SchemaProps {
  schema: object;
}

export default function Schema({ schema }: SchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Usage in page:
import Schema from '@/components/Schema';

export default function HomePage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    // ... rest of schema
  };

  return (
    <>
      <Schema schema={localBusinessSchema} />
      {/* Rest of page content */}
    </>
  );
}
```

---

## WORDPRESS IMPLEMENTATION

Nếu dùng WordPress, có thể:

1. **Manual (Theme footer):**
   - Paste vào `footer.php` hoặc `header.php`

2. **Plugin:**
   - Schema Pro
   - Rank Math (có built-in schema)
   - Yoast SEO Premium

3. **Custom Fields:**
   - Advanced Custom Fields
   - Meta Box

---

**TIP:** Start with LocalBusiness và Service schemas - these have the biggest SEO impact! 🚀
