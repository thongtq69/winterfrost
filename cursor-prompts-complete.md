# CURSOR AI PROMPT - SEO IMPLEMENTATION
## Website: winterfrost.tech (Next.js)

---

## 🎯 PHASE 1: TECHNICAL SEO FOUNDATION

### Prompt 1: Meta Tags Optimization

```
Tôi cần bạn optimize toàn bộ meta tags cho website Next.js của tôi (winterfrost.tech).

CONTEXT:
- Website về dịch vụ thiết kế website
- Tech stack: Next.js 14+ với App Router
- Target audience: Doanh nghiệp Việt Nam cần website
- Địa điểm: TP.HCM, Việt Nam

REQUIREMENTS:

1. Tạo file metadata.ts với cấu trúc tái sử dụng:
   - Base metadata config
   - Function generateMetadata() cho dynamic pages
   - Hỗ trợ Open Graph và Twitter Cards

2. Implement metadata cho các pages sau:

   a) Homepage (/):
      - Title: "Thiết Kế Website Chuẩn SEO & Tối Ưu Chuyển Đổi | WinterFrost TP.HCM"
      - Description: "WinterFrost chuyên thiết kế website chuẩn SEO, tối ưu chuyển đổi cho doanh nghiệp tại TP.HCM. ✓ 86+ dự án thành công ✓ 10+ năm kinh nghiệm ✓ Tư vấn 1-1 miễn phí. Liên hệ: 0971450454"
      - Keywords: thiết kế website, thiết kế web, website chuẩn seo, tphcm
      - Open Graph image: /og-image-home.jpg
      - Canonical: https://winterfrost.tech/

   b) Service Page - Website Bán Hàng (/dich-vu/thiet-ke-website-ban-hang):
      - Title: "Thiết Kế Website Bán Hàng Online Chuẩn SEO | Tích Hợp Thanh Toán | WinterFrost"
      - Description: "Thiết kế website bán hàng online chuyên nghiệp, chuẩn UX/UI, tối ưu chuyển đổi. Tích hợp cổng thanh toán, bảo mật cao, tốc độ nhanh. Tư vấn miễn phí: 0971450454"
      
   c) Service Page - Website Doanh Nghiệp (/dich-vu/thiet-ke-website-doanh-nghiep):
      - Title: "Thiết Kế Website Doanh Nghiệp Chuyên Nghiệp | Chuẩn SEO Technical | WinterFrost"
      - Description: "Thiết kế website doanh nghiệp uy tín, chuẩn SEO technical, dễ quản lý và mở rộng. Thể hiện thương hiệu chuyên nghiệp, tăng độ tin cậy. Báo giá: 0971450454"
      
   d) Service Page - Landing Page (/dich-vu/thiet-ke-landing-page-chuyen-nghiep):
      - Title: "Thiết Kế Landing Page Tối Ưu Chuyển Đổi | CRO Chuyên Nghiệp | WinterFrost"
      - Description: "Thiết kế landing page tối ưu chuyển đổi cho chiến dịch quảng cáo. Storytelling theo hành trình khách hàng, form lead automation. ROI cao. Liên hệ: 0971450454"

   e) Projects Page (/du-an):
      - Title: "Dự Án Website Đã Thực Hiện | Portfolio WinterFrost | 86+ Dự Án Thành Công"
      - Description: "Khám phá 86+ dự án website thành công của WinterFrost. Case studies chi tiết với metrics thực tế. Website bán hàng, landing page, doanh nghiệp."

   f) Contact Page (/lien-he):
      - Title: "Liên Hệ Tư Vấn Thiết Kế Website | Hotline 0971450454 | WinterFrost TP.HCM"
      - Description: "Liên hệ WinterFrost để được tư vấn thiết kế website miễn phí. Hotline: 0971450454, Email: quocthong0801@gmail.com. Văn phòng tại Vinhomes Grand Park, Quận 9, TP.HCM."

3. Đảm bảo:
   - Mọi page đều có canonical URL
   - Robots meta tags phù hợp
   - Viewport và charset đúng
   - Theme color
   - Manifest link
   - Apple touch icons

4. Tạo file config riêng cho các constant như:
   - Site name: "WinterFrost"
   - Site URL: "https://winterfrost.tech"
   - Default OG image
   - Social media handles
   - Contact info

OUTPUT:
- Show me file structure
- Complete code cho metadata.ts
- Example implementation trong 2-3 pages
- Instructions để apply cho remaining pages
```

---

### Prompt 2: Schema Markup Implementation

```
Tôi cần implement Schema.org structured data cho website Next.js.

CONTEXT:
- Website: winterfrost.tech
- Business: Công ty thiết kế website tại TP.HCM
- Tech: Next.js App Router
- Mục tiêu: Rich results trong Google Search

REQUIREMENTS:

1. Tạo Schema Component Library trong /components/schema/:
   - LocalBusinessSchema.tsx
   - ServiceSchema.tsx
   - BreadcrumbSchema.tsx
   - FAQSchema.tsx
   - ReviewSchema.tsx
   - ArticleSchema.tsx
   - OrganizationSchema.tsx

2. LocalBusiness Schema (cho Homepage):
   Business info:
   - Name: WinterFrost
   - Type: LocalBusiness / ProfessionalService
   - Address: BE3 Vinhomes Grand Park, Quận 9, TP.HCM, Vietnam
   - Postal Code: 700000
   - Phone: 0971450454 / +84971450454
   - Email: quocthong0801@gmail.com
   - Coordinates: 10.8471, 106.8358
   - Hours: Monday-Saturday 09:00-18:00
   - Price Range: $$
   - Rating: 4.8/5 (69 reviews)
   - Social: Facebook, LinkedIn, TikTok
   
3. Service Schema (cho từng service page):
   Services:
   a) Thiết kế website bán hàng (15M - 50M VND)
   b) Thiết kế website doanh nghiệp (20M - 80M VND)
   c) Thiết kế landing page (8M - 25M VND)
   d) Thiết kế website theo yêu cầu (Custom pricing)

4. Breadcrumb Schema:
   - Dynamic generation based on route
   - Include proper position và item hierarchy
   
5. FAQ Schema (cho service pages):
   Common FAQs:
   - Chi phí thiết kế website?
   - Thời gian hoàn thành?
   - Có tối ưu SEO không?
   - Hỗ trợ sau bàn giao?
   - Tích hợp với hệ thống hiện có?

6. Implementation pattern:
   - TypeScript interfaces cho all schemas
   - Reusable components với props
   - Type-safe
   - Easy to maintain
   - Server-side rendering compatible

7. Validation:
   - Schemas phải pass Google Rich Results Test
   - Follow Schema.org standards
   - Proper escaping cho special characters
   - ISO date formats

OUTPUT:
- Complete TypeScript components cho all schema types
- Usage examples trong pages
- Type definitions
- Validation checklist
```

---

### Prompt 3: Robots.txt & Sitemap Generation

```
Setup robots.txt và dynamic sitemap generation cho Next.js website.

REQUIREMENTS:

1. Create /app/robots.ts:
   - Allow all crawlers
   - Disallow: /api/, /admin/, /_next/
   - Sitemap URL: https://winterfrost.tech/sitemap.xml
   
2. Create /app/sitemap.ts với dynamic generation:
   
   URLs cần include:
   
   Static pages (Priority 1.0):
   - / (homepage)
   
   Service pages (Priority 0.9):
   - /dich-vu/thiet-ke-website-ban-hang
   - /dich-vu/thiet-ke-website-doanh-nghiep
   - /dich-vu/thiet-ke-landing-page-chuyen-nghiep
   - /dich-vu/thiet-ke-website-theo-yeu-cau
   
   Project pages (Priority 0.8):
   - /du-an (listing)
   - /du-an/[slug] (fetch từ data source)
   
   Blog/Knowledge pages (Priority 0.7):
   - /kien-thuc (listing)
   - /kien-thuc/[slug] (fetch từ data source)
   
   Other pages (Priority 0.6):
   - /lien-he
   - /khoa-hoc/thiet-ke-website-wordpress-elementor
   - /tiktok
   - /chinh-sach-bao-mat
   - /dieu-khoan

3. Sitemap features:
   - lastModified dates (real hoặc estimated)
   - changeFrequency (daily cho blog, weekly cho services, monthly cho static)
   - Proper URL encoding
   - Valid XML format

4. Nếu có nhiều URLs, create sitemap index:
   - /sitemap.xml (index)
   - /sitemap/pages.xml
   - /sitemap/projects.xml
   - /sitemap/blog.xml

OUTPUT:
- Complete robots.ts file
- Complete sitemap.ts file
- Instructions để test locally
- Commands để verify XML validity
```

---

### Prompt 4: Performance Optimization

