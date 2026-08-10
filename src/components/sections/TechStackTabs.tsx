"use client";

import { useState } from "react";
import { Heading, ScriptAccent } from "@/components/primitives/Heading";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { useLocalizedHome } from "@/i18n/content";
import s from "./TechStackTabs.module.css";

type TechItem = { name: string; tab: TechCategory; svg: string };
type TechCategory =
  | "Giao diện"
  | "Hệ thống"
  | "Cơ sở dữ liệu"
  | "Vận hành"
  | "Quản lý";

const TABS: Array<"Tất cả" | TechCategory> = [
  "Tất cả",
  "Giao diện",
  "Hệ thống",
  "Cơ sở dữ liệu",
  "Vận hành",
  "Quản lý",
];

const ITEMS: TechItem[] = [
  { name: "React / Next.js", tab: "Giao diện", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"></circle><ellipse cx="12" cy="12" rx="10" ry="4"></ellipse><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"></ellipse><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"></ellipse></svg>` },
  { name: "Angular", tab: "Giao diện", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M12 2L2 6.5l1.6 13L12 22l8.4-2.5L22 6.5z"></path><path d="M7 16l5-12 5 12M8.5 12h7"></path></svg>` },
  { name: "Vue.js", tab: "Giao diện", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M2 4l10 18L22 4h-4.5L12 15 6.5 4z"></path><path d="M6.5 4L12 14l5.5-10"></path></svg>` },
  { name: "Figma", tab: "Giao diện", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5M12 2h3.5a3.5 3.5 0 1 1 0 7H12z"></path><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0m-7 7A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0m0-7A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5"></path></svg>` },
  { name: "Adobe XD", tab: "Giao diện", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M18.892 5.105H5.106a2.21 2.21 0 0 0-2.21 2.212v9.366a2.21 2.21 0 0 0 2.21 2.213h13.786a2.21 2.21 0 0 0 2.212-2.213V7.317a2.21 2.21 0 0 0-2.212-2.212" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="m6.602 10.375 3.633 4.295M10.235 10.375 6.602 14.67m6.721-4.295h1.229a2.148 2.148 0 1 1 0 4.295h-1.23v-4.295M13.323 12.52h1.23" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
  { name: "Sketch", tab: "Giao diện", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="m11.134 20.895-7.73-10.74c-.453-.628-.01-1.52.766-1.532l15.666-.237c.783-.012 1.236.88.774 1.505l-7.9 10.669a1 1 0 0 1-1.576.335" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="m4.17 8.623 3.655-4.526a1 1 0 0 1 .778-.36l6.8-.027a1 1 0 0 1 .792.385l3.411 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="m7.85 4.1 3.565 4.54a1 1 0 0 0 1.577.01l4.02-4.577M4.17 8.624h15.437M11.91 20.67 15.6 8.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },

  { name: "Node.js", tab: "Hệ thống", svg: `<svg viewBox="0 0 15 15" fill="none"><path d="M11.5 6v-.167c0-.736-.597-1.333-1.333-1.333H9a1.5 1.5 0 1 0 0 3h1a1.5 1.5 0 0 1 0 3H9A1.5 1.5 0 0 1 7.5 9m-2-5v5.264a2 2 0 0 1-1.106 1.789L3.5 11.5m-2-1v-6l6-3.5 6 3.5v6l-6 3.5z" stroke="currentColor"></path></svg>` },
  { name: "Laravel", tab: "Hệ thống", svg: `<svg viewBox="-4 0 264 264" preserveAspectRatio="xMidYMid"><path d="M255.856 59.62c.095.351.144.713.144 1.077v56.568c0 1.478-.79 2.843-2.073 3.578L206.45 148.18v54.18a4.14 4.14 0 0 1-2.062 3.579l-99.108 57.053c-.227.128-.474.21-.722.299-.093.03-.18.087-.278.113a4.15 4.15 0 0 1-2.114 0c-.114-.03-.217-.093-.325-.134-.227-.083-.464-.155-.68-.278L2.073 205.938A4.13 4.13 0 0 1 0 202.36V32.656c0-.372.052-.733.144-1.083.031-.119.103-.227.145-.346.077-.216.15-.438.263-.639.077-.134.19-.242.283-.366.119-.165.227-.335.366-.48.119-.118.274-.206.408-.309.15-.124.283-.258.453-.356h.005L51.613.551a4.14 4.14 0 0 1 4.125 0l49.546 28.526h.01c.165.104.305.232.454.351.134.103.284.196.402.31.145.149.248.32.371.484.088.124.207.232.279.366.118.206.185.423.268.64.041.118.113.226.144.35.095.351.144.714.145 1.078V138.65l41.286-23.773V60.692c0-.36.052-.727.145-1.072.036-.124.103-.232.144-.35.083-.217.155-.44.268-.64.077-.134.19-.242.279-.366.123-.165.226-.335.37-.48.12-.118.269-.206.403-.309.155-.124.289-.258.454-.356h.005l49.551-28.526a4.13 4.13 0 0 1 4.125 0l49.546 28.526c.175.103.309.232.464.35.128.104.278.197.397.31.144.15.247.32.37.485.094.124.207.232.28.366.118.2.185.423.267.64.047.118.114.226.145.35m-8.115 55.258v-47.04l-17.339 9.981-23.953 13.792v47.04l41.297-23.773zm-49.546 85.095V152.9l-23.562 13.457-67.281 38.4v47.514zM8.259 39.796v160.177l90.833 52.294v-47.505L51.64 177.906l-.015-.01-.02-.01c-.16-.093-.295-.227-.444-.34-.13-.104-.279-.186-.392-.3l-.01-.015c-.134-.129-.227-.289-.34-.433-.104-.14-.227-.258-.31-.402l-.005-.016c-.093-.154-.15-.34-.217-.515-.067-.155-.154-.3-.196-.464v-.005c-.051-.196-.061-.403-.082-.604-.02-.154-.062-.309-.062-.464V63.57L25.598 49.772l-17.339-9.97zM53.681 8.893 12.399 32.656l41.272 23.762L94.947 32.65 53.671 8.893zm21.468 148.298 23.948-13.786V39.796L81.76 49.778 57.805 63.569v103.608zM202.324 36.935l-41.276 23.762 41.276 23.763 41.271-23.768zm-4.13 54.676-23.953-13.792-17.338-9.981v47.04l23.948 13.787 17.344 9.986zm-94.977 106.006 60.543-34.564 30.264-17.272-41.246-23.747-47.489 27.34-43.282 24.918z" fill="currentColor"></path></svg>` },
  { name: "WordPress / PHP", tab: "Hệ thống", svg: `<svg viewBox="0 0 24 24"><path d="M3.667 12a8.33 8.33 0 0 0 4.697 7.5L4.388 8.607A8.3 8.3 0 0 0 3.667 12m8.48.729-2.501 7.265a8.34 8.34 0 0 0 5.121-.133 1 1 0 0 1-.06-.115zm5.479-1.15a4.4 4.4 0 0 0-.687-2.298 3.9 3.9 0 0 1-.819-1.954 1.443 1.443 0 0 1 1.4-1.48q.055.002.107.008a8.33 8.33 0 0 0-12.59 1.568c.196.006.38.01.537.01.871 0 2.22-.106 2.22-.106a.345.345 0 0 1 .054.687s-.452.052-.954.079l3.035 9.026 1.824-5.47-1.299-3.556c-.449-.027-.874-.08-.874-.08a.345.345 0 0 1 .053-.686s1.376.106 2.195.106c.871 0 2.221-.106 2.221-.106a.344.344 0 0 1 .053.687s-.452.052-.953.079l3.011 8.958.86-2.725c.336-.88.54-1.806.606-2.746m1.743-2.72a7.9 7.9 0 0 1-.634 2.985l-2.545 7.359a8.334 8.334 0 0 0 3.123-11.2q.056.426.056.856M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2m3.659 18.662a9.39 9.39 0 0 1-8.914-.867 9.43 9.43 0 0 1-3.407-4.136 9.39 9.39 0 0 1 .867-8.914 9.43 9.43 0 0 1 4.136-3.406 9.39 9.39 0 0 1 8.914.866 9.43 9.43 0 0 1 3.407 4.136 9.39 9.39 0 0 1-.867 8.914 9.43 9.43 0 0 1-4.136 3.407" fill="currentColor"></path></svg>` },
  { name: ".NET / ASP.NET", tab: "Hệ thống", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18M9 21V9"></path></svg>` },

  { name: "MySQL", tab: "Cơ sở dữ liệu", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="6" rx="9" ry="3"></ellipse><path d="M3 6v6c0 1.66 4 3 9 3s9-1.34 9-3V6"></path><path d="M3 12v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"></path></svg>` },
  { name: "PostgreSQL", tab: "Cơ sở dữ liệu", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="7" rx="8" ry="4"></ellipse><path d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7"></path><path d="M4 12c0 2.21 3.58 4 8 4s8-1.79 8-4"></path></svg>` },
  { name: "MongoDB", tab: "Cơ sở dữ liệu", svg: `<svg viewBox="0 0 15 15" fill="none"><path d="m7.5.5.369-.338a.5.5 0 0 0-.738 0zm0 13-.393.309a.5.5 0 0 0 .786 0zM4.623 9.838l-.393.31zm.246-6.467L4.5 3.032zm5.262 0 .369-.338zm.246 6.467.393.31zM8 15V.5H7V15zm-.107-1.809L5.016 9.53l-.786.618 2.877 3.662zM5.237 3.708 7.87.838 7.13.162 4.5 3.032zM7.131.838l2.632 2.87.737-.675L7.869.163zm2.853 8.691-2.877 3.662.786.618 2.877-3.662zm-.221-5.82a4.5 4.5 0 0 1 .22 5.82l.787.618a5.5 5.5 0 0 0-.27-7.114zm-4.747 5.82a4.5 4.5 0 0 1 .221-5.82L4.5 3.032a5.5 5.5 0 0 0-.27 7.114z" fill="currentColor"></path></svg>` },
  { name: "Redis", tab: "Cơ sở dữ liệu", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="7" rx="9" ry="3"></ellipse><path d="M3 7v5c0 1.66 4.03 3 9 3s9-1.34 9-3V7"></path><path d="M3 12v5c0 1.66 4.03 3 9 3s9-1.34 9-3v-5"></path></svg>` },

  { name: "Docker", tab: "Vận hành", svg: `<svg viewBox="0 0 15 15" fill="none"><path d="M.5 5.5V5H0v.5zm2-2V3H2v.5zm4-2V1H6v.5zm2 0H9V1h-.5zm4 6H12V8h.5zM1 7.5v-2H0v2zm2 0v-4H2v4zM2.5 4h6V3h-6zM8 3.5v4h1v-4zm-3 4v-4H4v4zm2 0v-6H6v6zM6.5 2h2V1h-2zM8 1.5v2h1v-2zm5.736 8.5H15V9h-1.264zM10 5v.5h1V5zm2 1.5v1h1v-1zm.5 1.5h1V7h-1zm1.5.5v1h1v-1zm-.5-.5a.5.5 0 0 1 .5.5h1A1.5 1.5 0 0 0 13.5 7zm-2-2a.5.5 0 0 1 .5.5h1A1.5 1.5 0 0 0 11.5 5zM3 10h1V9H3zm5.5-3h-8v1h8zM0 7.5v1h1v-1zM5.5 14h.528v-1H5.5zm.528 0a7.74 7.74 0 0 0 6.23-3.15l-.805-.593A6.74 6.74 0 0 1 6.028 13zM0 8.5A5.5 5.5 0 0 0 5.5 14v-1A4.5 4.5 0 0 1 1 8.5zM.5 6h11V5H.5zm9.5-.5A1.5 1.5 0 0 1 8.5 7v1A2.5 2.5 0 0 0 11 5.5zM13.736 9c-.96 0-1.769.558-2.283 1.257l.806.593c.383-.522.922-.85 1.477-.85z" fill="currentColor"></path></svg>` },
  { name: "GitHub", tab: "Vận hành", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>` },
  { name: "GitLab", tab: "Vận hành", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M22 13.5L12 21 2 13.5l2.5-8 2.5 5h10l2.5-5z"></path></svg>` },
  { name: "Bitbucket", tab: "Vận hành", svg: `<svg viewBox="0 0 15 15" fill="none"><path d="M.5.5V0a.5.5 0 0 0-.495.57zm14 0 .495.07A.5.5 0 0 0 14.5 0zm-2 14v.5a.5.5 0 0 0 .495-.43zm-10 0-.495.07A.5.5 0 0 0 2.5 15zM5 4.5V4a.5.5 0 0 0-.498.542zm4.5 6v.5a.5.5 0 0 0 .498-.459zm-4 0-.498.041A.5.5 0 0 0 5.5 11zM.5 1h14V0H.5zM14.005.43l-2 14 .99.14 2-14zM12.5 14h-10v1h10zm-9.505.43-2-14-.99.14 2 14zM5 5h5V4H5zm4.502-.542-.5 6 .996.083.5-6zM9.5 10h-4v1h4zm-3.502.459-.5-6-.996.083.5 6zM10 5h4V4h-4z" fill="currentColor"></path></svg>` },
  { name: "GitHub Actions", tab: "Vận hành", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M10.984 13.836a.5.5 0 0 1-.353-.146l-.745-.743a.5.5 0 1 1 .706-.708l.392.391 1.181-1.18a.5.5 0 0 1 .708.707l-1.535 1.533a.5.5 0 0 1-.354.146m9.353-.147 1.534-1.532a.5.5 0 0 0-.707-.707l-1.181 1.18-.392-.391a.5.5 0 1 0-.706.708l.746.743a.497.497 0 0 0 .706-.001M4.527 7.452l2.557-1.585A1 1 0 0 0 7.09 4.17L4.533 2.56A1 1 0 0 0 3 3.406v3.196a1.001 1.001 0 0 0 1.527.85m2.03-2.436L4 6.602V3.406zM24 12.5c0 1.93-1.57 3.5-3.5 3.5a3.5 3.5 0 0 1-3.46-3h-2.08a3.5 3.5 0 0 1-3.46 3 3.5 3.5 0 0 1-3.46-3h-.558c-.972 0-1.85-.399-2.482-1.042V17c0 1.654 1.346 3 3 3h.04c.244-1.693 1.7-3 3.46-3 1.93 0 3.5 1.57 3.5 3.5S13.43 24 11.5 24a3.5 3.5 0 0 1-3.46-3H8c-2.206 0-4-1.794-4-4V9.899A5.01 5.01 0 0 1 0 5c0-2.757 2.243-5 5-5s5 2.243 5 5a5.005 5.005 0 0 1-4.952 4.998A2.48 2.48 0 0 0 7.482 12h.558c.244-1.693 1.7-3 3.46-3a3.5 3.5 0 0 1 3.46 3h2.08a3.5 3.5 0 0 1 3.46-3c1.93 0 3.5 1.57 3.5 3.5m-15 8c0 1.378 1.122 2.5 2.5 2.5s2.5-1.122 2.5-2.5-1.122-2.5-2.5-2.5S9 19.122 9 20.5M5 9c2.206 0 4-1.794 4-4S7.206 1 5 1 1 2.794 1 5s1.794 4 4 4m9 3.5c0-1.378-1.122-2.5-2.5-2.5S9 11.122 9 12.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5m9 0c0-1.378-1.122-2.5-2.5-2.5S18 11.122 18 12.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5m-13 8a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0m2 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0m12 0c0 1.93-1.57 3.5-3.5 3.5a3.5 3.5 0 0 1-3.46-3.002l-.021.005-.506.017h-.017a.5.5 0 0 1-.016-.999l.506-.017c.018-.002.035.006.052.007A3.5 3.5 0 0 1 20.5 17c1.93 0 3.5 1.57 3.5 3.5m-1 0c0-1.378-1.122-2.5-2.5-2.5S18 19.122 18 20.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5"></path></svg>` },
  { name: "CI/CD", tab: "Vận hành", svg: `<svg viewBox="0 0 36 36"><path d="M23.53 19.81a7.5 7.5 0 0 1-1.65-.18 10.5 10.5 0 0 1 .72 2.13h.93a9.5 9.5 0 0 0 3-.49l-.93-1.81a7.7 7.7 0 0 1-2.07.35m-5.17-1.94-.36-.38a7.4 7.4 0 0 1-2.2-5.92 7.3 7.3 0 0 1 1.54-4L17.26 9a1 1 0 0 0 .91 1h.09a1 1 0 0 0 1-.91L19.6 5a1 1 0 0 0-.29-.79 1 1 0 0 0-.79-.21l-4.09.35a1 1 0 0 0 .17 2l1.29-.11a9.45 9.45 0 0 0-2.05 5.32 9.28 9.28 0 0 0 2.67 7.26l.31.37a7.33 7.33 0 0 1 2.06 4.91 7.4 7.4 0 0 1-.26 2.47l1.8.91a8.8 8.8 0 0 0 .45-3.51 9.28 9.28 0 0 0-2.51-6.1m14.04.04-1.21.09a9.65 9.65 0 0 0-7.66-15.55 9.3 9.3 0 0 0-3 .49l.91 1.8a7.67 7.67 0 0 1 9.76 7.39 7.58 7.58 0 0 1-1.65 4.72l.1-1.54a1 1 0 1 0-2-.13l-.28 4.08a1 1 0 0 0 .31.78.94.94 0 0 0 .69.28h.1l4.08-.42a1 1 0 0 0 .9-1.1 1 1 0 0 0-1.05-.89M4.07 20.44h.08l4.09-.35a1 1 0 1 0-.17-2l-1.39.12a7.63 7.63 0 0 1 4.52-1.49 8 8 0 0 1 1.63.18 10.2 10.2 0 0 1-.71-2.13h-.92a9.66 9.66 0 0 0-5.9 2l.12-1.31a1 1 0 0 0-.92-1.08 1 1 0 0 0-1.08.91l-.35 4.08a1 1 0 0 0 1 1.08Zm14.35 7.79-4.09.27a1 1 0 0 0 .13 2l1.54-.11a7.71 7.71 0 0 1-12.54-6 7.6 7.6 0 0 1 .29-2L2 21.46a9.6 9.6 0 0 0-.47 2.95A9.7 9.7 0 0 0 17.19 32l-.12 1.18a1 1 0 0 0 .89 1.1h.11a1 1 0 0 0 1-.9l.42-4.06a1 1 0 0 0-1.06-1.1Z" fill="currentColor"></path></svg>` },
  { name: "AWS", tab: "Vận hành", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M12.248 6.685c-.656 2.694-.614 2.55-1.209 5.014a.43.43 0 0 1-.504.4h.003-.675a.4.4 0 0 1-.463-.34v-.002c-.577-1.846-1.35-4.41-1.87-6.125-.192-.633-.066-.618.436-.605.174.005.342 0 .515 0l.041-.002a.39.39 0 0 1 .385.333v.002c.169.605.281 1.069 1.246 4.88q.028.112.066.215h.051c.023-.094.051-.182.075-.277q.548-2.313 1.092-4.63c.113-.48.314-.525.8-.525h.356c.32.005.422.07.502.389.281 1.097 1.102 4.77 1.251 5.174.24-.858-.084.37 1.336-5.108.098-.379.192-.454.577-.454h.591c.253.005.328.084.267.333-.113.446-.136.464-1.935 6.228-.146.464-.197.506-.684.506h-.497c-.342 0-.431-.061-.515-.394-.202-.759-1.092-4.485-1.238-5.01z"></path></svg>` },
  { name: "Deploy Server", tab: "Vận hành", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="8" rx="2"></rect><rect x="2" y="14" width="20" height="8" rx="2"></rect><circle cx="6" cy="6" r="1" fill="currentColor" stroke="none"></circle><circle cx="6" cy="18" r="1" fill="currentColor" stroke="none"></circle></svg>` },

  { name: "Jira", tab: "Quản lý", svg: `<svg viewBox="0 0 48 48"><g><path fill="transparent" d="M0 0h48v48H0z"></path><g stroke="currentColor" stroke-width="2" fill="none"><path d="M44.2 2H23a9.6 9.6 0 0 0 9.5 9.6h3.9v3.7a9.6 9.6 0 0 0 9.6 9.6V3.8A1.8 1.8 0 0 0 44.2 2"></path><path d="M33.7 12.6H12.5a9.6 9.6 0 0 0 9.5 9.5h4v3.8a9.4 9.4 0 0 0 9.5 9.5v-21a1.8 1.8 0 0 0-1.8-1.8"></path><path d="M23.2 23.1H2a9.6 9.6 0 0 0 9.6 9.6h3.9v3.7A9.6 9.6 0 0 0 25 46V24.9a1.8 1.8 0 0 0-1.8-1.8"></path></g></g></svg>` },
];

type TechStackTabsProps = {
  label?: string;
  headline?: [string, string, string];
  detail?: boolean;
  home?: boolean;
};

export function TechStackTabs({ label, headline, detail = false, home: isHome = false }: TechStackTabsProps = {}) {
  const home = useLocalizedHome();
  const t = home.techStack;
  const resolvedHeadline = headline ?? t.headline;
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const activeTab = TABS[activeTabIndex];

  const visible = ITEMS.filter(
    (it) => activeTab === "Tất cả" || it.tab === activeTab,
  );

  return (
    <section className={`${s.section} ${detail ? s.detail : ""} ${isHome ? s.home : ""}`}>
      <div className={s.container}>
        <div className={s.heading}>
          {!detail && <SectionLabel>{label ?? t.label}</SectionLabel>}
          {detail ? (
            <h2 className={s.detailHeading}>
              <span className={s.detailHeadingLight}>{resolvedHeadline[0]}</span>
              {resolvedHeadline[1] && (
                <> <span className={s.detailHeadingLight}>{resolvedHeadline[1]}</span></>
              )}
              {resolvedHeadline[2] && (
                <> <span className={s.detailHeadingDark}>{resolvedHeadline[2]}</span></>
              )}
            </h2>
          ) : (
            <Heading as="h2" size="h2-section">
              {resolvedHeadline[0]}
              {resolvedHeadline[1] && (
                <> <ScriptAccent>{resolvedHeadline[1]}</ScriptAccent></>
              )}
              {resolvedHeadline[2] && <> {resolvedHeadline[2]}</>}
            </Heading>
          )}
        </div>
        <div className={s.body}>
          <div className={s.filters}>
            {TABS.map((tb, index) => (
              <button
                key={tb}
                onClick={() => setActiveTabIndex(index)}
                className={`${s.filterBtn} ${activeTabIndex === index ? s.filterBtnActive : ""}`}
              >
                {t.tabs[index] ?? tb}
              </button>
            ))}
          </div>
          <div className={s.grid}>
            {visible.map((it) => (
              <div key={it.name} className={s.card}>
                <div
                  className={s.cardIcon}
                  dangerouslySetInnerHTML={{ __html: it.svg }}
                />
                <span className={s.cardName}>{it.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
