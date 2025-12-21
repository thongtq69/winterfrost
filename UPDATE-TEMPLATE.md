# 📝 QUICK UPDATE TEMPLATE
## For Cursor AI to Use After Each Task

---

## HOW TO USE THIS TEMPLATE

After completing any task, Cursor should copy this template, fill it out, and append to the bottom of SEO-MASTER-TRACKER.md in a "RECENT UPDATES" section.

---

## UPDATE TEMPLATE

```markdown
---

## 🔄 UPDATE #[NUMBER] - [DATE]

### Task Completed
**Prompt:** [Prompt Number and Name]
**Started:** [Date/Time]
**Completed:** [Date/Time]
**Duration:** [Actual time spent]
**Assigned To:** [Name]

### What Was Done
- ✅ [Specific achievement 1]
- ✅ [Specific achievement 2]
- ✅ [Specific achievement 3]

### Files Created
- `[filepath]` - [brief description]
- `[filepath]` - [brief description]

### Files Modified
- `[filepath]` - [what changed]
- `[filepath]` - [what changed]

### Key Decisions Made
1. [Decision 1] - [Reasoning]
2. [Decision 2] - [Reasoning]

### Testing Completed
- ✅ [Test 1] - PASSED
- ✅ [Test 2] - PASSED
- ⚠️ [Test 3] - MINOR ISSUE (noted in tracker)

### Issues Found & Resolved
- 🐛 [Issue] → [Resolution]

### Issues Still Open
- 🔴 [Critical issue] - [Status]
- 🟡 [Minor issue] - [Status]

### Metrics/Results
- [Metric 1]: [Before] → [After]
- [Metric 2]: [Before] → [After]

### Next Recommended Steps
1. [Next task with priority]
2. [Alternative task]

### Notes for Future Work
- [Important note 1]
- [Important note 2]

---
```

---

## EXAMPLE FILLED OUT

```markdown
---

## 🔄 UPDATE #001 - 2025-12-21

### Task Completed
**Prompt:** Prompt 1 - Meta Tags Optimization
**Started:** 2025-12-21 09:00
**Completed:** 2025-12-21 11:30
**Duration:** 2.5 hours (estimated 2-3 hours ✅)
**Assigned To:** Cursor AI

### What Was Done
- ✅ Created metadata configuration system with TypeScript interfaces
- ✅ Implemented meta tags for Homepage, all Service pages, Projects, Contact
- ✅ Added Open Graph tags for social sharing on all pages
- ✅ Added Twitter Card tags for Twitter sharing
- ✅ Created reusable metadata utility functions
- ✅ Set up constants file for site-wide configuration
- ✅ Tested all meta tags in browser inspector

### Files Created
- `/lib/metadata.ts` - Core metadata configuration and generation functions
- `/lib/constants.ts` - Site-wide constants (name, URL, social handles, contact)
- `/types/metadata.ts` - TypeScript interfaces for type safety

### Files Modified
- `/app/layout.tsx` - Added metadata export and Open Graph defaults
- `/app/page.tsx` - Added homepage-specific metadata
- `/app/dich-vu/thiet-ke-website-ban-hang/page.tsx` - Added service page metadata
- `/app/dich-vu/thiet-ke-website-doanh-nghiep/page.tsx` - Added service page metadata
- `/app/dich-vu/thiet-ke-landing-page-chuyen-nghiep/page.tsx` - Added service page metadata
- `/app/dich-vu/thiet-ke-website-theo-yeu-cau/page.tsx` - Added service page metadata
- `/app/du-an/page.tsx` - Added projects page metadata
- `/app/lien-he/page.tsx` - Added contact page metadata

### Key Decisions Made
1. **Used Next.js Metadata API** - Chose Next.js 14's built-in metadata API over manual HTML tags for better SSR support and type safety
2. **Centralized constants** - Created constants.ts to avoid hardcoding site info across multiple files, making future updates easier
3. **Title template** - Used template pattern "%s | WinterFrost" for consistent branding across all pages
4. **Vietnamese optimization** - Kept titles under 60 characters for optimal display in Vietnamese search results
5. **Absolute URLs** - Used absolute URLs for Open Graph images to ensure proper display on social media platforms

### Testing Completed
- ✅ Dev server running - PASSED
- ✅ Homepage meta tags - PASSED (title, description, OG tags present)
- ✅ Service pages meta tags - PASSED (all 4 pages unique)
- ✅ Projects page meta tags - PASSED
- ✅ Contact page meta tags - PASSED
- ✅ Open Graph validator - PASSED (tested with https://www.opengraph.xyz/)
- ✅ Twitter Card validator - PASSED
- ✅ Browser inspector check - PASSED (no console errors)
- ✅ Mobile viewport meta - PASSED

### Issues Found & Resolved
- 🐛 Open Graph images showing 404 → Resolved: Changed to absolute URLs with full domain
- 🐛 Title too long on one service page → Resolved: Shortened from 72 to 58 characters
- 🐛 Missing canonical URL → Resolved: Added to metadata config

### Issues Still Open
- None! All tests passed. ✅

### Metrics/Results
- Meta tags coverage: 0% → 100% ✅
- Pages with unique titles: 0 → 8 ✅
- Pages with meta descriptions: 0 → 8 ✅
- Pages with Open Graph: 0 → 8 ✅
- Pages with Twitter Cards: 0 → 8 ✅

### Next Recommended Steps
1. **IMMEDIATE:** Prompt 2 - Schema Markup Implementation (Priority: CRITICAL)
   - Builds on meta tags just completed
   - Adds structured data for rich results
   - Estimated time: 3-4 hours
   
2. **ALTERNATIVE:** Prompt 3 - Robots.txt & Sitemap (Priority: HIGH)
   - Can be done independently
   - Quicker task (1-2 hours)
   - Good if need a shorter task

### Notes for Future Work
- When adding new pages, use `generateMetadata()` function from `/lib/metadata.ts`
- Update `/lib/constants.ts` if business info changes (phone, email, address)
- Consider adding more detailed Open Graph images per service (currently using site default)
- Meta descriptions could be A/B tested in future for better CTR

---
```