```
Optimize website performance để đạt PageSpeed 90+ (mobile và desktop).

CURRENT ISSUES (nếu biết):
[Paste Google PageSpeed Insights results nếu có]

REQUIREMENTS:

1. Image Optimization:
   - Convert all images sang WebP với fallback
   - Implement lazy loading cho images below fold
   - Add proper width/height attributes
   - Use Next.js Image component với optimization
   - Compress images (80-85% quality)
   - Responsive images với srcset
   - Add blur placeholder cho better UX
   
2. Font Optimization:
   - Use next/font để optimize font loading
   - Preload critical fonts
   - Font display: swap
   - Subset fonts nếu cần (Vietnamese characters)
   
3. JavaScript Optimization:
   - Code splitting với dynamic imports
   - Remove unused dependencies
   - Defer non-critical JS
   - Minimize third-party scripts
   
4. CSS Optimization:
   - Critical CSS inline
   - Remove unused CSS
   - Minify CSS
   - Use CSS modules hoặc Tailwind JIT
   
5. Core Web Vitals:
   Target metrics:
   - LCP (Largest Contentful Paint): < 2.5s
   - FID (First Input Delay): < 100ms
   - CLS (Cumulative Layout Shift): < 0.1
   - TTFB (Time to First Byte): < 600ms
   
   Specific optimizations:
   - Optimize hero section loading
   - Add resource hints (preconnect, dns-prefetch)
   - Avoid layout shifts với reserved space
   - Lazy load below-fold content
   
6. Caching Strategy:
   - Setup proper Cache-Control headers
   - Service Worker cho offline support (optional)
   - Browser caching rules
   
7. Third-party Scripts:
   Defer loading cho:
   - Google Analytics
   - Facebook Pixel (nếu có)
   - Zalo chat widget
   - Any other tracking scripts
   
8. Bundle Optimization:
   - Analyze bundle size: npm run build
   - Remove duplicate dependencies
   - Tree shaking
   - Minimize vendor chunks

OUTPUT:
- Updated next.config.js với optimization settings
- Image optimization examples
- Font loading implementation
- List of removed/deferred scripts
- Before/after bundle size comparison
- Performance testing checklist
```

---

## 🎯 PHASE 2: ON-PAGE SEO

### Prompt 5: Heading Structure Optimization

```
Optimize heading structure (H1-H6) cho toàn bộ website theo SEO best practices.

REQUIREMENTS:

1. Homepage (/):
   - H1: "Thiết kế website tối ưu chuyển đổi & chuẩn SEO" (main heading, duy nhất)
   - H2: Section headings
     * "Tập trung insight, tốc độ và đo lường"
     * "Thiết kế & phát triển website tối ưu chuyển đổi"
     * "Một số dự án gần đây"
     * "Cùng thảo luận mục tiêu website của bạn"
   - H3: Subsection headings (cho features, services)

2. Service Pages:
   Template structure cho mỗi service page:
   
   - H1: "[Service Name] - [Key Benefit]" (e.g., "Thiết Kế Website Bán Hàng Chuyên Nghiệp - Tăng Doanh Thu Online")
   - H2: Main sections
     * "Tại sao cần [service]?"
     * "Tính năng nổi bật"
     * "Quy trình thực hiện 6 bước"
     * "Gói dịch vụ và bảng giá"
     * "Case study thành công"
     * "Câu hỏi thường gặp"
   - H3: Sub-sections (steps, features, FAQs)
   
3. Blog Posts:
   - H1: Article title (duy nhất)
   - H2: Main sections
   - H3-H4: Sub-sections
   - Không skip levels (H2 → H4)
   
4. Rules:
   - Mỗi page chỉ 1 H1
   - H1 chứa primary keyword
   - H2-H3 chứa secondary keywords
   - Hierarchy logic (không skip levels)
   - Descriptive và actionable
   - Length: H1 (40-60 chars), H2 (30-50 chars)

OUTPUT:
- Current heading audit (if possible)
- Optimized heading structure cho 3-5 example pages
- Reusable heading components với proper semantic HTML
- Before/after comparison
```

---

### Prompt 6: Internal Linking System

```
Implement comprehensive internal linking strategy cho website.

REQUIREMENTS:

1. Create Internal Link Component:
   File: /components/InternalLink.tsx
   Features:
   - Automatic rel/target handling
   - Analytics tracking
   - SEO-friendly anchor text
   - Hover preview (optional)
   
2. Link Strategy:

   a) Homepage links to:
      - All 4 service pages (prominent)
      - Projects page
      - Blog/knowledge hub
      - Contact page
      - About section
      
   b) Service pages link to:
      - Related services (sidebar/footer)
      - Relevant blog posts (3-5)
      - Case studies
      - Contact/CTA
      - Homepage breadcrumb
      
   c) Blog posts link to:
      - 3-5 related posts
      - Relevant service pages (1-2)
      - Pillar content (if applicable)
      - Category/tag pages
      
   d) Project pages link to:
      - Related service used
      - Similar projects
      - Contact page
      - Service inquiry
      
3. Anchor Text Strategy:
   Types of anchors:
   - Exact match: "thiết kế website bán hàng" (sparingly)
   - Partial match: "dịch vụ thiết kế website chuyên nghiệp"
   - Branded: "WinterFrost"
   - Generic: "tìm hiểu thêm", "xem chi tiết"
   - Natural: "giải pháp website phù hợp với ngân sách"
   
   Distribution: 30% exact/partial, 20% branded, 50% natural
   
4. Related Posts/Services Component:
   Create dynamic component:
   - Fetches related content based on category/tags
   - Shows 3-6 items với thumbnail
   - Compelling titles và excerpts
   - CTA button
   
5. Breadcrumbs:
   Implement visual breadcrumbs cho:
   - Service pages
   - Project pages
   - Blog posts
   - Include structured data (already done in Schema prompt)
   
6. Footer Sitemap:
   Comprehensive footer với:
   - All main sections
   - Popular services
   - Recent projects
   - Latest blog posts
   - Important pages
   
7. Orphan Page Check:
   - Every page accessible trong 3 clicks từ homepage
   - No isolated pages
   - Proper navigation hierarchy

OUTPUT:
- InternalLink component with TypeScript
- RelatedContent component
- Breadcrumbs component
- Footer sitemap structure
- Link placement recommendations for 5 pages
- Anchor text examples list
```

---

### Prompt 7: Content Expansion for Service Pages

```
Expand và optimize content cho service pages (minimum 1000 words mỗi page).

CONTEXT:
Current service pages có content ngắn. Cần expand với valuable information while maintaining keyword optimization.

TARGET PAGES:
1. /dich-vu/thiet-ke-website-ban-hang
2. /dich-vu/thiet-ke-website-doanh-nghiep
3. /dich-vu/thiet-ke-landing-page-chuyen-nghiep
4. /dich-vu/thiet-ke-website-theo-yeu-cau

REQUIREMENTS FOR EACH PAGE:

1. Structure (Template):

   ```
   H1: [Service Title với Primary Keyword]
   
   Intro paragraph (100-150 words):
   - Hook reader
   - State main benefit
   - Include primary keyword naturally
   - Clear value proposition
   
   H2: Tại sao doanh nghiệp cần [service]? (200 words)
   - Pain points
   - Statistics/data
   - Market trends
   - Benefits
   
   H2: Tính năng nổi bật của [service] (300 words)
   - 6-8 key features
   - Each feature: icon, title, description (50 words)
   - Include secondary keywords
   
   H2: Quy trình thiết kế 6 bước (250 words)
   1. Tư vấn và phân tích yêu cầu
   2. Nghiên cứu và lập kế hoạch
   3. Thiết kế UI/UX
   4. Phát triển và tích hợp
   5. Testing và tối ưu
   6. Bàn giao và đào tạo
   
   H2: So sánh gói dịch vụ (200 words)
   - Pricing table component
   - Basic vs Professional vs Premium
   - Feature comparison
   - CTA cho từng gói
   
   H2: Case study thành công (150 words)
   - 2-3 brief case studies
   - Results: traffic increase, conversion rate, etc.
   - Client testimonial
   - Link to full case study
   
   H2: Công nghệ sử dụng (100 words)
   - Tech stack
   - Why we choose them
   - Benefits for client
   
   H2: FAQ (200 words)
   - 5-7 common questions
   - Detailed answers
   - Include FAQ schema markup
   
   Final CTA section:
   - Strong call-to-action
   - Contact form
   - Free consultation offer
   ```

2. Content Guidelines:
   - Keyword density: 1-2% cho primary keyword
   - Include secondary keywords naturally
   - Write for humans, optimize for search
   - Short paragraphs (2-4 sentences)
   - Use bullet points
   - Add relevant images every 200-300 words
   - Internal links: 3-5 per page
   - External links: 1-2 authoritative sources
   
3. Keyword Integration:

   Page 1 - Website Bán Hàng:
   Primary: "thiết kế website bán hàng"
   Secondary: website bán hàng online, thiết kế web bán hàng, website thương mại điện tử, ecommerce website
   
   Page 2 - Website Doanh Nghiệp:
   Primary: "thiết kế website doanh nghiệp"
   Secondary: website công ty, thiết kế web doanh nghiệp, website corporate, website giới thiệu công ty
   
   Page 3 - Landing Page:
   Primary: "thiết kế landing page"
   Secondary: landing page chuyển đổi, trang đích marketing, landing page quảng cáo, tối ưu landing page
   
   Page 4 - Website Theo Yêu Cầu:
   Primary: "thiết kế website theo yêu cầu"
   Secondary: website custom, phát triển website riêng, website đặc thù, giải pháp website

4. Tone & Style:
   - Professional nhưng friendly
   - Avoid jargon (hoặc explain nếu dùng)
   - Action-oriented
   - Benefits-focused, not features-focused
   - Use "bạn" để address readers
   - Vietnamese natural language

OUTPUT:
- Full content cho 1 service page (example)
- Content outline template cho 3 pages còn lại
- List of keywords integrated
- Image placement suggestions
- CTA copy variations
```

