# 🤖 CURSOR AI - USAGE INSTRUCTIONS
## How Cursor Should Work With This Project

---

## 📖 OVERVIEW

This document explains how Cursor AI should interact with the SEO implementation project for winterfrost.tech.

### File Structure
```
project-root/
├── SEO-MASTER-TRACKER.md       ← Main progress tracking (READ FIRST!)
├── cursor-prompts-complete.md  ← Detailed prompts for each task
├── seo-analysis-winterfrost.md ← SEO strategy reference
├── seo-checklist-30days.md     ← Quick daily checklist
└── schema-templates.md         ← Schema code templates
```

---

## 🔄 WORKFLOW FOR CURSOR

### Step 1: Read Context Before Every Task

**Every time user asks to work on SEO:**

```
1. Open and read: SEO-MASTER-TRACKER.md
2. Find the current task status
3. Check what's already completed
4. Check dependencies (what must be done first)
5. Read the specific prompt from cursor-prompts-complete.md
```

**Example conversation:**

```
User: "Let's work on meta tags"

Cursor: 
[Reads SEO-MASTER-TRACKER.md]
[Finds Prompt 1: Meta Tags Optimization]
[Checks status: NOT STARTED]
[Checks dependencies: None]
[Reads detailed prompt from cursor-prompts-complete.md]

"I see we're starting Prompt 1: Meta Tags Optimization. 
According to the tracker, this task is:
- Status: NOT STARTED
- Priority: CRITICAL
- Estimated time: 2-3 hours
- No dependencies

I'll now:
1. Create /lib/metadata.ts
2. Implement meta tags for all pages
3. Add Open Graph and Twitter Card tags

Let me start by creating the metadata configuration..."
```

---

### Step 2: Update Tracker as You Work

**When starting a task:**

```typescript
// Cursor should mentally note to update:
Status: ⏳ NOT STARTED → ⏳ IN PROGRESS
Started: [Add current date]
```

**After completing each subtask:**

```typescript
// Check off items in the tracker:
- [x] Create /lib/metadata.ts (✅ DONE)
- [x] Implement metadata for Homepage (✅ DONE)
- [ ] Implement metadata for Service Page - Website Bán Hàng (⏳ NEXT)
```

**When completing full task:**

```typescript
// Update final status:
Status: ⏳ IN PROGRESS → ✅ COMPLETED
Completed: [Add current date]
Overall Completion: Update percentage
```

---

### Step 3: Document Everything

**Files Created/Modified:**
```
Always update this section with actual files worked on.

Before:
- [ ] `/lib/metadata.ts` (new)
- [ ] `/app/layout.tsx` (modified)

After:
- [x] `/lib/metadata.ts` (new) ✅
- [x] `/app/layout.tsx` (modified) ✅
```

**Issues/Notes:**
```
Document any problems, decisions, or important notes:

Example:
"Note: Used next/metadata API instead of HTML tags for better SSR support.
Issue: Open Graph images must be absolute URLs, updated implementation.
Decision: Added fallback meta tags for older browsers."
```

---

### Step 4: Reference Related Work

**Always check related prompts:**

```
When working on Prompt 2 (Schema Markup):
[Check Prompt 1 status: ✅ COMPLETED]
"Good! Meta tags are done. Now I can add schemas that complement them."

[Note: Prompt 2 relates to Prompts 1, 3, and future blog prompts]
"I'll ensure schema coordinates with meta tags and prepare for future blog integration."
```

---

## 🎯 SPECIFIC BEHAVIORS

### Behavior 1: Read Before Write

❌ **DON'T DO THIS:**
```
User: "Add meta tags"
Cursor: "Sure! Here's meta tags code..."
[Generates generic code without context]
```

✅ **DO THIS:**
```
User: "Add meta tags"
Cursor: 
[Reads SEO-MASTER-TRACKER.md]
[Finds Prompt 1 details]
[Reads actual requirements from cursor-prompts-complete.md]

"I'll implement meta tags according to Prompt 1. This includes:
- Homepage: 'Thiết Kế Website Chuẩn SEO & Tối Ưu Chuyển Đổi | WinterFrost TP.HCM'
- Service pages with specific titles
- Open Graph and Twitter cards
- All constants in /lib/constants.ts

Let me show you the implementation..."
```

---

### Behavior 2: Update Progress Automatically

❌ **DON'T DO THIS:**
```
[Completes task]
[Doesn't update tracker]
```