---

## QUICK CHECKLIST BEFORE SUBMITTING UPDATE

Before adding update to tracker, verify:

- [ ] All sections filled out (no blank sections)
- [ ] Files list is complete and accurate
- [ ] Test results documented
- [ ] Issues properly categorized (resolved vs open)
- [ ] Next steps are clear and actionable
- [ ] Metrics show actual improvement
- [ ] Duration matches estimate (if not, explain why)
- [ ] Related prompts mentioned if relevant

---

## FREQUENCY OF UPDATES

**Create update after:**
- ✅ Completing any full prompt (required)
- ✅ Completing major milestone within prompt (optional)
- ✅ End of work session (optional but recommended)
- ✅ Discovering critical issue (required)

**Don't create update for:**
- ❌ Minor code tweaks
- ❌ Fixing typos
- ❌ Adjusting formatting
- ❌ Middle of work (wait until milestone)

---

## WHERE TO PUT UPDATES

### Option 1: Append to SEO-MASTER-TRACKER.md

Add new section at bottom:
```markdown
---

## 📋 RECENT UPDATES LOG

### [Most recent update here]

### [Previous update]

### [Older update]
```

### Option 2: Separate Updates File

Create `SEO-UPDATES-LOG.md` and link from tracker:
```markdown
For detailed update history, see: [SEO-UPDATES-LOG.md](./SEO-UPDATES-LOG.md)
```

**Recommendation:** Start with Option 1, move to Option 2 after 10+ updates to keep tracker file manageable.

---

## UPDATE NUMBERING

Use sequential numbering:
- Update #001, #002, #003, etc.
- Reset to #001 each month (optional)
- Or: Use format #YYYYMMDD-NN (e.g., #20251221-01)

---

## TAGGING UPDATES

Add tags for easy searching:

```markdown
**Tags:** #meta-tags #seo #frontend #typescript #completed

**Related Prompts:** #prompt1 #prompt2

**Phase:** Phase 1 - Technical SEO Foundation
```

This allows quick filtering:
- All meta-tag updates
- All Phase 1 updates
- All issues
- All testing results

---

## SHARING UPDATES

When user asks "What's the status?" or "What did you do today?":

1. Summarize from recent updates
2. Show overall progress
3. Highlight blockers
4. Suggest next steps

Example response:
```
📊 Today's Progress Summary

COMPLETED:
✅ Prompt 1 - Meta Tags (2.5 hours)
   - All pages now have unique meta tags
   - Open Graph and Twitter Cards added
   - 100% test pass rate

FILES: 11 files created/modified
TESTS: 8/8 passed ✅
ISSUES: 3 found and resolved, 0 open

NEXT:
→ Prompt 2 - Schema Markup (recommended)
→ Prompt 3 - Sitemap (alternative)

Need any clarification or want to start next task?
```

---

## AUTOMATION TIPS

### For Cursor AI:

After completing task, automatically:
1. Generate update using this template
2. Fill all sections
3. Calculate duration
4. Run tests
5. Format nicely
6. Offer to commit update to tracker
7. Suggest next task

### Example automation:
```
Cursor: "I've completed Prompt 1! Let me generate an update...

[Fills template]
[Calculates metrics]
[Runs tests]

Here's the update I've prepared:
[Shows formatted update]

Shall I:
A) Add this to SEO-MASTER-TRACKER.md
B) Create separate SEO-UPDATES-LOG.md  
C) Let you review/edit first

Also, ready to start Prompt 2 (Schema Markup) when you are!"
```

---

## QUALITY STANDARDS FOR UPDATES

### ✅ GOOD Update:
- Specific and detailed
- Shows actual results/metrics
- Lists all files changed
- Documents decisions made
- Identifies issues and resolutions
- Suggests concrete next steps
- Professional but conversational tone

### ❌ BAD Update:
- Vague ("worked on meta tags")
- No metrics or results
- Missing file information
- No testing documentation
- Doesn't mention issues
- No guidance for next steps
- Too brief or too verbose

---

## VERSION HISTORY

Track major changes to the template:

**v1.0** - 2025-12-21
- Initial template created
- Basic sections defined

**v1.1** - [Future date]
- Added tagging system
- Improved metrics tracking

---

**This template ensures consistent, high-quality progress tracking throughout the SEO implementation project. Use it religiously! 📝✨**