---

## 🎯 PHASE 3: LOCAL SEO COMPONENTS

### Prompt 8: Create Contact Section với Local SEO

```
Create comprehensive contact section components với local SEO optimization.

REQUIREMENTS:

1. Contact Info Component:
   File: /components/ContactInfo.tsx
   
   Display:
   - Business name: WinterFrost
   - Address: BE3 Vinhomes Grand Park, Quận 9, TP.HCM, Vietnam
   - Phone: 0971450454 (clickable tel: link)
   - Email: quocthong0801@gmail.com (clickable mailto: link)
   - Hours: T2-T7, 9:00-18:00
   - Support: 24/7
   
   Features:
   - Icons cho mỗi contact method
   - Copy to clipboard functionality
   - Click-to-call, click-to-email
   - Social media links (Zalo, Facebook, TikTok)
   
2. Embedded Map Component:
   - Google Maps embed
   - Address: BE3 Vinhomes Grand Park, Quận 9, TP.HCM
   - Coordinates: 10.8471, 106.8358
   - Custom marker với WinterFrost brand
   - "Get Directions" button
   - Responsive design
   
3. Contact Form:
   Fields:
   - Tên (required)
   - Số điện thoại (required, Vietnamese format validation)
   - Email (optional)
   - Loại dịch vụ (dropdown: Website bán hàng, Doanh nghiệp, Landing page, Theo yêu cầu)
   - Ngân sách (optional, dropdown range)
   - Tin nhắn (optional, textarea)
   
   Features:
   - Client-side validation
   - Success/error messages
   - Loading state
   - Anti-spam (honeypot hoặc reCAPTCHA)
   - Submit to API endpoint
   - Email notification
   - Store in database
   
4. Quick Contact Buttons:
   Floating buttons (bottom right):
   - Zalo chat (priority 1)
   - Phone call
   - Email
   - Messenger (optional)
   
   Behavior:
   - Show after scroll 300px
   - Smooth animation
   - Mobile-friendly (larger tap targets)
   - Click tracking
   
5. Business Hours Component:
   - Visual display of hours
   - Highlight current status (Đang mở cửa / Đã đóng cửa)
   - Next opening time if closed
   - Holiday hours (TET, etc.)
   
6. Location-specific CTAs:
   Examples:
   - "Đặt lịch tư vấn tại văn phòng TP.HCM"
   - "Gặp trực tiếp tại Vinhomes Grand Park"
   - "Tư vấn miễn phí cho doanh nghiệp tại TP.HCM"

OUTPUT:
- Complete TypeScript components
- API endpoint cho form submission
- Styling (Tailwind classes)
- Mobile-responsive design
- Accessibility features
- Integration examples
```

---

### Prompt 9: Create Local Landing Page

```
Create optimized local landing page: /thiet-ke-website-tphcm

PURPOSE:
Target local search queries: "thiết kế website tphcm", "thiết kế website tại hcm", "công ty thiết kế web hcm"

REQUIREMENTS:

1. Page Structure:

   H1: "Thiết Kế Website Chuyên Nghiệp Tại TP.HCM - WinterFrost"
   
   Hero Section:
   - Eye-catching headline với location
   - Subheading: benefits
   - CTA: "Tư vấn miễn phí tại TP.HCM"
   - Hero image: team hoặc office in HCM
   
   H2: "Tại sao chọn WinterFrost tại TP.HCM?"
   - Local advantages:
     * Văn phòng tại Quận 9, dễ tiếp cận
     * Hiểu thị trường và khách hàng TP.HCM
     * Hỗ trợ trực tiếp, không qua trung gian
     * 69+ doanh nghiệp TP.HCM tin tưởng
   - Stats with icons
   
   H2: "Dịch vụ thiết kế website tại TP.HCM"
   - 4 service cards (summary)
   - Link to full service pages
   - Local pricing context
   
   H2: "Dự án thành công tại TP.HCM"
   - Case studies from HCM clients
   - Before/after results
   - Client testimonials (with location)
   - Industry diversity
   
   H2: "Quy trình làm việc tại TP.HCM"
   - 6 steps với local context
   - In-person meetings option
   - Local support emphasis
   
   H2: "So sánh dịch vụ tại TP.HCM"
   - Comparison table
   - Why local is better
   - Response time benefits
   
   H2: "Khu vực phục vụ tại TP.HCM"
   - Map với coverage area
   - List of districts: Quận 1, 2, 3, 7, 9, Thủ Đức, Bình Thạnh, etc.
   - "Phục vụ toàn bộ TP.HCM và các tỉnh lân cận"
   
   H2: "Liên hệ văn phòng TP.HCM"
   - Full contact section
   - Map
   - Directions từ các điểm nổi bật
   - Parking info
   
   H2: "Câu hỏi thường gặp"
   - Local-specific FAQs
   - Pricing for HCM market
   - Meeting arrangements
   - Support availability

2. Content Optimization:
   - Primary keyword: "thiết kế website tphcm"
   - Secondary: thiết kế web hcm, công ty thiết kế website hcm, dịch vụ thiết kế web tphcm
   - Mention location 10-15 times naturally
   - Include district names
   - Local landmarks references
   
3. Schema Markup:
   - LocalBusiness schema (same as homepage)
   - Service schema với areaServed: TP.HCM
   - Breadcrumb schema
   - FAQ schema
   
4. Images:
   - Office photos
   - Team in HCM
   - HCM landmarks (for authenticity)
   - Client locations on map
   - All with location in alt text
   
5. CTAs:
   - "Đặt lịch tư vấn tại TP.HCM"
   - "Gọi ngay: 0971450454"
   - "Ghé thăm văn phòng tại Vinhomes Grand Park"

OUTPUT:
- Complete page component code
- Content (Vietnamese, 1500+ words)
- Schema markup included
- Image suggestions list
- Internal linking structure
```

---

## 🎯 PHASE 4: BLOG SYSTEM & CONTENT

### Prompt 10: Create Blog Infrastructure