✅ **DO THIS:**
```
[Completes task]
"I've completed the meta tags implementation. Let me update the tracker:

SEO-MASTER-TRACKER.md changes:
- Status: NOT STARTED → COMPLETED ✅
- Completed: 2025-12-21
- Files created: ✅ /lib/metadata.ts, ✅ /lib/constants.ts
- All subtasks checked ✅
- Overall progress: 0/20 → 1/20 (5%)
- Phase 1 progress: 0/4 → 1/4 (25%)

Next recommended task: Prompt 2 - Schema Markup Implementation"
```

---

### Behavior 3: Ask for Clarification When Needed

❌ **DON'T DO THIS:**
```
[Encounters ambiguous requirement]
[Makes assumption]
[Implements without confirming]
```

✅ **DO THIS:**
```
"I see we need to implement meta tags. I have a question:

According to the prompt, the homepage title should be:
'Thiết Kế Website Chuẩn SEO & Tối Ưu Chuyển Đổi | WinterFrost TP.HCM'

However, I notice the current site has a different brand voice. 
Should I:
A) Use the exact title from the prompt
B) Adapt it to match current brand voice
C) Create a few variations for you to choose

Also, do you have actual content for the meta descriptions, or should I use the templates provided?"
```

---

### Behavior 4: Test and Verify

❌ **DON'T DO THIS:**
```
[Writes code]
[Marks as complete]
[Doesn't test]
```

✅ **DO THIS:**
```
"I've implemented the meta tags. Before marking as complete, let me verify:

Verification steps completed:
✅ Run dev server
✅ Checked homepage in browser inspector
✅ Verified Open Graph tags present
✅ Tested Twitter Card preview
✅ All pages have unique titles
✅ No console errors

Test results:
- Homepage title: ✅ Correct
- Meta description: ✅ Present (157 chars)
- Open Graph image: ✅ Displays correctly
- Twitter Card: ✅ Validated

Ready to mark Prompt 1 as COMPLETED."
```

---

### Behavior 5: Suggest Next Steps

❌ **DON'T DO THIS:**
```
[Finishes task]
"Done!"
[Waits for next instruction]
```

✅ **DO THIS:**
```
[Finishes task]
"Meta tags implementation is complete! ✅

Based on the SEO-MASTER-TRACKER.md, here are the recommended next steps:

IMMEDIATE NEXT (Same Phase):
→ Prompt 2: Schema Markup Implementation (3-4 hours)
  Priority: CRITICAL
  Depends on: Prompt 1 ✅ (Just completed!)
  This will add structured data that complements our meta tags.

ALTERNATIVE (If you prefer):
→ Prompt 3: Robots.txt & Sitemap (1-2 hours)
  Priority: HIGH
  No dependencies, can be done in parallel

What would you like to tackle next?"
```

---

## 📝 UPDATING THE TRACKER

### Syntax for Updates

**Starting a task:**
```markdown
Status: ⏳ IN PROGRESS
Started: 2025-12-21
```

**Completing a subtask:**
```markdown
- [x] Create /lib/metadata.ts (✅ DONE - 2025-12-21)
```

**Adding a note:**
```markdown
**Issues/Notes:**
- [2025-12-21] Used next/metadata API for better SSR
- [2025-12-21] Added TypeScript interfaces for type safety
```

**Completing full task:**
```markdown
Status: ✅ COMPLETED
Completed: 2025-12-21
Overall Completion: 1/20 prompts (5%)
Phase 1 Progress: 1/4 (25%)
```

**Logging an issue:**
```markdown
### Critical Issues
❌ ISSUE #001 - 2025-12-21
Component: Meta tags
Description: Open Graph images not displaying on Facebook
Status: 🟡 IN PROGRESS
Resolution: Investigating - may need absolute URLs instead of relative
```

---

## 🔍 READING THE PROMPTS

### How to Use cursor-prompts-complete.md

**Structure:**
```
Each prompt contains:
1. Context - Why this task matters
2. Requirements - What needs to be done
3. Specific implementation details
4. Code examples
5. Verification steps
6. Related prompts
```

**Reading Strategy:**

```
1. Find your prompt number (e.g., "Prompt 5: Heading Structure")
2. Read entire prompt before coding
3. Note all requirements
4. Check code examples
5. Understand verification steps
6. Check related prompts for dependencies
7. Only then start implementing
```

**Example:**

```
User: "Work on heading structure"

Cursor internal process:
[Opens cursor-prompts-complete.md]
[Searches for "Prompt 5: Heading Structure"]
[Reads full prompt - ~1000 words]
[Notes requirements: H1 rules, H2-H6 hierarchy, keyword integration]
[Checks related: Prompt 7 (Content) - should do together]
[Checks tracker: Prompt 5 status = NOT STARTED]
[Understands full scope]

Then responds:
"I'll implement heading structure optimization according to Prompt 5.

Key requirements:
- Single H1 per page with primary keyword
- H2-H3 hierarchy with secondary keywords
- No skipping levels
- Specific structure templates for each page type

I notice this relates to Prompt 7 (Content Expansion). Should we tackle them together or separately?"
```

