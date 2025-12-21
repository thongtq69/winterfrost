module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/not-found.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/not-found.tsx [app-rsc] (ecmascript)"));
}),
"[project]/components/ui/Card.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-rsc] (ecmascript)");
;
;
const Card = ({ children, className })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])('section-card rounded-2xl bg-white/90 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-soft', className),
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ui/Card.tsx",
        lineNumber: 9,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const __TURBOPACK__default__export__ = Card;
}),
"[project]/src/lib/format.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mailHref",
    ()=>mailHref,
    "telHref",
    ()=>telHref
]);
const telHref = (phone)=>`tel:${phone.replace(/\s+/g, '')}`;
const mailHref = (email)=>`mailto:${email}`;
}),
"[project]/components/common/CTAConsult.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-rsc] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$call$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneCall$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone-call.js [app-rsc] (ecmascript) <export default as PhoneCall>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Card.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Container$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Container.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Button.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/site.config.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/site.config.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
const CTAConsult = ({ anchorId })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-10",
        id: anchorId,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Container$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                className: "flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-brand-600 via-brand-600 to-brand-500 p-6 text-white md:flex-row md:items-center md:justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm uppercase tracking-wide text-white/70",
                                children: "Nhận tư vấn"
                            }, void 0, false, {
                                fileName: "[project]/components/common/CTAConsult.tsx",
                                lineNumber: 18,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-extrabold",
                                children: "Cần hỗ trợ dự án website?"
                            }, void 0, false, {
                                fileName: "[project]/components/common/CTAConsult.tsx",
                                lineNumber: 19,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-white/80",
                                children: "Chat nhanh để trao đổi nhu cầu, chúng tôi phản hồi trong 24h với lộ trình rõ ràng."
                            }, void 0, false, {
                                fileName: "[project]/components/common/CTAConsult.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/common/CTAConsult.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-3 sm:flex-row sm:items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                variant: "secondary",
                                size: "lg",
                                className: "bg-white text-brand-700 hover:-translate-y-0.5",
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/components/common/CTAConsult.tsx",
                                    lineNumber: 25,
                                    columnNumber: 114
                                }, void 0),
                                asChild: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].links.zalo,
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].cta.zaloText
                                }, void 0, false, {
                                    fileName: "[project]/components/common/CTAConsult.tsx",
                                    lineNumber: 26,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/common/CTAConsult.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                variant: "ghost",
                                size: "lg",
                                className: "text-white hover:bg-white/10",
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$call$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneCall$3e$__["PhoneCall"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/components/common/CTAConsult.tsx",
                                    lineNumber: 28,
                                    columnNumber: 92
                                }, void 0),
                                asChild: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["telHref"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].contact.phoneTel),
                                    children: [
                                        "Gọi ",
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].contact.phoneDisplay
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/common/CTAConsult.tsx",
                                    lineNumber: 29,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/common/CTAConsult.tsx",
                                lineNumber: 28,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/common/CTAConsult.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/common/CTAConsult.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/common/CTAConsult.tsx",
            lineNumber: 15,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/common/CTAConsult.tsx",
        lineNumber: 14,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const __TURBOPACK__default__export__ = CTAConsult;
}),
"[project]/components/ui/ImagePlaceholder.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-rsc] (ecmascript) <export default as ImageIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-rsc] (ecmascript)");
;
;
;
const ImagePlaceholder = ({ aspect = 'aspect-[4/3]', label = 'Placeholder', className, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])('relative overflow-hidden rounded-2xl border border-dashed border-gray-200 bg-gray-50', aspect, className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__["ImageIcon"], {}, void 0, false, {
                    fileName: "[project]/components/ui/ImagePlaceholder.tsx",
                    lineNumber: 20,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs font-semibold uppercase tracking-wide",
                    children: label
                }, void 0, false, {
                    fileName: "[project]/components/ui/ImagePlaceholder.tsx",
                    lineNumber: 21,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/ImagePlaceholder.tsx",
            lineNumber: 19,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/ui/ImagePlaceholder.tsx",
        lineNumber: 12,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const __TURBOPACK__default__export__ = ImagePlaceholder;
}),
"[project]/components/ui/Badge.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-rsc] (ecmascript)");
;
;
const Badge = ({ children, className })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700', className),
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ui/Badge.tsx",
        lineNumber: 9,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const __TURBOPACK__default__export__ = Badge;
}),
"[project]/components/ui/SectionHeading.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Badge.tsx [app-rsc] (ecmascript)");
;
;
;
const SectionHeading = ({ eyebrow, title, description, action, align = 'left', className })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])('flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', align === 'center' && 'items-center text-center sm:text-left', className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    eyebrow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        className: "bg-brand-50 text-xs text-brand-700",
                        children: eyebrow
                    }, void 0, false, {
                        fileName: "[project]/components/ui/SectionHeading.tsx",
                        lineNumber: 23,
                        columnNumber: 19
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-extrabold sm:text-3xl",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/ui/SectionHeading.tsx",
                        lineNumber: 24,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "max-w-2xl text-sm text-gray-600 sm:text-base",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/components/ui/SectionHeading.tsx",
                        lineNumber: 25,
                        columnNumber: 23
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/SectionHeading.tsx",
                lineNumber: 22,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shrink-0",
                children: action
            }, void 0, false, {
                fileName: "[project]/components/ui/SectionHeading.tsx",
                lineNumber: 27,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/SectionHeading.tsx",
        lineNumber: 15,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const __TURBOPACK__default__export__ = SectionHeading;
}),
"[project]/data/projects.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getProjectBySlug",
    ()=>getProjectBySlug,
    "projects",
    ()=>projects
]);
const projects = [
    {
        "slug": "du-an-moi-60",
        "title": "Phòng khám đa khoa SCT",
        "description": "Phòng khám đa khoa SCT\n",
        "client": "",
        "year": "2025",
        "categories": [
            "Bán hàng",
            "Y tế"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2025/07/407_1x_shots_so-1.jpeg",
        "externalUrl": "https://sctclinic.com/",
        "detailUrl": ""
    },
    {
        "slug": "wbc",
        "title": "Wbc",
        "description": "Website giới thiệu thương hiệu và dịch vụ, tối ưu chuyển đổi liên hệ.",
        "client": "Client 1",
        "year": "2022",
        "categories": [
            "Bán hàng",
            "Bán hàng"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2025/09/684_1x_shots_so.jpeg",
        "externalUrl": "https://xuanhieuit.com/du-an/wbc/",
        "detailUrl": "https://xuanhieuit.com/du-an/wbc/"
    },
    {
        "slug": "h3-group",
        "title": "H3 Group",
        "description": "H3 Group là đơn vị thiết kế thi công nội thất F&B, nhà ở, Spa & Shop,… hàng đầu tại Hà Nội.",
        "client": "Client 3",
        "year": "2024",
        "categories": [
            "Bán hàng",
            "Doanh nghiệp"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2025/07/353shots_so.jpeg",
        "externalUrl": "https://h3group.com.vn/",
        "detailUrl": "https://xuanhieuit.com/du-an/h3-group/"
    },
    {
        "slug": "catherine-cruise",
        "title": "Catherine Cruise",
        "description": "Du thuyền Catherine là sự giao thoa tinh tế giữa nét đẹp đa văn hóa...",
        "client": "Client 4",
        "year": "2025",
        "categories": [
            "Bán hàng",
            "Du lịch"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2025/07/188shots_so.jpeg",
        "externalUrl": "https://xuanhieuit.com/du-an/catherine-cruise/",
        "detailUrl": "https://xuanhieuit.com/du-an/catherine-cruise/"
    },
    {
        "slug": "meditrain",
        "title": "Meditrain",
        "description": "Nền tảng đào tạo trực tuyến dành cho đội ngũ nhân viên y tế\n",
        "client": "Client 5",
        "year": "2022",
        "categories": [
            "Bán hàng",
            "Dược phẩm & thuốc"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2025/07/276shots_so.jpeg",
        "externalUrl": "https://meditrain.xuanhieuit.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/meditrain/"
    },
    {
        "slug": "pathfinder",
        "title": "Pathfinder",
        "description": "Pathfinder là nơi khởi đầu cho những ước mơ du học vươn xa.\n\n",
        "client": "Client 6",
        "year": "2023",
        "categories": [
            "Bán hàng",
            "Giáo dục"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2025/07/430shots_so.jpeg",
        "externalUrl": "https://pathfinder.edu.vn/",
        "detailUrl": "https://xuanhieuit.com/du-an/pathfinder/"
    },
    {
        "slug": "viamc",
        "title": "VIAMC",
        "description": "Kỳ thi Toán Ứng dụng Quốc tế\n\n",
        "client": "Client 7",
        "year": "2024",
        "categories": [
            "Bán hàng",
            "Hair salon"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2025/07/147shots_so.jpeg",
        "externalUrl": "https://amcvietnam.edufly.edu.vn/",
        "detailUrl": "https://xuanhieuit.com/du-an/viamc/"
    },
    {
        "slug": "vi-vu-quang-binh",
        "title": "Vi Vu Quảng Bình",
        "description": "CÔNG TY TNHH DỊCH VỤ DU LỊCH VI VU\n\n",
        "client": "Client 8",
        "year": "2025",
        "categories": [
            "Bán hàng",
            "Khách sạn"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2025/07/Vivuquangbinh.jpeg",
        "externalUrl": "https://vivuquangbinh.vn/",
        "detailUrl": "https://xuanhieuit.com/du-an/vi-vu-quang-binh/"
    },
    {
        "slug": "fly-future",
        "title": "Fly Future",
        "description": "FLY FUTURE – Master Agency trong lĩnh vực giáo dục quốc tế\n\n",
        "client": "Client 9",
        "year": "2022",
        "categories": [
            "Bán hàng",
            "Landing Page"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2025/07/830_1x_shots_so.jpeg",
        "externalUrl": "https://flyfuture.edu.vn",
        "detailUrl": "https://xuanhieuit.com/du-an/fly-future/"
    },
    {
        "slug": "thanh-toan-viet-tin",
        "title": "Thanh Toán Việt Tín",
        "description": "Landing page chiến dịch với form đăng ký và thông tin nổi bật.",
        "client": "Client 10",
        "year": "2023",
        "categories": [
            "Bán hàng",
            "Nhà hàng"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2025/07/Viet-Tin.jpeg",
        "externalUrl": "https://restaurant.vvt.com.vn/",
        "detailUrl": "https://xuanhieuit.com/du-an/thanh-toan-viet-tin/"
    },
    {
        "slug": "hoang-ngan-jp",
        "title": "Hoàng Ngân JP",
        "description": "Giải pháp website đa trang, chuẩn SEO và tốc độ tải.",
        "client": "Client 11",
        "year": "2024",
        "categories": [
            "Bán hàng",
            "Nội thất"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2025/07/Hoang-Ngan-JP.jpeg",
        "externalUrl": "https://hoangnganrestaurant.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/hoang-ngan-jp/"
    },
    {
        "slug": "royalcare",
        "title": "Royalcare",
        "description": "Trang giới thiệu sản phẩm/dịch vụ cùng thư viện nội dung.",
        "client": "Client 12",
        "year": "2025",
        "categories": [
            "Bán hàng",
            "Phòng khám"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2025/07/royalcare.jpeg",
        "externalUrl": "https://royalcare.net.vn/",
        "detailUrl": "https://xuanhieuit.com/du-an/royalcare/"
    },
    {
        "slug": "romo-cons",
        "title": " Romo Cons",
        "description": "Website giới thiệu thương hiệu và dịch vụ, tối ưu chuyển đổi liên hệ.",
        "client": "Client 13",
        "year": "2022",
        "categories": [
            "Bán hàng",
            "Spa"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2025/07/Romocons.jpeg",
        "externalUrl": "https://romo.vn/",
        "detailUrl": "https://xuanhieuit.com/du-an/romo-cons/"
    },
    {
        "slug": "bao-hung",
        "title": "Bảo Hưng",
        "description": "Landing page chiến dịch với form đăng ký và thông tin nổi bật.",
        "client": "Client 14",
        "year": "2023",
        "categories": [
            "Bán hàng",
            "Tin tức & Blog"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2025/07/Bao-hung.jpeg",
        "externalUrl": "https://baohung.co/",
        "detailUrl": "https://xuanhieuit.com/du-an/bao-hung/"
    },
    {
        "slug": "viet-sky-agency",
        "title": "Việt Sky Agency",
        "description": "Giải pháp website đa trang, chuẩn SEO và tốc độ tải.",
        "client": "Client 15",
        "year": "2024",
        "categories": [
            "Bán hàng",
            "Y tế"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2025/07/Viet-Sky.jpeg",
        "externalUrl": "https://skyvietagency.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/viet-sky-agency/"
    },
    {
        "slug": "hang-gift-store",
        "title": "Hang Gift Store",
        "description": "Trang giới thiệu sản phẩm/dịch vụ cùng thư viện nội dung.",
        "client": "Client 16",
        "year": "2025",
        "categories": [
            "Bán hàng",
            "Bán hàng"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2025/07/Hang-Store.jpeg",
        "externalUrl": "https://hangstore.net/",
        "detailUrl": "https://xuanhieuit.com/du-an/hang-gift-store/"
    },
    {
        "slug": "tra-sua-bong-bieng",
        "title": "Trà sữa Bông Biêng",
        "description": "Website nhận diện thương hiệu trà sữa Bông Biêng\n\n",
        "client": "Client 17",
        "year": "2022",
        "categories": [
            "Bán hàng",
            "Bất động sản"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/11/Bong-bieng.png",
        "externalUrl": "https://bongbieng.xuanhieuit.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/tra-sua-bong-bieng/"
    },
    {
        "slug": "cnbuyapp-ung-dung",
        "title": "CNBUYAPP Ứng dụng",
        "description": "Landing page chiến dịch với form đăng ký và thông tin nổi bật.",
        "client": "Client 18",
        "year": "2023",
        "categories": [
            "Bán hàng",
            "Doanh nghiệp"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/11/CNBUYAPP.png",
        "externalUrl": "https://cnbuyapp.com",
        "detailUrl": "https://xuanhieuit.com/du-an/cnbuyapp-ung-dung/"
    },
    {
        "slug": "kyodai-hai-duong",
        "title": "KYODAI Hải Dương",
        "description": "Đào tạo & Tư vấn XKLĐ - Du học\n\n",
        "client": "Client 19",
        "year": "2024",
        "categories": [
            "Bán hàng",
            "Du lịch"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/11/Frame-45.png",
        "externalUrl": "https://kyodai.xuanhieuit.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/kyodai-hai-duong/"
    },
    {
        "slug": "may-chieu-hoci",
        "title": "Máy chiếu HOCI",
        "description": "Trang giới thiệu sản phẩm/dịch vụ cùng thư viện nội dung.",
        "client": "Client 20",
        "year": "2025",
        "categories": [
            "Bán hàng",
            "Dược phẩm & thuốc"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/10/maychieuhoci.jpeg",
        "externalUrl": "https://maychieuhoci.xuanhieuit.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/may-chieu-hoci/"
    },
    {
        "slug": "eclate",
        "title": "Eclate",
        "description": "Website bán phụ kiện quay chụp\n\n",
        "client": "Client 21",
        "year": "2022",
        "categories": [
            "Bán hàng",
            "Giáo dục"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/09/eclate.jpeg",
        "externalUrl": "https://eclate.vn/",
        "detailUrl": "https://xuanhieuit.com/du-an/eclate/"
    },
    {
        "slug": "diademy-elearning",
        "title": "Diademy – Elearning",
        "description": "Website bán khoá học và Template tài nguyên online.\n\n",
        "client": "Client 22",
        "year": "2023",
        "categories": [
            "Bán hàng",
            "Hair salon"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/09/demy.jpeg",
        "externalUrl": "https://lms01.builtemp.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/diademy-elearning/"
    },
    {
        "slug": "ldp-bds-eaton-park",
        "title": "LDP – BĐS Eaton Park",
        "description": "Xây dựng LDP bất động sản dự án Eaton Park\n\n",
        "client": "Client 23",
        "year": "2024",
        "categories": [
            "Bán hàng",
            "Khách sạn"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/eaton-prk.jpeg",
        "externalUrl": "https://eatonpark.xuanhieuit.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/ldp-bds-eaton-park/"
    },
    {
        "slug": "cong-vien-76",
        "title": "Công Viên 76",
        "description": "Website giới thiệu nhà hàng, Tổ hợp công viên 76",
        "client": "Client 24",
        "year": "2025",
        "categories": [
            "Bán hàng",
            "Landing Page"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/congvien76.jpeg",
        "externalUrl": "https://congvien76.xuanhieuit.com",
        "detailUrl": "https://xuanhieuit.com/du-an/cong-vien-76/"
    },
    {
        "slug": "elearning-website",
        "title": "Elearning Website",
        "description": "Website giới thiệu thương hiệu và dịch vụ, tối ưu chuyển đổi liên hệ.",
        "client": "Client 25",
        "year": "2022",
        "categories": [
            "Bán hàng",
            "Nhà hàng"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/elearning.jpeg",
        "externalUrl": "https://elearning.xuanhieuit.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/elearning-website/"
    },
    {
        "slug": "website-ban-qua-tet",
        "title": "Website Bán Quà Tết",
        "description": "Landing page chiến dịch với form đăng ký và thông tin nổi bật.",
        "client": "Client 26",
        "year": "2023",
        "categories": [
            "Bán hàng",
            "Nội thất"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/qua-tet.jpeg",
        "externalUrl": "https://quatet.xuanhieuit.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/website-ban-qua-tet/"
    },
    {
        "slug": "qspa",
        "title": "Qspa",
        "description": "Landing Page Qspa – Tái cấu trúc vận hành Spa\n\n",
        "client": "Client 27",
        "year": "2024",
        "categories": [
            "Bán hàng",
            "Phòng khám"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/qspa.jpeg",
        "externalUrl": "https://qspa.vn/",
        "detailUrl": "https://xuanhieuit.com/du-an/qspa/"
    },
    {
        "slug": "qbeauty",
        "title": "Qbeauty",
        "description": "Thương hiệu nhượng quyền spa mở tại Việt Nam\n\n",
        "client": "Client 28",
        "year": "2025",
        "categories": [
            "Bán hàng",
            "Spa"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/qbeauty.jpeg",
        "externalUrl": "https://qbeauty.vn/",
        "detailUrl": "https://xuanhieuit.com/du-an/qbeauty/"
    },
    {
        "slug": "tu-an-clinic",
        "title": "Tú An Clinic",
        "description": "Website giới thiệu dịch vụ spa làm đẹp\n\n",
        "client": "Client 29",
        "year": "2022",
        "categories": [
            "Bán hàng",
            "Tin tức & Blog"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/tu-an.jpeg",
        "externalUrl": "https://tuanclinic.xuanhieuit.com",
        "detailUrl": "https://xuanhieuit.com/du-an/tu-an-clinic/"
    },
    {
        "slug": "myosung-trading",
        "title": "Myosung Trading",
        "description": "Phân phối sản phẩm dầu gốc của Huyndai Oil Bank\n\n",
        "client": "Client 30",
        "year": "2023",
        "categories": [
            "Bán hàng",
            "Y tế"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/mtossung.jpeg",
        "externalUrl": "https://myosung.com",
        "detailUrl": "https://xuanhieuit.com/du-an/myosung-trading/"
    },
    {
        "slug": "coinminutes",
        "title": "CoinMinutes",
        "description": "Giải pháp website đa trang, chuẩn SEO và tốc độ tải.",
        "client": "Client 31",
        "year": "2024",
        "categories": [
            "Bán hàng",
            "Bán hàng"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/MIc.jpeg",
        "externalUrl": "https://coinminutes.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/coinminutes/"
    },
    {
        "slug": "ommani-viet-nam",
        "title": "Ommani Việt Nam",
        "description": "Landing Page sản phẩm dinh dưỡng về hạt\n\n",
        "client": "Client 32",
        "year": "2025",
        "categories": [
            "Bán hàng",
            "Bất động sản"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/ommani.jpeg",
        "externalUrl": "https://ommanivietnam.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/ommani-viet-nam/"
    },
    {
        "slug": "truong-anh-holtel",
        "title": "TA Hotel & Apartment",
        "description": "Website booking phòng nghỉ, khách sạn",
        "client": "Client 33",
        "year": "2022",
        "categories": [
            "Bán hàng",
            "Doanh nghiệp"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/truong-anh-hotel.jpeg",
        "externalUrl": "https://truonganhhotel.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/truong-anh-holtel/"
    },
    {
        "slug": "nha-dat-kim-tuan",
        "title": "Nhà đất Kim Tuấn",
        "description": "Website đăng tin bất động sản\n",
        "client": "Client 34",
        "year": "2023",
        "categories": [
            "Bán hàng",
            "Du lịch"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/Frame-25.jpeg",
        "externalUrl": "https://kimtuan.vn",
        "detailUrl": "https://xuanhieuit.com/du-an/nha-dat-kim-tuan/"
    },
    {
        "slug": "masteri-waterfront",
        "title": "Masteri Waterfront",
        "description": "Landing Page dự án Masteri Wasterifont Vimhomes Ocean Park\n",
        "client": "Client 35",
        "year": "2024",
        "categories": [
            "Bán hàng",
            "Dược phẩm & thuốc"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/masteri-1.jpeg",
        "externalUrl": "https://masteri.xuanhieuit.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/masteri-waterfront/"
    },
    {
        "slug": "travel-newland",
        "title": "Travel NewLand",
        "description": "Thiết kế website booking tour du lịch",
        "client": "Client 36",
        "year": "2025",
        "categories": [
            "Bán hàng",
            "Giáo dục"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/newland.jpeg",
        "externalUrl": "https://newland.xuanhieuit.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/travel-newland/"
    },
    {
        "slug": "thuy-san-vuong-phat-68",
        "title": "Thuỷ Sản Vượng Phát 68",
        "description": "Vượng Phát 68 kinh doanh nội địa & xuất nhập khẩu thuỷ sản\n\n",
        "client": "Client 37",
        "year": "2022",
        "categories": [
            "Bán hàng",
            "Hair salon"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/vuong-phat-68-1.jpeg",
        "externalUrl": "https://thuysanvuongphat68.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/thuy-san-vuong-phat-68/"
    },
    {
        "slug": "level-up",
        "title": "Level Up – GPA",
        "description": "Chương trình đào tạo kỹ năng kết hợp mô hình trại hè nội trú...\n",
        "client": "Client 38",
        "year": "2023",
        "categories": [
            "Bán hàng",
            "Khách sạn"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/level-up.jpeg",
        "externalUrl": "https://levelup.xuanhieuit.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/level-up/"
    },
    {
        "slug": "aplus",
        "title": "Aplus",
        "description": "Phòng khám chuyên khoa PTTM\n\n",
        "client": "Client 39",
        "year": "2024",
        "categories": [
            "Bán hàng",
            "Landing Page"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/PTTTM.jpeg",
        "externalUrl": "https://pktmaplus.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/aplus/"
    },
    {
        "slug": "patado-go",
        "title": "Patado Go",
        "description": "Trung tâm du học nghề Đức\n\n",
        "client": "Client 40",
        "year": "2025",
        "categories": [
            "Bán hàng",
            "Nhà hàng"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/patado-go.jpeg",
        "externalUrl": "https://duhocpatado.edu.vn/",
        "detailUrl": "https://xuanhieuit.com/du-an/patado-go/"
    },
    {
        "slug": "nha-thuoc-manh-anh",
        "title": "Nhà thuốc Mạnh Anh",
        "description": "Thiết kế website bán thuốc\n\n",
        "client": "Client 41",
        "year": "2022",
        "categories": [
            "Bán hàng",
            "Nội thất"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/nha-thuoc-mah-anh.jpeg",
        "externalUrl": "https://nhathuocmanhanh.com.vn/",
        "detailUrl": "https://xuanhieuit.com/du-an/nha-thuoc-manh-anh/"
    },
    {
        "slug": "nha-khoa-ken",
        "title": "Nha Khoa KEN",
        "description": "Website phòng khám răng tại Tây Ninh\n\n",
        "client": "Client 42",
        "year": "2023",
        "categories": [
            "Bán hàng",
            "Phòng khám"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/nhakhoaKEN.jpeg",
        "externalUrl": "https://nhakhoaken.com",
        "detailUrl": "https://xuanhieuit.com/du-an/nha-khoa-ken/"
    },
    {
        "slug": "luong-dien-ngoc-lien",
        "title": "Lương Điền – Ngọc Liên",
        "description": "Công ty CP khu công nghiệp Lương Điền – Ngọc Liên\n",
        "client": "Client 43",
        "year": "2024",
        "categories": [
            "Bán hàng",
            "Spa"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/luong-dien.jpeg",
        "externalUrl": "https://luongdienngoclien.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/luong-dien-ngoc-lien/"
    },
    {
        "slug": "my-candy-viet-nam",
        "title": "My Candy Việt Nam",
        "description": "Công ty TNHH My Candy Việt Nam",
        "client": "Client 44",
        "year": "2025",
        "categories": [
            "Bán hàng",
            "Tin tức & Blog"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/my-candy-vietnam.jpeg",
        "externalUrl": "https://mycandyvn.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/my-candy-viet-nam/"
    },
    {
        "slug": "qacademy",
        "title": "Qacademy",
        "description": "Qacademy by Qgroup\n\n",
        "client": "Client 45",
        "year": "2022",
        "categories": [
            "Bán hàng",
            "Y tế"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/Qacademy.jpeg",
        "externalUrl": "https://qacademy.vn/",
        "detailUrl": "https://xuanhieuit.com/du-an/qacademy/"
    },
    {
        "slug": "kjm-group-korea-ginseng-center",
        "title": "KJM Group Korea Ginseng Center",
        "description": "Thương hiệu phân phối nhân sâm số 1 thế giới\n\n",
        "client": "Client 46",
        "year": "2023",
        "categories": [
            "Bán hàng",
            "Bán hàng"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/ginsengcenter.kr_.jpeg.jpeg",
        "externalUrl": "https://kojamart.xuanhieuit.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/kjm-group-korea-ginseng-center/"
    },
    {
        "slug": "6868-logistics",
        "title": "6868 Logistics",
        "description": "Website giới thiệu dịch vụ Logistics\n\n",
        "client": "Client 47",
        "year": "2024",
        "categories": [
            "Bán hàng",
            "Bất động sản"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/6868-logistics.jpeg",
        "externalUrl": "https://6868logistics.xuanhieuit.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/6868-logistics/"
    },
    {
        "slug": "mens-hair-designer",
        "title": "Men’s Hair Designer",
        "description": "Website lĩnh vực thiết kế và tạo kiểu tóc nam hiện đại\n\n",
        "client": "Client 48",
        "year": "2025",
        "categories": [
            "Bán hàng",
            "Doanh nghiệp"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/Mens-Hair-Designer.jpeg",
        "externalUrl": "https://giun.vn",
        "detailUrl": "https://xuanhieuit.com/du-an/mens-hair-designer/"
    },
    {
        "slug": "duoc-bat-phuc",
        "title": "Dược Bát Phúc",
        "description": "Website giới thiệu doanh nghiệp, dịch vụ marketing tổng thể...\n\n",
        "client": "Client 49",
        "year": "2022",
        "categories": [
            "Bán hàng",
            "Du lịch"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/duoc-bat-phiuc.jpeg",
        "externalUrl": "https://bpmpharma.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/duoc-bat-phuc/"
    },
    {
        "slug": "agency-mic-creative",
        "title": "Agency Mic Creative",
        "description": "Website giới thiệu doanh nghiệp, dịch vụ marketing tổng thể...\n\n\n",
        "client": "Client 50",
        "year": "2023",
        "categories": [
            "Bán hàng",
            "Dược phẩm & thuốc"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/MIC-Creative.jpeg",
        "externalUrl": "https://miccreative.vn",
        "detailUrl": "https://xuanhieuit.com/du-an/agency-mic-creative/"
    },
    {
        "slug": "xuong-thiet-ke-kas-house",
        "title": "Xưởng thiết kế Kas House",
        "description": "Website thiết kế thi công nội thất\n\n",
        "client": "Client 51",
        "year": "2024",
        "categories": [
            "Bán hàng",
            "Giáo dục"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/kas.jpeg",
        "externalUrl": "https://xuongthietkecuakas.com",
        "detailUrl": "https://xuanhieuit.com/du-an/xuong-thiet-ke-kas-house/"
    },
    {
        "slug": "qgroup",
        "title": "Qgroup",
        "description": "Hệ sinh thái cung cấp các giải pháp toàn diện trong lĩnh vực spa\n\n",
        "client": "Client 52",
        "year": "2025",
        "categories": [
            "Bán hàng",
            "Hair salon"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/qgroup.png",
        "externalUrl": "https://qgroups.vn/",
        "detailUrl": "https://xuanhieuit.com/du-an/qgroup/"
    },
    {
        "slug": "benh-vien-mat-ha-noi",
        "title": "Bệnh viện Mắt Hà Nội",
        "description": "Website giới thiệu bệnh viện Mắt Hà Nội\n\n",
        "client": "Client 53",
        "year": "2022",
        "categories": [
            "Bán hàng",
            "Khách sạn"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/benh-vien-mat-ha-noi.jpeg",
        "externalUrl": "https://benhvienmathanoi.gov.vn/",
        "detailUrl": "https://xuanhieuit.com/du-an/benh-vien-mat-ha-noi/"
    },
    {
        "slug": "phong-kham-mat-bich-ngoc",
        "title": "Phòng khám mắt Bích Ngọc",
        "description": "Website phòng khám chuyên khoa Mắt Bích Ngọc\n\n",
        "client": "Client 54",
        "year": "2023",
        "categories": [
            "Bán hàng",
            "Landing Page"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/mat-bich-ngoc.jpeg",
        "externalUrl": "https://matbichngoc.vn/",
        "detailUrl": "https://xuanhieuit.com/du-an/phong-kham-mat-bich-ngoc/"
    },
    {
        "slug": "wulong",
        "title": "Wulong",
        "description": "Thương hiệu buffet lẩu Đài Loan cao cấp giữa lòng Hà Nội\n\n",
        "client": "Client 55",
        "year": "2024",
        "categories": [
            "Bán hàng",
            "Nhà hàng"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/du-an-wulong.jpeg",
        "externalUrl": "https://wulong.vn/",
        "detailUrl": "https://xuanhieuit.com/du-an/wulong/"
    },
    {
        "slug": "mabanol-viet-nam",
        "title": "Mabanol Việt Nam",
        "description": "Website giới thiệu doanh nghiệp, sản phẩm dầu nhớt\n\n",
        "client": "Client 56",
        "year": "2025",
        "categories": [
            "Bán hàng",
            "Nội thất"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/du-an-mabanol-viet-nam.jpeg",
        "externalUrl": "https://mabanolvietnam.vn/",
        "detailUrl": "https://xuanhieuit.com/du-an/mabanol-viet-nam/"
    },
    {
        "slug": "moss-viet-nam",
        "title": "Moss Retail – Moss Việt Nam",
        "description": "Website giới thiệu doanh nghiệp, chi nhánh, sản phẩm\n\n",
        "client": "Client 57",
        "year": "2022",
        "categories": [
            "Bán hàng",
            "Phòng khám"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/08/du-an-moss-viet-nam.jpeg",
        "externalUrl": "https://moss.xuanhieuit.com/",
        "detailUrl": "https://xuanhieuit.com/du-an/moss-viet-nam/"
    },
    {
        "slug": "sao-ee-viet-nam-va-tot-architects-tay-ban-nha",
        "title": "Satoh",
        "description": "Website giới thiệu dịch vụ thiết kế và xây dựng\n\n",
        "client": "Client 58",
        "year": "2023",
        "categories": [
            "Bán hàng",
            "Spa"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/07/converted-2.webp",
        "externalUrl": "https://satoh.xuanhieuit.com",
        "detailUrl": "https://xuanhieuit.com/du-an/sao-ee-viet-nam-va-tot-architects-tay-ban-nha/"
    },
    {
        "slug": "alegolf",
        "title": "Alegolf",
        "description": "Công ty cổ phần truyền thông và du lịch PHI\n\n",
        "client": "Client 59",
        "year": "2024",
        "categories": [
            "Bán hàng",
            "Tin tức & Blog"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/07/www.alegolf.vn_.png",
        "externalUrl": "https://alegolf.com",
        "detailUrl": "https://xuanhieuit.com/du-an/alegolf/"
    },
    {
        "slug": "lau-wang",
        "title": "Lẩu Wang",
        "description": "Hệ thống nhà hàng buffet lẩu tại Hà Nội\n\n",
        "client": "Client 60",
        "year": "2025",
        "categories": [
            "Bán hàng",
            "Y tế"
        ],
        "cover": "https://xuanhieuit.com/wp-content/uploads/2024/07/lauwang.webp",
        "externalUrl": "https://lauwang.vn/",
        "detailUrl": "https://xuanhieuit.com/du-an/lau-wang/"
    }
];
const getProjectBySlug = (slug)=>projects.find((p)=>p.slug === slug);
}),
"[project]/data/workflow.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "workflowSteps",
    ()=>workflowSteps
]);
const workflowSteps = [
    {
        id: '01',
        title: 'Tiếp nhận yêu cầu',
        items: [
            'Thu thập thông tin',
            'Đánh giá ban đầu'
        ]
    },
    {
        id: '02',
        title: 'Phân tích và tư vấn',
        items: [
            'Phân tích yêu cầu',
            'Tư vấn và đề xuất',
            'Ký hợp đồng'
        ]
    },
    {
        id: '03',
        title: 'Thiết kế và phát triển',
        items: [
            'Thiết kế giao diện',
            'Phát triển website'
        ]
    },
    {
        id: '04',
        title: 'Kiểm thử và triển khai',
        items: [
            'Kiểm thử chức năng',
            'Triển khai',
            'Theo dõi và sửa lỗi'
        ]
    },
    {
        id: '05',
        title: 'Bàn giao & đào tạo',
        items: [
            'Bàn giao sản phẩm',
            'Đào tạo',
            'Hỗ trợ'
        ]
    }
];
}),
"[project]/app/du-an/[slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectDetailPage,
    "generateMetadata",
    ()=>generateMetadata,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-rsc] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-rsc] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$CTAConsult$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/common/CTAConsult.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Card.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Container$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Container.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ImagePlaceholder$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/ImagePlaceholder.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$SectionHeading$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/SectionHeading.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$projects$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/projects.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$workflow$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/workflow.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
function generateStaticParams() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$projects$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["projects"].map((p)=>({
            slug: p.slug
        }));
}
async function generateMetadata({ params }) {
    const { slug } = await params;
    const project = (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$projects$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProjectBySlug"])(slug);
    if (!project) return {
        title: 'Dự án',
        description: 'Dự án đã hoàn thành'
    };
    return {
        title: project.title,
        description: project.description
    };
}
const faqItems = [
    {
        q: 'Thời gian triển khai?',
        a: 'Tùy độ phức tạp, thường từ 2-4 tuần với website tiêu chuẩn.'
    },
    {
        q: 'Có hỗ trợ nội dung/SEO?',
        a: 'Cung cấp cấu trúc, checklist SEO và hướng dẫn nhập nội dung.'
    },
    {
        q: 'Bảo hành sau bàn giao?',
        a: 'Hỗ trợ lỗi phát sinh và tối ưu nhỏ trong 60 ngày.'
    }
];
async function ProjectDetailPage({ params }) {
    const { slug } = await params;
    const project = (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$projects$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProjectBySlug"])(slug);
    if (!project) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    const related = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$projects$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["projects"].filter((p)=>p.slug !== slug).slice(0, 4);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-white/70 pb-10 pt-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Container$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-semibold uppercase tracking-wide text-brand-600",
                            children: "Dự án hoàn thành"
                        }, void 0, false, {
                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-extrabold text-ink sm:text-4xl",
                            children: project.title
                        }, void 0, false, {
                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-600",
                            children: project.description
                        }, void 0, false, {
                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-3 text-sm text-gray-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "rounded-full bg-gray-100 px-3 py-1",
                                    children: [
                                        "Phân loại: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: project.categories.join(', ')
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 53,
                                            columnNumber: 26
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                                    lineNumber: 52,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "rounded-full bg-gray-100 px-3 py-1",
                                    children: [
                                        "Khách hàng: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: project.client
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 56,
                                            columnNumber: 27
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "rounded-full bg-gray-100 px-3 py-1",
                                    children: [
                                        "Thời gian hoàn thành: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: project.year
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 59,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: project.externalUrl,
                                    target: "_blank",
                                    rel: "noreferrer noopener",
                                    className: "inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-ring transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
                                    children: [
                                        "Xem thực tế ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 69,
                                            columnNumber: 27
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: "#contact",
                                    className: "inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
                                    children: "Nhận tư vấn"
                                }, void 0, false, {
                                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/du-an/[slug]/page.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Container$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    className: "grid gap-8 lg:grid-cols-[1.2fr,1fr]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$SectionHeading$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    eyebrow: "Giới thiệu dự án",
                                    title: "Tổng quan",
                                    description: "Thông tin ngắn gọn về dự án và phạm vi thực hiện."
                                }, void 0, false, {
                                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-700",
                                    children: "Dự án tập trung vào trải nghiệm người dùng, chuẩn SEO và tốc độ tải. Thiết kế theo nhận diện thương hiệu và tối ưu flow đăng ký/đặt lịch cho khách hàng mục tiêu."
                                }, void 0, false, {
                                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            className: "p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-bold text-ink",
                                    children: "Mục tiêu"
                                }, void 0, false, {
                                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "mt-3 space-y-2 text-sm text-gray-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: "• Tăng tỷ lệ chuyển đổi liên hệ/đặt lịch"
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 93,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: "• Chuẩn SEO onpage và cấu trúc nội dung"
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 94,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: "• Tối ưu tốc độ tải trên mobile"
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 95,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: "• Thể hiện uy tín thương hiệu"
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 96,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/du-an/[slug]/page.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-white/70 py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Container$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$SectionHeading$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            eyebrow: "Giao diện",
                            title: "Hiển thị trên các thiết bị"
                        }, void 0, false, {
                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    className: "p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold text-gray-600",
                                            children: "Giao diện Tablet"
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 107,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ImagePlaceholder$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            aspect: "aspect-[4/3]"
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 108,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    className: "p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold text-gray-600",
                                            children: "Giao diện Desktop"
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 111,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ImagePlaceholder$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            aspect: "aspect-[16/9]"
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 112,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                                    lineNumber: 110,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    className: "p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold text-gray-600",
                                            children: "Giao diện Mobile"
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 115,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ImagePlaceholder$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            aspect: "aspect-[9/16]"
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 116,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                    lineNumber: 103,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/du-an/[slug]/page.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Container$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$SectionHeading$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            eyebrow: "Quy trình làm việc",
                            title: "5 bước triển khai"
                        }, void 0, false, {
                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$workflow$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["workflowSteps"].map((step)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    className: "flex flex-col gap-3 p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-sm font-extrabold text-brand-700",
                                                    children: step.id
                                                }, void 0, false, {
                                                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-lg font-bold text-ink",
                                                    children: step.title
                                                }, void 0, false, {
                                                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                                                    lineNumber: 132,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 128,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "space-y-1 text-sm text-gray-600",
                                            children: step.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                            size: 14,
                                                            className: "text-brand-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                                            lineNumber: 137,
                                                            columnNumber: 23
                                                        }, this),
                                                        item
                                                    ]
                                                }, item, true, {
                                                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                                                    lineNumber: 136,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 134,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, step.id, true, {
                                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                                    lineNumber: 127,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/du-an/[slug]/page.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-white/70 py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Container$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$SectionHeading$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            eyebrow: "Dự Án Liên Quan",
                            title: "Khám phá thêm"
                        }, void 0, false, {
                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                            lineNumber: 150,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4",
                            children: related.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    className: "flex h-full flex-col gap-3 p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ImagePlaceholder$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            aspect: "aspect-[4/3]"
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 154,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs uppercase tracking-wide text-brand-600",
                                            children: "Dự án"
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 155,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-lg font-bold text-ink",
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 156,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600",
                                            children: item.description
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 157,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-auto pt-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/du-an/${item.slug}`,
                                                className: "inline-flex items-center gap-2 text-sm font-semibold text-brand-700",
                                                children: [
                                                    "Xem dự án ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/du-an/[slug]/page.tsx",
                                                        lineNumber: 160,
                                                        columnNumber: 31
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/du-an/[slug]/page.tsx",
                                                lineNumber: 159,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 158,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, item.slug, true, {
                                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                                    lineNumber: 153,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                            lineNumber: 151,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                    lineNumber: 149,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/du-an/[slug]/page.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Container$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$SectionHeading$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            eyebrow: "FAQ",
                            title: "Câu hỏi thường gặp"
                        }, void 0, false, {
                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 space-y-3",
                            children: faqItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    className: "p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-semibold text-ink",
                                            children: item.q
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 175,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600",
                                            children: item.a
                                        }, void 0, false, {
                                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                                            lineNumber: 176,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, item.q, true, {
                                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                                    lineNumber: 174,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/du-an/[slug]/page.tsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/du-an/[slug]/page.tsx",
                    lineNumber: 170,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/du-an/[slug]/page.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$CTAConsult$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                anchorId: "contact"
            }, void 0, false, {
                fileName: "[project]/app/du-an/[slug]/page.tsx",
                lineNumber: 183,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/app/du-an/[slug]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/du-an/[slug]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__31263894._.js.map