```
Setup complete blog system với SEO optimization.

REQUIREMENTS:

1. Blog Data Structure:

   Create type definitions:
   ```typescript
   interface BlogPost {
     slug: string;
     title: string;
     description: string;
     content: string; // Markdown hoặc MDX
     author: {
       name: string;
       avatar: string;
       bio: string;
     };
     category: string;
     tags: string[];
     featuredImage: string;
     publishedAt: Date;
     updatedAt: Date;
     readingTime: number; // minutes
     seo: {
       title: string;
       description: string;
       keywords: string[];
       ogImage: string;
     };
     relatedPosts: string[]; // slugs
   }
   ```

2. Blog Architecture:

   Routes:
   - /kien-thuc (blog home/listing)
   - /kien-thuc/[category] (category pages)
   - /kien-thuc/[slug] (individual posts)
   - /kien-thuc/tag/[tag] (tag pages)
   
   Components needed:
   - BlogCard (for listings)
   - BlogPost (full post view)
   - BlogSidebar (categories, tags, popular posts)
   - RelatedPosts
   - TableOfContents (auto-generated từ headings)
   - ShareButtons (Facebook, LinkedIn, Zalo, Copy link)
   - ReadingProgress bar
   - AuthorCard

3. Blog Listing Page (/kien-thuc):
   
   Features:
   - Hero section với latest/featured post
   - Grid of recent posts (9-12 per page)
   - Category filter
   - Tag cloud
   - Search functionality
   - Pagination
   - Load more button (optional)
   - Sidebar with:
     * Categories list
     * Popular posts (top 5)
     * Tag cloud
     * Newsletter signup
   
   SEO:
   - Title: "Kiến Thức Thiết Kế Website & SEO | Blog WinterFrost"
   - Meta description
   - Blog schema markup
   
4. Individual Blog Post (/kien-thuc/[slug]):
   
   Layout:
   - Breadcrumbs
   - Hero image
   - Title (H1)
   - Author info + date + reading time
   - Table of contents (floating, sticky)
   - Post content (formatted)
   - Code syntax highlighting (if needed)
   - Share buttons (top and bottom)
   - Related posts (bottom)
   - Comment section (optional)
   - CTA section
   
   SEO:
   - Dynamic meta tags từ post data
   - Article schema markup
   - Breadcrumb schema
   - Author schema
   - Open Graph tags
   - Twitter cards
   
5. Category Pages:
   - Dynamic từ blog posts
   - SEO-optimized title/description
   - Filtered post listing
   - Category description (intro text)
   
6. Tag Pages:
   - Similar to category pages
   - Tag-based filtering
   - Related tags section

7. Content Handling:
   Option A: MDX files trong /content/blog/
   Option B: CMS (Contentful, Sanity, etc.)
   Option C: Headless CMS API
   
   Implement cho Option A (MDX):
   - MDX processing với next-mdx-remote
   - Frontmatter parsing
   - Reading time calculation
   - Related posts logic (by tags/category)
   
8. Search Functionality:
   - Simple search trong title/description/tags
   - Fuzzy search (optional)
   - Search suggestions
   - Recent searches

OUTPUT:
- Complete blog system architecture
- Type definitions
- All necessary components với TypeScript
- Example blog post trong MDX format
- SEO implementation for blog pages
- Styling với Tailwind
- Reading time calculation logic
- Related posts algorithm
```

---

### Prompt 11: Create First Pillar Article

```
Create comprehensive pillar article: "Hướng Dẫn Thiết Kế Website Từ A-Z [2025]"

CONTEXT:
- Target keyword: "thiết kế website"
- Word count: 3500-4000 words
- Purpose: Attract top-of-funnel traffic, establish authority
- Format: MDX file

REQUIREMENTS:

1. Article Structure:

   Frontmatter:
   ```yaml
   title: "Hướng Dẫn Thiết Kế Website Từ A-Z [2025]: Đầy Đủ, Chi Tiết, Dễ Hiểu"
   description: "Hướng dẫn toàn diện về thiết kế website cho người mới bắt đầu. Từ lựa chọn domain, hosting đến thiết kế, SEO và bảo trì. Cập nhật 2025."
   category: "Hướng dẫn"
   tags: ["thiết kế website", "hướng dẫn", "website cơ bản", "seo"]
   publishedAt: "2025-01-15"
   author: "WinterFrost Team"
   readingTime: 15
   featuredImage: "/blog/website-guide-2025.jpg"
   ```
   
   Content outline:
   
   ## Giới thiệu (200 words)
   - Website là gì?
   - Tại sao doanh nghiệp cần website?
   - Statistics về importance of website
   - Scope của bài viết
   
   ## Phần 1: Lên Kế Hoạch (400 words)
   
   ### 1.1. Xác định mục tiêu website
   - Bán hàng online
   - Giới thiệu doanh nghiệp
   - Landing page
   - Blog/Content hub
   
   ### 1.2. Nghiên cứu đối thủ
   - Cách analyze competitor websites
   - Tools để research
   - Học hỏi điều gì?
   
   ### 1.3. Xác định đối tượng khách hàng
   - Tạo buyer persona
   - Understand customer journey
   - Pain points và needs
   
   ## Phần 2: Chọn Domain và Hosting (400 words)
   
   ### 2.1. Domain name
   - Cách chọn domain tốt
   - .com vs .vn
   - Brandable domains
   - Where to buy
   
   ### 2.2. Web hosting
   - Types: Shared, VPS, Dedicated, Cloud
   - Specs cần thiết
   - Recommended providers for Vietnam
   - Pricing comparison
   
   ### 2.3. SSL Certificate
   - Why SSL important
   - Free vs Paid SSL
   - Installation process
   
   ## Phần 3: Chọn Nền Tảng Website (500 words)
   
   ### 3.1. WordPress
   - Pros and cons
   - Best for: Blogs, small business, ecommerce
   - Cost breakdown
   
   ### 3.2. Custom Development (Next.js, React)
   - When to choose custom
   - Pros and cons
   - Cost considerations
   
   ### 3.3. Website Builders (Wix, Squarespace)
   - Quick comparison
   - Limitations
   - When they're suitable
   
   ### 3.4. Comparison table
   - Feature comparison
   - Price comparison
   - Decision flowchart
   
   ## Phần 4: Thiết Kế Website (600 words)
   
   ### 4.1. UX/UI Principles
   - User experience basics
   - Visual hierarchy
   - Color psychology
   - Typography
   
   ### 4.2. Essential Pages
   - Homepage
   - About
   - Services/Products
   - Contact
   - Blog (optional)
   
   ### 4.3. Mobile-First Design
   - Why mobile-first
   - Responsive design principles
   - Testing on devices
   
   ### 4.4. Page Speed
   - Importance of speed
   - Optimization techniques
   - Tools to test
   
   ### 4.5. Conversion Optimization
   - Clear CTAs
   - Form optimization
   - Trust signals
   - A/B testing basics
   
   ## Phần 5: Tối Ưu SEO (500 words)
   
   ### 5.1. Technical SEO
   - Site structure
   - Sitemap và robots.txt
   - Schema markup
   - Page speed
   
   ### 5.2. On-Page SEO
   - Keyword research basics
   - Title tags và meta descriptions
   - Header tags (H1-H6)
   - Image optimization
   - Internal linking
   
   ### 5.3. Content SEO
   - Content strategy
   - Keyword integration
   - Content length
   - Freshness
   
   ### 5.4. Local SEO (for local businesses)
   - Google My Business
   - NAP consistency
   - Local citations
   - Reviews
   
   ## Phần 6: Tích Hợp Công Cụ (400 words)
   
   ### 6.1. Analytics
   - Google Analytics 4
   - What to track
   - Setting goals
   
   ### 6.2. Search Console
   - Setup and verification
   - Key reports
   - Submitting sitemap
   
   ### 6.3. Other Essential Tools
   - Email marketing
   - Live chat
   - CRM integration
   - Payment gateways (for ecommerce)
   
   ## Phần 7: Launch và Marketing (400 words)
   
   ### 7.1. Pre-Launch Checklist
   - Testing checklist (20 items)
   - Browser compatibility
   - Mobile testing
   - Performance testing
   
   ### 7.2. Launch Process
   - DNS setup
   - Redirects (if redesign)
   - Announcement strategy
   
   ### 7.3. Post-Launch Marketing
   - SEO monitoring
   - Content marketing
   - Social media promotion
   - Paid advertising
   
   ## Phần 8: Bảo Trì và Cập Nhật (300 words)
   
   ### 8.1. Regular Maintenance
   - Security updates
   - Backup schedule
   - Performance monitoring
   - Content updates
   
   ### 8.2. Ongoing Optimization
   - Analytics review
   - A/B testing
   - Content refresh
   - Feature additions
   
   ## Kết Luận (200 words)
   - Summary of key points
   - Next steps
   - Offer help from WinterFrost
   
   ## FAQ (300 words)
   - Chi phí thiết kế website?
   - Thời gian hoàn thành?
   - Tự làm hay thuê agency?
   - Bảo trì có cần không?
   - WordPress hay Custom?

2. Content Requirements:
   - Conversational but professional tone
   - Vietnamese natural language
   - Actionable advice
   - Real examples và case studies
   - Screenshots/diagrams where helpful
   - Internal links to service pages (3-5)
   - External links to authoritative sources (2-3)
   - Call-to-action sections (2-3 trong bài)
   
3. SEO Optimization:
   - Primary keyword "thiết kế website" - density 1-2%
   - Secondary keywords naturally integrated
   - Title tag optimization
   - Meta description compelling
   - Image alt tags
   - Schema markup (Article schema)
   - Table of contents với anchor links
   
4. Visual Elements:
   - Featured image
   - Section header images (5-6)
   - Infographics (2-3)
   - Comparison tables
   - Flowchart/decision tree
   - Screenshots where relevant

OUTPUT:
- Complete MDX file với frontmatter
- Full article content (3500-4000 words)
- Suggestions for images/infographics needed
- Internal linking recommendations
- CTA placements
```

---

## 🎯 PHASE 5: TECHNICAL IMPLEMENTATIONS

