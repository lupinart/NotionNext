/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

'use client'
import Comment from '@/components/Comment'
import Loading from '@/components/Loading'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import SmartLink from '@/components/SmartLink'
import DashboardBody from '@/components/ui/dashboard/DashboardBody'
import DashboardHeader from '@/components/ui/dashboard/DashboardHeader'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadWowJS } from '@/lib/plugins/wow'
import { isBrowser } from '@/lib/utils'
import { SignIn, SignUp } from '@clerk/nextjs'
import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { About } from './components/About'
import { ArticleLock } from './components/ArticleLock'
import { BackToTopButton } from './components/BackToTopButton'
import { Banner } from './components/Banner'
import { Blog } from './components/Blog'
import { Brand } from './components/Brand'
import CategoryFilter from './components/CategoryFilter'
import { Contact } from './components/Contact'
import { CTA } from './components/CTA'
import { FAQ } from './components/FAQ'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Pricing } from './components/Pricing'
import SearchInput from './components/SearchInput'
import { SignInForm } from './components/SignInForm'
import { SignUpForm } from './components/SignUpForm'
import { SVG404 } from './components/svg/SVG404'
import { Team } from './components/Team'
import { Testimonials } from './components/Testimonials'
import CONFIG from './config'
import { Style } from './style'
// import { MadeWithButton } from './components/MadeWithButton'

/**
 * 布局框架
 * Landing-2 主题用作产品落地页展示
 * 结合Stripe或者lemonsqueezy插件可以成为saas支付订阅
 * https://play-tailwind.tailgrids.com/
 * @param {*} props
 * @returns
 */
const LayoutBase = props => {
  const { children } = props
  // 极简模式，会隐藏掉页头页脚等组件，便于嵌入网页等功能
  const { isLiteMode } = useGlobal()
  const router = useRouter()

  // 加载wow动画
  useEffect(() => {
    loadWowJS()
  }, [])

  // 特殊简化布局，如果识别到路由中有 ?lite=true，则给网页添加一些自定义的css样式，例如背景改成黑色
  useEffect(() => {
    const isLiteMode = router.query.lite === 'true'
    console.log(router.query.lite, isLiteMode)
    if (isLiteMode) {
      document.body.style.backgroundColor = 'black'
      document.body.style.color = 'white'
    }
  }, [router.query])

  return (
    <div
      id='theme-starter'
      className={`${siteConfig('FONT_STYLE')} min-h-screen flex flex-col dark:bg-[#212b36] scroll-smooth`}>
      <Style />

      {/* 页头 */}
      {isLiteMode ? <></> : <Header {...props} />}

      <div id='main-wrapper' className='grow'>
        {children}
      </div>

      {/* 页脚 */}
      {isLiteMode ? <></> : <Footer {...props} />}

      {/* 悬浮按钮 */}
      {isLiteMode ? <></> : <BackToTopButton />}

      {/* <MadeWithButton/> */}
    </div>
  )
}

/**
 * 首页布局
 * @param {*} props
 * @returns
 */
const LayoutIndex = props => {
  const count = siteConfig('STARTER_BLOG_COUNT', 3, CONFIG)
  const { locale } = useGlobal()
  const posts = props?.allNavPages ? props.allNavPages.slice(0, count) : []
  return (
    <>
      {/* 英雄区 */}
      {siteConfig('STARTER_HERO_ENABLE', true, CONFIG) && <Hero {...props} />}
      {/* 合作伙伴 */}
      {siteConfig('STARTER_BRANDS_ENABLE', true, CONFIG) && <Brand />}
      {/* 关于 */}
      {siteConfig('STARTER_ABOUT_ENABLE', true, CONFIG) && <About />}

      {/* 产品特性 */}
      {siteConfig('STARTER_FEATURE_ENABLE', true, CONFIG) && <Features />}

      {/* 价格 */}
      {siteConfig('STARTER_PRICING_ENABLE', true, CONFIG) && <Pricing />}
      {/* 评价展示 */}
      {siteConfig('STARTER_TESTIMONIALS_ENABLE', true, CONFIG) && (
        <Testimonials />
      )}
      {/* 常见问题 */}
      {siteConfig('STARTER_FAQ_ENABLE', true, CONFIG) && <FAQ />}
      {/* 团队介绍 */}
      {siteConfig('STARTER_TEAM_ENABLE', true, CONFIG) && <Team />}
      {/* 博文列表 */}
      {siteConfig('STARTER_BLOG_ENABLE', true, CONFIG) && (
        <>
          <Blog posts={posts} />
          <div className='container mx-auto flex justify-end mb-4'>
            <SmartLink className='text-lg underline' href={'/archive'}>
              <span>{locale.COMMON.MORE}</span>
              <i className='ml-2 fas fa-arrow-right' />
            </SmartLink>
          </div>
        </>
      )}
      {/* 联系方式 */}
      {siteConfig('STARTER_CONTACT_ENABLE', true, CONFIG) && <Contact />}

      {/* 行动呼吁 */}
      {siteConfig('STARTER_CTA_ENABLE', true, CONFIG) && <CTA />}
    </>
  )
}

