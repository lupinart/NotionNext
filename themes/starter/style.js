/* eslint-disable react/no-unknown-property */

/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return (
    <style jsx global>{`
  #theme-starter .sticky{
    position: fixed;
    z-index: 20;
    background-color: rgb(255 255 255 / 0.8);
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  :is(.dark #theme-starter .sticky){
    background-color: rgb(17 25 40 / 0.8);
  }

  #theme-starter .sticky {
    -webkit-backdrop-filter: blur(5px);
            backdrop-filter: blur(5px);
    box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
  }

  #theme-starter .sticky .navbar-logo{
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  #theme-starter .sticky #navbarToggler span{
    --tw-bg-opacity: 1;
    background-color: rgb(17 25 40 / var(--tw-bg-opacity));
  }

  :is(.dark #theme-starter .sticky #navbarToggler span){
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  }

  #theme-starter .sticky #navbarCollapse li > a{
    --tw-text-opacity: 1;
    color: rgb(17 25 40 / var(--tw-text-opacity));
  }

  #theme-starter .sticky #navbarCollapse li > a:hover{
    --tw-text-opacity: 1;
    color: rgb(55 88 249 / var(--tw-text-opacity));
    opacity: 1;
  }

  #theme-starter .sticky #navbarCollapse li > button{
    --tw-text-opacity: 1;
    color: rgb(17 25 40 / var(--tw-text-opacity));
  }

  :is(.dark #theme-starter .sticky #navbarCollapse li > a){
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
  }

  :is(.dark #theme-starter .sticky #navbarCollapse li > a:hover){
    --tw-text-opacity: 1;
    color: rgb(55 88 249 / var(--tw-text-opacity));
  }

  :is(.dark #theme-starter .sticky #navbarCollapse li > button){
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
  }

  #navbarCollapse li .ud-menu-scroll.active{
    opacity: 0.7;
  }

  #theme-starter .sticky #navbarCollapse li .ud-menu-scroll.active{
    --tw-text-opacity: 1;
    color: rgb(55 88 249 / var(--tw-text-opacity));
    opacity: 1;
  }

  #theme-starter .sticky .loginBtn{
    --tw-text-opacity: 1;
    color: rgb(17 25 40 / var(--tw-text-opacity));
  }

  #theme-starter .sticky .loginBtn:hover{
    --tw-text-opacity: 1;
    color: rgb(55 88 249 / var(--tw-text-opacity));
    opacity: 1;
  }

  :is(.dark #theme-starter .sticky .loginBtn){
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
  }

  :is(.dark #theme-starter .sticky .loginBtn:hover){
    --tw-text-opacity: 1;
    color: rgb(55 88 249 / var(--tw-text-opacity));
  }

  #theme-starter .sticky .signUpBtn{
    --tw-bg-opacity: 1;
    background-color: rgb(55 88 249 / var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
  }

  #theme-starter .sticky .signUpBtn:hover{
    --tw-bg-opacity: 1;
    background-color: rgb(27 68 200 / var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
  }

  #theme-starter .sticky #themeSwitcher ~ span{
    --tw-text-opacity: 1;
    color: rgb(17 25 40 / var(--tw-bg-opacity));
  }

  :is(.dark #theme-starter .sticky #themeSwitcher ~ span){
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
  }

  .navbarTogglerActive > span:nth-child(1){
    top: 7px;
    --tw-rotate: 45deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .navbarTogglerActive > span:nth-child(2){
    opacity: 0;
  }

  .navbarTogglerActive > span:nth-child(3){
    top: -8px;
    --tw-rotate: 135deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .text-body-color{
    --tw-text-opacity: 1;
    color: rgb(99 115 129 / var(--tw-text-opacity));
  }

  .text-body-secondary{
    --tw-text-opacity: 1;
    color: rgb(136 153 168 / var(--tw-text-opacity));
  }

  .common-carousel .swiper-button-next:after,
  .common-carousel .swiper-button-prev:after{
    display: none;
  }

  .common-carousel .swiper-button-next,
  .common-carousel .swiper-button-prev{
    position: static !important;
    margin: 0px;
    height: 3rem;
    width: 3rem;
    border-radius: 0.5rem;
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: rgb(17 25 40 / var(--tw-text-opacity));
    --tw-shadow: 0px 8px 15px 0px rgba(72, 72, 138, 0.08);
    --tw-shadow-colored: 0px 8px 15px 0px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }

  .common-carousel .swiper-button-next:hover,
  .common-carousel .swiper-button-prev:hover{
    --tw-bg-opacity: 1;
    background-color: rgb(55 88 249 / var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }

  :is(.dark .common-carousel .swiper-button-next),
  :is(.dark .common-carousel .swiper-button-prev){
    --tw-bg-opacity: 1;
    background-color: rgb(17 25 40 / var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
  }

  .common-carousel .swiper-button-next svg,
  .common-carousel .swiper-button-prev svg{
    height: auto;
    width: auto;
  }

  /* ------------------------------------------------------------------
   * 深色模式補強（可讀性）
   * ------------------------------------------------------------------ */

  /* 如果你的技能/標籤區外層加了 .skills，這裡會更精準 */
  :is(.dark #theme-starter .skills) .card,
  :is(.dark #theme-starter .skills) .feature-card{
    background-color: rgba(255,255,255,0.04);
    border-color: rgba(255,255,255,0.10);
  }

  /* 小膠囊（chip / tag / badge）統一對比 */
  :is(.dark #theme-starter .skills) .chip,
  :is(.dark #theme-starter .skills) .tag,
  :is(.dark #theme-starter .skills) .badge{
    background-color: rgba(255,255,255,0.12) !important;
    color: #E5E7EB !important;            /* text-gray-200 */
    border: 1px solid rgba(255,255,255,0.18) !important;
  }

  /* 如果膠囊內部有連結，提亮字色 */
  :is(.dark #theme-starter .skills) .chip a,
  :is(.dark #theme-starter .skills) .tag a,
  :is(.dark #theme-starter .skills) .badge a{
    color: #F3F4F6 !important;            /* text-gray-100 */
  }

  /* 卡片標題與內文在深色下提亮 */
  :is(.dark #theme-starter .skills) h3,
  :is(.dark #theme-starter .skills) h4{
    color: #F8FAFC;                        /* slate-50 */
  }
  :is(.dark #theme-starter .skills) p{
    color: #CBD5E1;                        /* slate-300 */
  }

  /* 若暫時沒加 .skills，也用常見的「膠囊形狀」兜住一層（保底） */
  :is(.dark #theme-starter) .px-3.py-1.rounded,
  :is(.dark #theme-starter) .px-4.py-1.rounded,
  :is(.dark #theme-starter) .inline-block.rounded{
    background-color: rgba(255,255,255,0.12) !important;
    color: #E5E7EB !important;
    border-color: rgba(255,255,255,0.18) !important;
  }

  /* 額外：把分類膠囊上下距略縮一點（更貼近標題） */
  #theme-starter .category-filter,
  #theme-starter .category-filter + *{
    scroll-margin-top: 72px; /* 方便有錨點的情境 */
  }
  `}</style>
  )
}

export { Style }