### Prompt 12: Implement Analytics & Tracking

```
Setup comprehensive analytics và conversion tracking.

REQUIREMENTS:

1. Google Analytics 4:
   
   File: /lib/analytics.ts
   
   Setup:
   - GA4 measurement ID: [PROVIDE YOUR ID]
   - Page view tracking (automatic)
   - Event tracking setup
   - User properties
   - Enhanced ecommerce (if applicable)
   
   Custom Events to track:
   - Contact form submission
   - Phone number click
   - Email click
   - Zalo chat open
   - Service page view
   - Project case study view
   - Download lead magnet
   - Video play
   - CTA button clicks
   - Newsletter signup
   - Scroll depth (25%, 50%, 75%, 100%)
   - Time on page milestones
   
   Implementation:
   - Server-side tracking (Next.js middleware)
   - Client-side events
   - TypeScript functions for each event type
   - Environment variable for GA ID
   - Development mode detection (no tracking in dev)

2. Google Tag Manager (Optional but Recommended):
   - Container setup
   - Tag configuration
   - Trigger setup
   - Variable definitions
   - GTM component for Next.js
   
3. Meta Pixel (Facebook Pixel):
   - Pixel ID: [PROVIDE IF NEEDED]
   - Standard events:
     * PageView
     * ViewContent
     * Contact
     * Lead
   - Custom events:
     * Service inquiry
     * Quote request
     
4. Conversion Tracking Setup:
   
   Goals in GA4:
   - Contact form submission (primary)
   - Phone call click
   - Email inquiry
   - Service page engagement
   - Quote request
   
   Funnels:
   - Homepage → Service page → Contact
   - Blog post → Service page → Contact
   - Landing page → Form submission
   
5. Call Tracking:
   - Dynamic number insertion (optional)
   - Click-to-call tracking
   - Track which page/source generated call
   
6. Heatmap Tool (Optional):
   - Hotjar or Microsoft Clarity
   - Record sessions
   - Heatmaps for key pages
   - Survey widgets
   
7. Error Tracking:
   - Sentry setup (optional)
   - Error boundaries
   - API error tracking
   - User feedback on errors
   
8. Performance Monitoring:
   - Web Vitals reporting to analytics
   - Custom metrics
   - Performance budget alerts

9. Privacy & Compliance:
   - Cookie consent banner
   - Privacy policy link
   - Opt-out mechanism
   - GDPR compliance (if EU traffic)

OUTPUT:
- Complete analytics.ts file
- GTM implementation (if applicable)
- Event tracking functions
- Privacy consent component
- Testing guide
- Dashboard setup instructions
```

---

### Prompt 13: Create Lead Generation System

```
Implement comprehensive lead generation và capture system.

REQUIREMENTS:

1. Contact Form API:
   
   Endpoint: /api/contact
   
   Features:
   - Form validation
   - Rate limiting
   - Spam protection (honeypot + reCAPTCHA optional)
   - Email notification (to business)
   - Auto-responder (to customer)
   - Save to database
   - CRM integration (optional)
   - Analytics event trigger
   
   Email template:
   - Professional design
   - Include all form data
   - Urgent flag for immediate attention
   - Response time commitment
   
   Auto-responder template:
   - Thank you message
   - What to expect next
   - Estimated response time
   - Alternative contact methods
   - Useful resources links

2. Lead Magnet System:
   
   Types of lead magnets:
   - "Website Design Checklist" (PDF)
   - "SEO Audit Template" (Google Sheet template)
   - "Website Cost Calculator" (Interactive tool)
   - "Case Study Collection" (PDF)
   
   Implementation:
   - Email gate (required for download)
   - Landing page for each lead magnet
   - Thank you page with download link
   - Follow-up email sequence
   - Track downloads in analytics
   
3. Interactive Cost Calculator:
   
   Page: /bao-gia-website
   
   Features:
   - Step-by-step form:
     * Loại website? (Bán hàng, Doanh nghiệp, Landing Page, Custom)
     * Số lượng trang? (slider: 5-50+)
     * Tính năng đặc biệt? (checkboxes: Blog, Multilingual, Ecommerce, Custom features)
     * Design complexity? (Basic, Professional, Premium)
     * Content creation? (You provide, We create, Mixed)
     * Timeline? (Urgent, Normal, Flexible)
   
   - Real-time price estimation
   - Price range display
   - Detailed breakdown
   - Save & email quote
   - Request consultation CTA
   
   - Lead capture:
     * Email required to see detailed quote
     * Phone optional for priority
     * Company name
     * Send quote to email
     * Save lead in database

4. Exit Intent Popup:
   - Triggers when user about to leave
   - Offer: "Đợi! Nhận tư vấn miễn phí trước khi rời đi"
   - Quick form: Name + Phone
   - Promise: "Gọi lại trong 2 giờ"
   - Easy close button
   - Cookie to not show again (24h)
   - A/B test different offers

5. Newsletter Signup:
   - Multiple placement:
     * Footer
     * Sidebar
     * After blog post
     * Popup (after 30s or 50% scroll)
   
   - Benefits listed:
     * "Nhận tips thiết kế website mỗi tuần"
     * "Case studies độc quyền"
     * "Ưu đãi dành riêng cho subscriber"
   
   - Email service integration:
     * Mailchimp, ConvertKit, or similar
     * Double opt-in
     * Welcome email series
     * Segmentation by interest

6. Chat Widget Integration:
   Options:
   - Zalo Official Account widget
   - Facebook Messenger
   - Tawk.to (free live chat)
   - Crisp (premium)
   
   Features:
   - Greeting message
   - Offline message capture
   - Business hours display
   - Mobile-friendly
   - Quick response templates

7. Lead Scoring System:
   
   Score leads based on:
   - Form source (contact vs newsletter)
   - Budget indication (from calculator)
   - Timeline urgency
   - Company size (if captured)
   - Engagement (pages visited, time on site)
   - Repeated visits
   
   Priority tiers:
   - Hot (score 80+): Call within 2 hours
   - Warm (score 50-79): Call within 24 hours
   - Cold (score <50): Email nurture sequence
   
8. Lead Management Dashboard:
   
   Simple admin panel:
   - View all leads
   - Filter by date, source, score
   - Mark as contacted/converted
   - Add notes
   - Export to CSV
   - Analytics summary

OUTPUT:
- Complete API endpoints
- Form components (all types)
- Email templates (HTML)
- Calculator component với logic
- Chat widget implementation
- Lead scoring algorithm
- Admin dashboard (basic)
- Integration examples
- Testing procedures
```

---

### Prompt 14: PWA & Offline Features

```
Convert website to Progressive Web App với offline capabilities.

REQUIREMENTS:

1. Manifest File:
   
   File: /public/manifest.json
   
   Configuration:
   - name: "WinterFrost - Thiết Kế Website"
   - short_name: "WinterFrost"
   - description: "Thiết kế website chuẩn SEO, tối ưu chuyển đổi"
   - start_url: "/"
   - display: "standalone"
   - theme_color: [YOUR BRAND COLOR]
   - background_color: "#ffffff"
   - icons: [192x192, 512x512] in PNG and WebP
   - categories: ["business", "productivity"]
   - orientation: "portrait"
   
2. Service Worker:
   
   Strategy: Network First với Cache Fallback
   
   Features:
   - Cache static assets (images, CSS, JS)
   - Cache key pages (homepage, services)
   - Offline page fallback
   - Background sync for form submissions
   - Push notifications (optional)
   
   Implementation:
   - Use Workbox with Next.js
   - Configure caching strategies
   - Handle updates gracefully
   - Clear old caches
   
3. Offline Page:
   
   Design:
   - Branded offline message
   - "Bạn đang offline" heading
   - Cached pages list (if available)
   - Retry connection button
   - Contact info (phone, email)
   - Fun illustration
   
4. Install Prompt:
   
   Component:
   - Detect if app installable
   - Show custom install prompt
   - "Cài đặt ứng dụng" button
   - Explain benefits:
     * Truy cập nhanh hơn
     * Hoạt động offline
     * Như ứng dụng native
   - Dismiss và remember choice
   
5. App-like Features:
   - Splash screen
   - App icon on home screen
   - No browser UI in standalone mode
   - Smooth transitions
   - Touch-friendly navigation
   
6. Performance Budget:
   - Initial load: < 3s on 3G
   - Subsequent loads: < 1s
   - App shell loads instantly
   
7. Testing:
   - Lighthouse PWA audit (score 90+)
   - Test on actual devices
   - Test offline functionality
   - Test install flow
   - Test on different networks

OUTPUT:
- manifest.json file
- Service worker implementation
- Offline page component
- Install prompt component
- Testing checklist
- Deployment notes
```

---

