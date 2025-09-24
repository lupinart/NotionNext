/* eslint-disable react/no-unknown-property */
const Style = () => {
  return (
    <style jsx global>{`
/* ==========================================================================
   主題基礎：統一過場、陰影與色票（可依品牌再調）
   ========================================================================== */
:root{
  --c-brand:        #00B0FD;       /* 主要淺藍 */
  --c-brand-600:    #57DDC6;
  --c-surface:      #FFFFFF;
  --c-text:         #111928;
  --c-muted:        #637381;
  --c-muted-2:      #8899A8;
}
:root.dark{
  --c-surface:      #0F172A;       /* slate-900 */
  --c-surface-2:    #111827;       /* gray-900 */
  --c-panel:        rgba(255,255,255,.08);   /* 卡片底 */
  --c-panel-brd:    rgba(255,255,255,.16);   /* 卡片邊 */
  --c-chip:         rgba(255,255,255,.18);   /* 膠囊底 */
  --c-chip-brd:     rgba(255,255,255,.28);   /* 膠囊邊 */
  --c-text:         #F9FAFB;       /* 幾乎白 */
  --c-text-2:       #E2E8F0;       /* 內文 */
  --c-text-3:       #CBD5E1;       /* 次要 */
  --c-divider:      rgba(255,255,255,.12);
  --c-shadow:       0 6px 20px rgba(0,0,0,.28);
}

/* ==========================================================================
   1) Sticky 導覽列（亮／暗模式皆適用）
   ========================================================================== */
#theme-starter .sticky{
  position: fixed;
  z-index: 20;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition: all .18s cubic-bezier(.4,0,.2,1);
  box-shadow: inset 0 -1px 0 0 rgba(0,0,0,.08);
  background: rgba(255,255,255,.84);
}
:is(.dark #theme-starter .sticky){
  background: rgba(17,25,40,.84);
  box-shadow: inset 0 -1px 0 0 var(--c-divider);
}
#theme-starter .sticky .navbar-logo{ padding: .5rem 0; }
#theme-starter .sticky #navbarToggler span{ background:#111928; }
:is(.dark #theme-starter .sticky #navbarToggler span){ background:#FFF; }
#theme-starter .sticky #navbarCollapse li > a,
#theme-starter .sticky #navbarCollapse li > button,
#theme-starter .sticky .loginBtn{
  color: #111928;
}
#theme-starter .sticky #navbarCollapse li > a:hover,
#theme-starter .sticky .loginBtn:hover{
  color: var(--c-brand);
}
:is(.dark #theme-starter .sticky #navbarCollapse li > a,
     .dark #theme-starter .sticky #navbarCollapse li > button,
     .dark #theme-starter .sticky .loginBtn){
  color:#FFF;
}
:is(.dark #theme-starter .sticky #navbarCollapse li > a:hover,
     .dark #theme-starter .sticky .loginBtn:hover){
  color: var(--c-brand);
}
#theme-starter .sticky .signUpBtn{
  background: var(--c-brand); color:#FFF;
}
#theme-starter .sticky .signUpBtn:hover{
  background: var(--c-brand-600); color:#FFF;
}

/* 漢堡動畫 */
.navbarTogglerActive > span:nth-child(1){ top:7px; transform:rotate(45deg); }
.navbarTogglerActive > span:nth-child(2){ opacity:0; }
.navbarTogglerActive > span:nth-child(3){ top:-8px; transform:rotate(135deg); }

/* 文字色系（亮色主題） */
.text-body-color{ color: var(--c-muted); }
.text-body-secondary{ color: var(--c-muted-2); }

/* 通用輪播箭頭 */
.common-carousel .swiper-button-next:after,
.common-carousel .swiper-button-prev:after{ display:none; }
.common-carousel .swiper-button-next,
.common-carousel .swiper-button-prev{
  position: static !important; margin:0; width:3rem; height:3rem;
  border-radius:.5rem; background:#FFF; color:#111928;
  box-shadow: 0 8px 15px rgba(72,72,138,.08);
  transition: background .2s, color .2s, box-shadow .2s;
}
.common-carousel .swiper-button-next:hover,
.common-carousel .swiper-button-prev:hover{
  background: var(--c-brand); color:#FFF; box-shadow:none;
}
:is(.dark .common-carousel .swiper-button-next,
     .dark .common-carousel .swiper-button-prev){
  background:#111928; color:#FFF;
}

/* ==========================================================================
   2) Skills 區塊：暗色模式「不 hover 也清楚」
   使用方式：把技能卡片 grid 外層容器加上 className="skills"
   ========================================================================== */

/* 卡片本體：預設就有對比，不再靠 hover 才看得見 */
:is(.dark #theme-starter .skills) .group,
:is(.dark #theme-starter .skills) .card,
:is(.dark #theme-starter .skills) .feature-card{
  background: var(--c-panel) !important;
  border: 1px solid var(--c-panel-brd) !important;
  opacity: 1 !important; filter:none !important;
  box-shadow: none !important;
}

/* 文字層級：標題白、內文與次要說明加亮 */
:is(.dark #theme-starter .skills) h3,
:is(.dark #theme-starter .skills) h4{ color: var(--c-text) !important; }
:is(.dark #theme-starter .skills) p,
:is(.dark #theme-starter .skills) .text-body-color{ color: var(--c-text-2) !important; }
:is(.dark #theme-starter .skills) .text-body-secondary{ color: var(--c-text-3) !important; }

/* 小膠囊（chip/tag/badge）：高對比＋可點連結亦清楚 */
:is(.dark #theme-starter .skills) .chip,
:is(.dark #theme-starter .skills) .tag,
:is(.dark #theme-starter .skills) .badge,
:is(.dark #theme-starter .skills) .px-3.py-1.rounded,
:is(.dark #theme-starter .skills) .px-4.py-1.rounded,
:is(.dark #theme-starter .skills) .inline-block.rounded{
  background: var(--c-chip) !important;
  border: 1px solid var(--c-chip-brd) !important;
  color: #F1F5F9 !important;
}
:is(.dark #theme-starter .skills) .chip a,
:is(.dark #theme-starter .skills) .tag a,
:is(.dark #theme-starter .skills) .badge a{
  color:#F3F4F6 !important; text-decoration:none;
}

/* hover 只做「微強調」，不改文字顏色，保持穩定可讀 */
:is(.dark #theme-starter .skills) .card:hover,
:is(.dark #theme-starter .skills) .feature-card:hover{
  box-shadow: var(--c-shadow) !important;
}
:is(.dark #theme-starter .skills) .chip:hover{
  border-color:#60A5FA !important;
  box-shadow: 0 0 6px rgba(96,165,250,.45) !important;
}

/* 若主題加了遮罩/漸層，取消過暗的 mask */
:is(.dark #theme-starter .skills) .overlay,
:is(.dark #theme-starter .skills) .mask,
:is(.dark #theme-starter .skills) .backdrop{
  background: transparent !important; opacity:1 !important;
}

/* 任何以 group-hover 控制淡化的規則一律關閉（避免吃字） */
:is(.dark #theme-starter .skills) .group *,
:is(.dark #theme-starter .skills) .card *,
:is(.dark #theme-starter .skills) .feature-card *{
  opacity:1 !important; filter:none !important;
}

/* 分類過濾器錨點微調（避免被吸到頂端下方） */
#theme-starter .category-filter,
#theme-starter .category-filter + *{ scroll-margin-top:72px; }

/* ==========================================================================
   3) 高對比使用者偏好：再加一級對比（可選）
   ========================================================================== */
@media (prefers-contrast: more){
  :is(.dark #theme-starter .skills) .card,
  :is(.dark #theme-starter .skills) .feature-card{
    background: rgba(255,255,255,.10) !important;
    border-color: rgba(255,255,255,.22) !important;
  }
  :is(.dark #theme-starter .skills) .chip,
  :is(.dark #theme-starter .skills) .tag,
  :is(.dark #theme-starter .skills) .badge{
    background: rgba(255,255,255,.24) !important;
    border-color: rgba(255,255,255,.34) !important;
  }
}
`}</style>
  )
}
export { Style }