/**
 * 文章详情页布局
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props

  // 如果 是 /article/[slug] 的文章路径则视情况进行重定向到另一个域名
  const router = useRouter()
  if (
    !post &&
    siteConfig('STARTER_POST_REDIRECT_ENABLE') &&
    isBrowser &&
    router.route === '/[prefix]/[slug]'
  ) {
    const redirectUrl =
      siteConfig('STARTER_POST_REDIRECT_URL') +
      router.asPath.replace('?theme=landing', '')
    router.push(redirectUrl)
    return (
      <div id='theme-starter'>
        <Loading />
      </div>
    )
  }

  return (
    <>
      <Banner title={post?.title} description={post?.summary} />
      <div className='container grow'>
        <div className='flex flex-wrap justify-center -mx-4'>
          <div id='container-inner' className='w-full p-4'>
            {lock && <ArticleLock validPassword={validPassword} />}

            {!lock && post && (
              <div id='article-wrapper' className='mx-auto'>
                <NotionPage {...props} />
                <Comment frontMatter={post} />
                <ShareBar post={post} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * 仪表盘
 * @param {*} props
 * @returns
 */
const LayoutDashboard = props => {
  const { post } = props

  return (
    <>
      <div className='container grow'>
        <div className='flex flex-wrap justify-center -mx-4'>
          <div id='container-inner' className='w-full p-4'>
            {post && (
              <div id='article-wrapper' className='mx-auto'>
                <NotionPage {...props} />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 仪表盘 */}
      <DashboardHeader />
      <DashboardBody />
    </>
  )
}

/**
 * 搜索
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  useEffect(() => {
    if (isBrowser) {
      replaceSearchResult({
        doms: document.getElementById('posts-wrapper'),
        search: keyword,
        target: {
          element: 'span',
          className: 'text-red-500 border-b border-dashed'
        }
      })
    }
  }, [keyword])
  return (
    <>
      <section className='max-w-7xl mx-auto bg-white pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]'>
        <SearchInput {...props} />
        {currentSearch && <Blog {...props} />}
      </section>
    </>
  )
}
const LayoutArchive = props => {
  const { posts } = props
  const router = useRouter()

  // 讀取網址上的 ?cat=
  const activeCatRaw = router.query.cat
  const activeCat = typeof activeCatRaw === 'string' ? decodeURIComponent(activeCatRaw) : undefined

  // 彙整分類 + 依參數過濾
  const { categories, filteredPosts } = useMemo(() => {
    const map = new Map()
    const list = posts || []

    list.forEach(p => {
      const name =
        typeof p?.category === 'string'
          ? p.category
          : Array.isArray(p?.category) && p.category.length > 0
          ? p.category[0]
          : '未分類'
      map.set(name, (map.get(name) || 0) + 1)
    })

    const categories = [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))

    const filteredPosts = activeCat
      ? list.filter(p => {
          const name =
            typeof p?.category === 'string'
              ? p.category
              : Array.isArray(p?.category) && p.category.length > 0
              ? p.category[0]
              : '未分類'
          return name === activeCat
        })
      : list

    return { categories, filteredPosts }
  }, [posts, activeCat])

  return (
    <>
      {/* ✅ 這裡是篩選列 */}
      <CategoryFilter categories={categories} active={activeCat} />

      {/* 原本的列表，但換成篩選後的文章 */}
      <Blog {...props} posts={filteredPosts} />
    </>
  )
}

/**
 * 404页面
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  return (
    <>
      {/* */}
      <section className='bg-white py-20 dark:bg-dark-2 lg:py-[110px]'>
        <div className='container mx-auto'>
          <div className='flex flex-wrap items-center -mx-4'>
            <div className='w-full px-4 md:w-5/12 lg:w-6/12'>
              <div className='text-center'>
                <SVG404 />
              </div>
            </div>
            <div className='w-full px-4 md:w-7/12 lg:w-6/12 xl:w-5/12'>
              <div>
                <div className='mb-8'>
                  <SVG404 />
                </div>
                <h3 className='mb-5 text-2xl font-semibold text-dark dark:text-white'>
                  {siteConfig('STARTER_404_TITLE')}
                </h3>
                <p className='mb-8 text-base text-body-color dark:text-dark-6'>
                  {siteConfig('STARTER_404_TEXT')}
                </p>
                <SmartLink