## 🎯 PHASE 6: FINAL OPTIMIZATIONS

### Prompt 15: Security Hardening

```
Implement comprehensive security measures cho website.

REQUIREMENTS:

1. Content Security Policy:
   
   File: next.config.js
   
   Headers configuration:
   - CSP directives
   - Allowed sources for scripts, styles, images
   - XSS protection
   - Clickjacking protection
   - MIME type sniffing prevention
   
   Example CSP:
   ```
   Content-Security-Policy:
     default-src 'self';
     script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com;
     style-src 'self' 'unsafe-inline';
     img-src 'self' data: https:;
     font-src 'self' data:;
     connect-src 'self' https://www.google-analytics.com;
     frame-src 'self' https://www.google.com;
   ```

2. Security Headers:
   
   Implement all security headers:
   - Strict-Transport-Security (HSTS)
   - X-Content-Type-Options
   - X-Frame-Options
   - X-XSS-Protection
   - Referrer-Policy
   - Permissions-Policy
   
3. Form Security:
   
   Contact form protection:
   - CSRF tokens
   - Rate limiting (5 submissions per hour per IP)
   - Honeypot field
   - reCAPTCHA v3 (invisible)
   - Input sanitization
   - SQL injection prevention
   - Email validation
   - Phone number format validation
   
4. API Security:
   
   API endpoints:
   - API key authentication (if needed)
   - Rate limiting
   - Input validation
   - Error handling (don't expose internals)
   - Logging without sensitive data
   - CORS configuration
   
5. Database Security:
   
   If using database:
   - Parameterized queries
   - Input sanitization
   - Limited user permissions
   - Encrypted connections
   - Regular backups
   - No sensitive data in logs
   
6. File Upload Security (if applicable):
   - File type validation
   - File size limits
   - Virus scanning
   - Secure storage
   - No script execution from uploads
   
7. SSL/TLS Configuration:
   - Force HTTPS redirect
   - HSTS preload
   - TLS 1.2+ only
   - Strong cipher suites
   - Certificate monitoring
   
8. Dependency Security:
   - npm audit regular checks
   - Update dependencies monthly
   - Snyk or similar scanning
   - Dependabot alerts
   
9. Monitoring & Logging:
   - Failed login attempts (if auth)
   - Suspicious form submissions
   - 404 errors (potential scanning)
   - API abuse
   - Alert on anomalies
   
10. Privacy:
    - GDPR compliance (if needed)
    - Privacy policy page
    - Cookie consent
    - Data retention policy
    - Right to deletion

OUTPUT:
- Security headers configuration
- Form validation schemas
- Rate limiting middleware
- CSP configuration
- Security testing checklist
- Monitoring setup guide
- Privacy policy template
```

---

### Prompt 16: Final Performance Audit & Optimization

```
Conduct final performance audit và implement remaining optimizations.

REQUIREMENTS:

1. Run Performance Audits:
   
   Tools to use:
   - Google PageSpeed Insights
   - Lighthouse (Chrome DevTools)
   - WebPageTest
   - GTmetrix
   
   Pages to audit:
   - Homepage
   - 2 service pages
   - 1 blog post
   - Contact page
   - Projects page
   
   Target scores:
   - Performance: 90+ (mobile), 95+ (desktop)
   - Accessibility: 95+
   - Best Practices: 95+
   - SEO: 100
   - PWA: 90+ (if applicable)

2. Image Optimization Final Pass:
   
   Check every image:
   - Format (WebP với fallback)
   - Size (appropriate dimensions)
   - Compression (80-85% quality)
   - Lazy loading enabled
   - Alt text present
   - Width/height attributes
   - Responsive srcset
   
   Tools:
   - ImageOptim or similar
   - Next.js Image component
   - Automatic optimization in build

3. Font Optimization:
   
   - Use next/font for optimal loading
   - Preload critical fonts
   - Font subsetting (Vietnamese chars)
   - Font-display: swap
   - Remove unused font weights
   - WOFF2 format

4. JavaScript Optimization:
   
   - Code splitting review
   - Remove unused code
   - Defer non-critical scripts
   - Minimize third-party scripts
   - Lazy load heavy components
   - Bundle analysis:
     ```bash
     npm run build
     npx @next/bundle-analyzer
     ```
   
5. CSS Optimization:
   
   - Critical CSS inline
   - Remove unused Tailwind classes
   - PurgeCSS configuration
   - Minification
   - Combine where possible

6. Resource Hints:
   
   Add appropriate hints:
   - dns-prefetch for external domains
   - preconnect for critical origins
   - prefetch for likely next pages
   - preload for critical resources
   
   Example:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="dns-prefetch" href="https://www.google-analytics.com">
   <link rel="prefetch" href="/dich-vu/thiet-ke-website-ban-hang">
   ```

7. Caching Strategy:
   
   Configure caching headers:
   - Static assets: 1 year
   - HTML pages: 1 hour
   - API responses: appropriate TTL
   - CDN caching rules
   
   Implementation:
   - next.config.js headers
   - Vercel/hosting platform config
   - Service worker caching

8. Database Query Optimization:
   
   If using database:
   - Index commonly queried fields
   - Optimize N+1 queries
   - Use pagination
   - Cache query results
   - Connection pooling

9. API Response Optimization:
   
   - Response compression (gzip/brotli)
   - Minimize payload size
   - Use HTTP/2 server push
   - Implement ETag caching
   - Rate limiting

10. Core Web Vitals Deep Dive:
    
    LCP Optimization:
    - Identify LCP element
    - Optimize its loading
    - Preload if necessary
    - Reduce server response time
    
    FID Optimization:
    - Minimize JavaScript execution
    - Break up long tasks
    - Use web workers for heavy computation
    - Defer non-essential JS
    
    CLS Optimization:
    - Set dimensions for images/videos
    - Reserve space for ads
    - Avoid inserting content above existing
    - Use transform animations only

11. Mobile Optimization:
    
    - Touch target sizes (44x44px min)
    - Readable font sizes
    - Appropriate spacing
    - Fast tap response
    - No horizontal scroll
    - Optimize for slow 3G

12. Accessibility Final Check:
    
    - Keyboard navigation
    - Screen reader testing
    - Color contrast (WCAG AA)
    - Focus indicators
    - Alt text for images
    - Proper heading hierarchy
    - ARIA labels where needed
    - Form labels
    - Error messages

13. Browser Compatibility:
    
    Test on:
    - Chrome (latest)
    - Firefox (latest)
    - Safari (latest)
    - Edge (latest)
    - Mobile browsers (iOS Safari, Chrome Mobile)
    - Older browsers (graceful degradation)

14. Final Checklist:
    
    - [ ] All pages load < 3s on 4G
    - [ ] No console errors
    - [ ] No 404 errors
    - [ ] All forms working
    - [ ] All links working
    - [ ] Analytics tracking
    - [ ] Schema markup validated
    - [ ] Sitemap accurate
    - [ ] Robots.txt correct
    - [ ] SSL certificate active
    - [ ] Redirects working
    - [ ] Error pages styled
    - [ ] Favicon present
    - [ ] Social sharing working
    - [ ] Contact info correct
    - [ ] Mobile menu working
    - [ ] Search working (if applicable)
    - [ ] Chat widget working

OUTPUT:
- Performance audit report
- List of optimizations implemented
- Before/after metrics comparison
- Remaining issues (if any)
- Maintenance recommendations
- Monitoring setup for ongoing tracking
```

---

## 🎯 DEPLOYMENT & MONITORING

### Prompt 17: Production Deployment Setup

```
Setup production deployment với monitoring và CI/CD.

REQUIREMENTS:

1. Hosting Platform Setup:
   
   Recommended: Vercel (optimal for Next.js)
   Alternatives: Netlify, AWS Amplify, DigitalOcean
   
   Vercel setup:
   - Connect GitHub repository
   - Configure build settings
   - Environment variables
   - Custom domain
   - SSL certificate (automatic)
   - Edge functions region
   - Analytics enabled

2. Environment Variables:
   
   Production .env:
   ```
   NEXT_PUBLIC_SITE_URL=https://winterfrost.tech
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   CONTACT_EMAIL=quocthong0801@gmail.com
   SMTP_HOST=smtp.gmail.com
   SMTP_USER=your-email
   SMTP_PASS=your-app-password
   DATABASE_URL=your-database-url
   API_KEY=your-api-key
   ```
   
   Security:
   - Never commit .env to git
   - Use platform's secret management
   - Rotate keys periodically
   - Minimum privilege principle

3. Domain Configuration:
   
   DNS records:
   - A record: point to hosting IP
   - CNAME: www to root domain
   - MX records: for email
   - TXT: for domain verification
   - SPF, DKIM: for email authentication
   
   Setup:
   - Primary domain: winterfrost.tech
   - WWW redirect: www.winterfrost.tech → winterfrost.tech
   - SSL: Enable HTTPS
   - HSTS: Enable