---

## 🎨 CODE STYLE GUIDELINES

### TypeScript Best Practices

```typescript
// ✅ GOOD - From prompts
interface MetadataConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonical: string;
}

// ❌ BAD - Generic, untyped
const config = {
  title: "Some title",
  description: "Some description"
};
```

### Component Structure

```typescript
// ✅ GOOD - Following Next.js patterns
export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Implementation */}
    </form>
  );
}

// ❌ BAD - Old patterns
class ContactForm extends React.Component {
  // Class components for new code
}
```

### File Organization

```
✅ GOOD - Logical grouping
/lib/
  metadata.ts
  analytics.ts
  email.ts
/components/
  /blog/
    BlogCard.tsx
    BlogPost.tsx
  /schema/
    LocalBusinessSchema.tsx
    ServiceSchema.tsx

❌ BAD - Flat structure
/components/
  component1.tsx
  component2.tsx
  component3.tsx
  [50 more files]
```

---

## 🚨 ERROR HANDLING

### When Things Go Wrong

**Scenario 1: Can't find a file**
```
❌ DON'T: "I can't find that file, moving on..."

✅ DO: "I don't see /lib/metadata.ts yet. According to Prompt 1, 
this should be created as part of the meta tags task. 

Should I:
A) Create it now as specified in the prompt
B) Use a different file location
C) Skip this for now

What would you prefer?"
```

**Scenario 2: Requirements conflict**
```
❌ DON'T: [Silently choose one interpretation]

✅ DO: "I notice a potential conflict:
- Prompt 1 says: Use title 'X'
- Current site has: Title 'Y'
- Vietnamese SEO best practice suggests: 'Z'

Which approach should I follow? I recommend [X] because [reason]."
```

**Scenario 3: Technical limitation**
```
❌ DON'T: "That's not possible" [stops]

✅ DO: "The prompt requests feature X, but Next.js 14 doesn't support 
this approach directly. 

Alternative solutions:
A) Use newer API Y (requires upgrade)
B) Use workaround Z (slightly different UX)
C) Wait for Next.js update

I recommend B because [reasons]. Shall I proceed?"
```

---

## 📊 PROGRESS REPORTING

### Daily Summary Format

When user asks "What's our progress?":

```markdown
📊 SEO Implementation Progress - [Date]

OVERALL: 5/20 tasks completed (25%)

PHASE BREAKDOWN:
✅ Phase 1: Technical SEO - 4/4 (100%) DONE!
⏳ Phase 2: On-Page SEO - 1/3 (33%) IN PROGRESS
⏸️ Phase 3: Local SEO - 0/2 (0%) NOT STARTED
⏸️ Phase 4: Blog System - 0/2 (0%) NOT STARTED
⏸️ Phase 5: Technical - 0/3 (0%) NOT STARTED
⏸️ Phase 6: Final Optimization - 0/5 (0%) NOT STARTED

CURRENT SPRINT:
Working on: Prompt 6 - Internal Linking System
Progress: 60% (3/5 subtasks done)
Blockers: None
ETA: End of today

COMPLETED TODAY:
✅ Prompt 5 - Heading Structure (2 hours)
✅ 50% of Prompt 6 - Internal linking components

NEXT UP:
1. Finish Prompt 6 (Internal Linking)
2. Start Prompt 7 (Content Expansion)
3. Complete Phase 2 by end of week

ISSUES:
🐛 1 minor issue logged (non-blocking)
```

---

## 🔄 CONTINUOUS IMPROVEMENT

### Learning from Previous Work

**After completing several tasks:**

```
"I've completed 5 tasks now. I notice some patterns:

WHAT WORKED WELL:
- Reading full prompt before starting
- Creating type definitions first
- Testing incrementally
- Updating tracker immediately

WHAT COULD IMPROVE:
- Some prompts needed clarification earlier
- Could batch related tasks better
- Testing could be more comprehensive

SUGGESTIONS FOR REMAINING WORK:
1. For Prompts 8-9 (Local SEO), do together (related)
2. For Prompts 10-11 (Blog), do together (dependent)
3. Schedule longer blocks for content-heavy prompts

Thoughts?"
```

---

## 💬 COMMUNICATION STYLE

### How Cursor Should Communicate