4. CI/CD Pipeline:
   
   GitHub Actions workflow:
   ```yaml
   name: Production Deploy
   
   on:
     push:
       branches: [main]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - Checkout code
         - Install dependencies
         - Run tests
         - Run build
         - Deploy to Vercel
         - Run E2E tests
         - Notify team
   ```
   
   Features:
   - Automated testing
   - Build verification
   - Automatic deployment
   - Rollback capability
   - Deployment notifications

5. Monitoring Setup:
   
   Uptime Monitoring:
   - UptimeRobot (free)
   - Ping every 5 minutes
   - Alert via email/SMS
   - Status page (optional)
   
   Application Monitoring:
   - Vercel Analytics
   - Google Analytics
   - Real User Monitoring
   - Error tracking (Sentry)
   
   Performance Monitoring:
   - Lighthouse CI
   - WebPageTest monitoring
   - Core Web Vitals tracking
   - Automated alerts

6. Backup Strategy:
   
   What to backup:
   - Database (if applicable)
   - User uploaded content
   - Configuration files
   - Environment variables
   
   Frequency:
   - Critical data: Daily
   - Code: Git (continuous)
   - Content: Weekly
   
   Storage:
   - Primary: Hosting platform
   - Secondary: Cloud storage (S3, Google Cloud)
   - Tertiary: Local backup

7. Error Logging:
   
   Setup:
   - Error tracking service (Sentry, LogRocket)
   - Capture client-side errors
   - Capture server-side errors
   - Error context (user, browser, page)
   - Alert on critical errors
   
   Error handling:
   - Graceful error pages
   - User-friendly messages
   - Report to logging service
   - Don't expose internals

8. Analytics Monitoring:
   
   Key metrics to track daily:
   - Unique visitors
   - Page views
   - Bounce rate
   - Avg session duration
   - Top pages
   - Traffic sources
   - Conversions (form submissions)
   - Core Web Vitals
   
   Alerts:
   - Traffic drop > 30%
   - Error rate spike
   - Performance degradation
   - Downtime

9. SEO Monitoring:
   
   Tools setup:
   - Google Search Console
   - Bing Webmaster
   - Rank tracking (optional)
   
   Monitor:
   - Indexing status
   - Search queries
   - Click-through rate
   - Position changes
   - Core Web Vitals
   - Mobile usability
   - Security issues

10. Maintenance Plan:
    
    Weekly:
    - Review analytics
    - Check uptime reports
    - Monitor error logs
    - Review form submissions
    
    Monthly:
    - Update dependencies
    - Security patches
    - Content updates
    - Performance review
    - Backup verification
    
    Quarterly:
    - Full SEO audit
    - Competitor analysis
    - Content strategy review
    - A/B test results
    - ROI analysis

OUTPUT:
- Deployment configuration files
- CI/CD workflow file
- Monitoring dashboard setup
- Alert configuration
- Maintenance checklist
- Runbook for common issues
- Team access and permissions
```

---

## 📝 FINAL CHECKLIST & VALIDATION

### Prompt 18: Pre-Launch Validation

```
Conduct comprehensive pre-launch validation của toàn bộ website.

REQUIREMENTS:

Run through this complete checklist và fix any issues found:

## Technical SEO
- [ ] All meta titles optimized và unique
- [ ] All meta descriptions written và compelling
- [ ] Canonical URLs set correctly
- [ ] Robots.txt present và correct
- [ ] Sitemap.xml generated và submitted
- [ ] All pages indexed in Google
- [ ] No duplicate content issues
- [ ] 301 redirects working (if redesign)
- [ ] 404 page custom và helpful
- [ ] Schema markup on all relevant pages
- [ ] Breadcrumbs implemented
- [ ] Open Graph tags present
- [ ] Twitter Cards configured
- [ ] Favicon present (all sizes)
- [ ] Apple touch icon present

## Performance
- [ ] PageSpeed mobile 90+
- [ ] PageSpeed desktop 95+
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] TTFB < 600ms
- [ ] All images optimized
- [ ] Lazy loading implemented
- [ ] Fonts optimized
- [ ] JavaScript minified
- [ ] CSS minified
- [ ] Caching configured
- [ ] CDN setup (if needed)
- [ ] Compression enabled (gzip/brotli)

## Content
- [ ] All service pages complete (1000+ words)
- [ ] Homepage compelling và clear
- [ ] About section informative
- [ ] Contact page complete
- [ ] Projects/portfolio showcased
- [ ] Blog posts published (at least 3)
- [ ] All content proofread
- [ ] No lorem ipsum text
- [ ] Call-to-actions clear
- [ ] Value propositions strong

## Functionality
- [ ] Contact form working
- [ ] Form validation working
- [ ] Form submission confirmation
- [ ] Auto-responder email working
- [ ] Business notification email working
- [ ] Phone links clickable (tel:)
- [ ] Email links clickable (mailto:)
- [ ] All internal links working
- [ ] All external links working (open new tab)
- [ ] Search working (if applicable)
- [ ] Chat widget working
- [ ] Newsletter signup working
- [ ] Lead magnets downloadable
- [ ] Calculator working (if applicable)

## Mobile
- [ ] Fully responsive all pages
- [ ] Touch targets 44x44px+
- [ ] No horizontal scroll
- [ ] Mobile menu working
- [ ] Forms easy to fill on mobile
- [ ] Images load properly
- [ ] Text readable (min 16px)
- [ ] Tap delays removed
- [ ] Tested on iOS Safari
- [ ] Tested on Chrome Android

## SEO Tools
- [ ] Google Analytics working
- [ ] Google Search Console setup
- [ ] Google My Business optimized
- [ ] Google Tag Manager (if used)
- [ ] Conversion tracking setup
- [ ] Event tracking working
- [ ] Call tracking (if applicable)
- [ ] Heatmap tool installed (optional)

## Security
- [ ] SSL certificate active
- [ ] HTTPS forced
- [ ] Security headers configured
- [ ] Forms have CSRF protection
- [ ] Rate limiting on forms/APIs
- [ ] Spam protection active
- [ ] Content Security Policy set
- [ ] No console errors
- [ ] No security warnings

## Accessibility
- [ ] Keyboard navigation working
- [ ] Focus indicators visible
- [ ] Alt text on all images
- [ ] Color contrast WCAG AA
- [ ] Heading hierarchy correct
- [ ] Form labels present
- [ ] Error messages clear
- [ ] ARIA labels where needed
- [ ] Screen reader tested

## Browser Compatibility
- [ ] Chrome (latest) working
- [ ] Firefox (latest) working
- [ ] Safari (latest) working
- [ ] Edge (latest) working
- [ ] iOS Safari working
- [ ] Chrome Mobile working
- [ ] Graceful degradation for old browsers

## Local SEO
- [ ] GMB claimed và optimized
- [ ] NAP consistent across site
- [ ] Local schema markup added
- [ ] Citations built (top 10)
- [ ] Reviews requested
- [ ] Local keywords used
- [ ] Service area defined
- [ ] Map embedded on contact page

## Social Media
- [ ] Facebook page linked
- [ ] LinkedIn page linked
- [ ] TikTok linked
- [ ] Social share buttons working
- [ ] Open Graph preview correct
- [ ] Twitter Card preview correct

## Legal & Compliance
- [ ] Privacy policy page
- [ ] Terms of service page
- [ ] Cookie consent (if needed)
- [ ] Copyright notice
- [ ] Contact information complete
- [ ] Business registration info (if required)

## Final Checks
- [ ] Spelling và grammar checked
- [ ] Brand consistency throughout
- [ ] Loading states for all async operations
- [ ] Error states handled gracefully
- [ ] Empty states designed
- [ ] Print styles (if needed)
- [ ] Favicons all sizes
- [ ] Email templates tested
- [ ] Backup working
- [ ] Monitoring active

OUTPUT:
- Completed checklist với checkmarks
- List of any issues found
- Issues prioritized (Critical, High, Medium, Low)
- Fix recommendations for each issue
- Re-test plan
- Sign-off document
```

---

## 🚀 POST-LAUNCH TASKS

### Prompt 19: Post-Launch Monitoring & Optimization

```
Setup post-launch monitoring và create optimization plan.

REQUIREMENTS:

1. Week 1 After Launch:
   
   Daily Tasks:
   - [ ] Check uptime status
   - [ ] Monitor Analytics (traffic, conversions)
   - [ ] Check error logs
   - [ ] Review form submissions
   - [ ] Respond to leads promptly
   - [ ] Monitor social mentions
   - [ ] Check Google Search Console
   - [ ] Review page speed scores
   
   Issues to watch for:
   - Broken links
   - Form submission errors
   - Performance degradation
   - Security alerts
   - Unusual traffic patterns
   - High bounce rate pages
   - Low conversion rate

2. Week 2-4:
   
   Weekly Tasks:
   - [ ] Analytics review meeting
   - [ ] SEO performance check
   - [ ] User feedback collection
   - [ ] A/B test results
   - [ ] Content performance review
   - [ ] Competitor monitoring
   - [ ] Backlink acquisition check
   - [ ] Technical health check
   
   Metrics to track:
   - Organic traffic trend
   - Keyword rankings
   - Conversion rate
   - Bounce rate by page
   - Avg session duration
   - Pages per session
   - Lead quality
   - Revenue (if ecommerce)

3. Month 1 Report:
   
   Create comprehensive report:
   - Traffic overview (vs goals)
   - Top performing pages
   - Top traffic sources
   - Conversion funnel analysis
   - SEO improvements
   - Technical issues resolved
   - User feedback summary
   - Next month goals
   
   Action items:
   - What's working (do more)
   - What's not working (fix or stop)
   - New opportunities identified
   - Resource needs

4. Ongoing Optimization:
   
   Content:
   - Publish blog posts (1-2/week)
   - Update old content
   - Create new lead magnets
   - Improve low-performing pages
   - Expand successful content
   
   SEO:
   - Build backlinks (5-10/month)
   - Optimize for new keywords
   - Improve low-ranking pages
   - Fix technical issues
   - Monitor competitors
   
   Conversion:
   - A/B test CTAs
   - Optimize forms
   - Improve load times
   - Enhance trust signals
   - Better product descriptions
   
   User Experience:
   - Fix user-reported issues
   - Improve navigation
   - Enhance mobile experience
   - Speed up slow pages
   - Reduce friction points

5. Maintenance Schedule:
   
   Create calendar for:
   - Content publishing (weekly)
   - Newsletter sending (bi-weekly)
   - Social media posts (daily)
   - SEO audits (monthly)
   - Performance reviews (monthly)
   - Security updates (as needed)
   - Dependency updates (monthly)
   - Backup verification (weekly)
   - Competitor analysis (quarterly)
   - Strategy review (quarterly)

6. Documentation:
   
   Create internal docs:
   - How to add blog post
   - How to update content
   - How to check analytics
   - Common troubleshooting
   - Contact for issues
   - Escalation procedures
   - Emergency procedures
   - Backup restoration process

OUTPUT:
- Week 1 monitoring checklist
- Weekly report template
- Monthly report template
- Optimization backlog template
- Maintenance calendar
- Internal documentation
- Team responsibilities doc
```

---

## 💡 BONUS: Advanced Features (Optional)

### Prompt 20: Advanced Features Implementation

```
Implement advanced features để differentiate từ competitors.

PICK FEATURES BASED ON PRIORITY:

1. Live Website Preview Tool:
   - User enters their URL
   - API fetches và displays their site
   - Highlight issues (speed, SEO, mobile)
   - Provide recommendations
   - CTA to fix with WinterFrost

2. Interactive Portfolio Filter:
   - Filter by industry
   - Filter by service type
   - Filter by year
   - Search by keyword
   - Animated transitions
   - Lightbox for images
   - Case study modals

3. Client Testimonial Carousel:
   - Rotating testimonials
   - Video testimonials
   - Star ratings
   - Company logos
   - Industry tags
   - Autoplay với pause on hover
   - Touch-friendly swipe

4. Live Chat with Chatbot:
   - AI chatbot for common questions
   - Handoff to human during business hours
   - Lead capture in conversation
   - Conversation history
   - Multi-language support (VN/EN)
   - Mobile app notifications

5. Project Timeline Visualization:
   - Interactive timeline
   - Show project phases
   - Estimated duration
   - Dependencies
   - Visual progress
   - Client involvement points
   - Download as PDF

6. ROI Calculator:
   - Input current situation
   - Calculate potential gains
   - Show projections
   - Compare scenarios
   - Visual charts
   - Email detailed report
   - Schedule consultation CTA

7. Resource Library:
   - Searchable knowledge base
   - Categorized resources
   - Downloadable templates
   - Video tutorials
   - Webinar recordings
   - Email-gated premium content
   - Usage tracking

8. Customer Portal (Advanced):
   - Login for clients
   - Project progress tracking
   - File sharing
   - Invoicing
   - Support tickets
   - Communication history
   - Approval workflows

9. Multilingual Support:
   - English version
   - Language switcher
   - i18n implementation
   - Translated content
   - Language-specific SEO
   - Hreflang tags
   - Localized pricing

10. Advanced Analytics Dashboard:
    - Custom admin dashboard
    - Real-time metrics
    - Visual reports
    - Conversion funnels
    - User flow diagrams
    - Heatmaps
    - Session recordings

IMPLEMENT BASED ON:
- Business priorities
- Resource availability
- Technical complexity
- Expected ROI
- Time to market

OUTPUT FOR SELECTED FEATURES:
- Feature specification
- Technical architecture
- Implementation code
- UI/UX design suggestions
- Testing plan
- Deployment strategy
```

---

## 📚 DOCUMENTATION & HANDOFF

### Final Prompt: Create Comprehensive Documentation

```
Create complete documentation package cho website.

REQUIREMENTS:

1. Technical Documentation:
   
   Files to create:
   - README.md (project overview)
   - SETUP.md (local development setup)
   - DEPLOYMENT.md (deployment instructions)
   - API.md (API endpoints documentation)
   - TROUBLESHOOTING.md (common issues)
   - CHANGELOG.md (version history)
   
   Content:
   - Tech stack overview
   - Project structure
   - Environment variables
   - Development workflow
   - Build process
   - Testing procedures
   - Deployment process
   - Monitoring setup
   - Backup procedures

2. User Guide:
   
   For content managers:
   - How to add blog post
   - How to edit content
   - How to add project
   - How to manage testimonials
   - Image guidelines
   - SEO basics
   - Publishing checklist

3. Maintenance Guide:
   
   - Weekly tasks checklist
   - Monthly tasks checklist
   - Quarterly tasks checklist
   - Update procedures
   - Backup procedures
   - Security procedures
   - Performance monitoring
   - SEO monitoring

4. Analytics Guide:
   
   - Google Analytics dashboard tour
   - Key metrics explanation
   - How to read reports
   - Custom report setup
   - Goal tracking
   - Conversion funnel analysis
   - Monthly reporting template

5. Marketing Playbook:
   
   - SEO strategy overview
   - Content calendar template
   - Social media guidelines
   - Email marketing flows
   - Lead nurturing sequences
   - Conversion optimization tips
   - Competitive analysis

6. Brand Guidelines:
   
   - Logo usage
   - Color palette
   - Typography
   - Imagery style
   - Tone of voice
   - Writing guidelines
   - Do's and don'ts

7. Emergency Procedures:
   
   - Website down
   - Security breach
   - Data loss
   - Performance issues
   - Contact list
   - Escalation process
   - Vendor contacts

OUTPUT:
- All documentation files
- Screenshots where helpful
- Video walkthrough (optional)
- PDF versions for offline
- Training session agenda
- Handoff checklist
```

---

## ✅ EXECUTION SUMMARY

To implement all these optimizations using Cursor:

1. **Copy the relevant prompts** cho từng phase
2. **Paste vào Cursor's chat** (Cmd+L or Ctrl+L)
3. **Let Cursor implement** the code
4. **Review và test** changes
5. **Move to next prompt**

### Recommended Order:

**Week 1:** Prompts 1-4 (Technical Foundation)
**Week 2:** Prompts 5-7 (On-Page SEO)
**Week 3:** Prompts 8-9 (Local SEO)
**Week 4:** Prompts 10-11 (Blog & Content)
**Week 5:** Prompts 12-14 (Advanced Technical)
**Week 6:** Prompts 15-17 (Security & Deployment)
**Week 7:** Prompt 18-19 (Validation & Monitoring)
**Week 8+:** Prompt 20 (Optional Advanced Features)

### Tips for Using with Cursor:

1. **Be Specific:** Provide actual content when prompted
2. **Iterate:** If output isn't perfect, ask for modifications
3. **Test Frequently:** Test after each major change
4. **Commit Often:** Use git to track changes
5. **Ask Questions:** If unclear, ask Cursor to explain

### Example Usage Pattern:

```
You: [Paste Prompt 1]
Cursor: [Generates code]
You: "Can you also add TypeScript types for this?"
Cursor: [Adds types]
You: "Perfect! Now let's implement this in the layout.tsx file"
Cursor: [Shows implementation]
```

Good luck với implementation! 🚀