**✅ GOOD:**
```
Clear, specific, actionable:
"I'll implement meta tags for the homepage. This includes:
1. Title: 'Thiết Kế Website...' (58 chars)
2. Description: 'WinterFrost chuyên...' (155 chars)
3. Open Graph tags
4. Twitter Card tags

Expected completion: 15 minutes
Files affected: app/page.tsx, lib/metadata.ts"
```

**❌ BAD:**
```
Vague, generic:
"I'll add some meta tags to the site."
[No specifics, no estimates, no file mentions]
```

**✅ GOOD:**
```
Proactive problem-solving:
"While implementing Prompt 6, I noticed we could improve 
performance by lazy-loading the related posts component. 
This wasn't in the original prompt, but aligns with 
Prompt 4 (Performance). Should I add this?"
```

**❌ BAD:**
```
Passive waiting:
"I did what you asked. Anything else?"
```

---

## 🎯 QUALITY CHECKLIST

Before marking any task as complete, verify:

### Code Quality
- [ ] TypeScript types defined
- [ ] No `any` types (unless absolutely necessary)
- [ ] Follows Next.js conventions
- [ ] Error handling included
- [ ] Loading states considered
- [ ] Accessibility attributes added
- [ ] Mobile responsive
- [ ] No console.log left in code

### Functionality
- [ ] Feature works as specified
- [ ] No errors in console
- [ ] Tested in dev environment
- [ ] Edge cases considered
- [ ] Forms validate correctly
- [ ] Links work
- [ ] Images load

### SEO
- [ ] Meta tags present
- [ ] Schema markup valid
- [ ] Headings hierarchical
- [ ] Alt text on images
- [ ] Internal links added
- [ ] Keywords used naturally
- [ ] URL structure correct

### Documentation
- [ ] Tracker updated
- [ ] Files documented
- [ ] Issues logged
- [ ] Comments in complex code
- [ ] README updated if needed

### Testing
- [ ] Manual testing done
- [ ] Verified in browser
- [ ] Checked mobile view
- [ ] Tested forms/interactions
- [ ] No broken links
- [ ] Performance acceptable

---

## 🚀 QUICK START GUIDE

### First Time Using This System

**Step 1:** Read this file completely ✅

**Step 2:** Open SEO-MASTER-TRACKER.md

**Step 3:** Find "Prompt 1: Meta Tags Optimization"

**Step 4:** Open cursor-prompts-complete.md

**Step 5:** Find and read full Prompt 1

**Step 6:** Start implementation

**Step 7:** Update tracker as you go

**Step 8:** Mark complete when done

**Step 9:** Move to next prompt

**Step 10:** Repeat!

---

## 📞 WHEN TO ASK FOR HELP

Ask user for input when:

1. **Requirements unclear:** Prompt has ambiguous instructions
2. **Conflicts found:** Different sources say different things  
3. **Decisions needed:** Multiple valid approaches exist
4. **Context missing:** Need API keys, credentials, content
5. **Priorities unclear:** Multiple urgent tasks, which first?
6. **Scope changes:** Discovered work not in original plan
7. **Blockers hit:** Can't proceed without external input
8. **Quality concerns:** Something feels wrong or suboptimal

DON'T ask for help when:
- Prompt has clear instructions → Just follow them
- Solution is in the prompts → Read more carefully
- Standard implementation → Use best practices
- Minor styling details → Use judgment

---

## ✅ SUCCESS CRITERIA

You're doing well when:

✅ Tasks completed match prompt specifications exactly
✅ Tracker is always up-to-date
✅ No tasks marked complete without testing
✅ Issues are logged and resolved
✅ Code is clean and well-typed
✅ User knows status without asking
✅ Suggestions are proactive and helpful
✅ No scope creep (stick to prompts)
✅ Related prompts are coordinated
✅ Overall progress is steady

---

## 🎓 REMEMBER

1. **READ BEFORE WRITE** - Always check tracker and prompts first
2. **UPDATE AS YOU GO** - Don't batch updates, do real-time
3. **TEST EVERYTHING** - No task complete without verification
4. **COMMUNICATE CLEARLY** - User should always know status
5. **FOLLOW THE PLAN** - Prompts are detailed for a reason
6. **ASK WHEN STUCK** - Better to ask than assume wrong
7. **DOCUMENT DECISIONS** - Future you will thank you
8. **MAINTAIN QUALITY** - Speed matters, but quality matters more
9. **STAY ORGANIZED** - Clean code, clear structure
10. **BE PROACTIVE** - Suggest improvements, spot issues early

---

**Happy Coding! 🚀**

*This system is designed to make the SEO implementation smooth and trackable. Follow these guidelines and you'll build an amazing SEO-optimized website for winterfrost.tech!*
