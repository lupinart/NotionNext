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

// 布局框架
const LayoutBase = props => {
  const { children } = props
  const { isLiteMode: globalLiteMode } = useGlobal()
  const router = useRouter()

  useEffect(() => {
    loadWowJS()
  }, [])

  // ?lite=true → 黑底白字（並在切換/卸載時還原）
  useEffect(() => {
    const isLiteMode = router.query.lite === 'true'
    if (isLiteMode) {
      document.body.style.backgroundColor = 'black'
      document.body.style.color = 'white'
    } else {
      document.body.style.backgroundColor = ''
      document.body.style.color = ''
    }
  }, [router.query.lite])

  return (
    <div
      id='theme-starter'
      className={`${siteConfig('FONT_STYLE')} min-h-screen flex flex-col dark:bg-[#212b36] scroll-smooth`}>
      <Style />
      {globalLiteMode ? null : <Header {...props} />}
      <div id='main-wrapper' className='grow'>{children}</div>
      {globalLiteMode ? null : <Footer {...props} />}
      {globalLiteMode ? null : <BackToTopButton />}
    </div>
  )
}

// 首頁布局
const LayoutIndex = props => {
  const count = siteConfig('STARTER_BLOG_COUNT', 3, CONFIG)
  const { locale } = useGlobal()
  const posts = props?.allNavPages ? props.allNavPages.slice(0, count) : []
  return (
    <>
      {siteConfig('STARTER_HERO_ENABLE', true, CONFIG) && <Hero {...props} />}
      {siteConfig('STARTER_BRANDS_ENABLE', true, CONFIG) && <Brand />}
      {siteConfig('STARTER_ABOUT_ENABLE', true, CONFIG) && <About />}
      {siteConfig('STARTER_FEATURE_ENABLE', true, CONFIG) && <Features />}
      {siteConfig('STARTER_PRICING_ENABLE', true, CONFIG) && <Pricing />}
      {siteConfig('STARTER_TESTIMONIALS_ENABLE', true, CONFIG) && <Testimonials />}
      {siteConfig('STARTER_FAQ_ENABLE', true, CONFIG) && <FAQ />}
      {siteConfig('STARTER_TEAM_ENABLE', true, CONFIG) && <Team />}
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
      {siteConfig('STARTER_CONTACT_ENABLE', true, CONFIG) && <Contact />}
      {siteConfig('STARTER_CTA_ENABLE', true, CONFIG) && <CTA />}
    </>
  )
}

// 文章詳情頁
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const router = useRouter()

  useEffect(() => {
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
    }
  }, [post, router])

  if (!post && siteConfig('STARTER_POST_REDIRECT_ENABLE')) {
    return <div id='theme-starter'><Loading /></div>
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

// 儀表盤
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
      <DashboardHeader />
      <DashboardBody />
    </>
  )
}

// 搜尋
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  useEffect(() => {
    if (!isBrowser) return
    const dom = document.getElementById('posts-wrapper')
    if (!dom || !keyword) return
    replaceSearchResult({
      doms: dom,
      search: keyword,
      target: { element: 'span', className: 'text-red-500 border-b border-dashed' }
    })
  }, [keyword])

  return (
    <section className='max-w-7xl mx-auto bg-white pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]'>
      <SearchInput {...props} />
      {currentSearch && <Blog {...props} />}
    </section>
  )
}

// 博客列表 / 歸檔（統一元件）
const LayoutBlogAndArchive = props => {
  const { posts, category, tag } = props
  const slotTitle = category || tag

  const router = useRouter()
  const activeCatRaw = router.query.cat
  const activeCat = typeof activeCatRaw === 'string' ? decodeURIComponent(activeCatRaw) : undefined

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
    <section className='bg-white pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]'>
      <div className='container mx-auto'>
        <div className='-mx-4 flex flex-wrap justify-center'>
          <div className='w-full px-4'>
            <div className='mx-auto mb-6 max-w-[485px] text-center'>
              {slotTitle ? (
                <h2 className='mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]'>
                  {slotTitle}
                </h2>
              ) : (
                <>
                  <span className='mb-2 block text-lg font-semibold text-primary'>
                    {siteConfig('STARTER_BLOG_TITLE')}
                  </span>
                  <h2 className='mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]'>
                    {siteConfig('STARTER_BLOG_TEXT_1')}
                  </h2>
                  <p
                    dangerouslySetInnerHTML={{ __html: siteConfig('STARTER_BLOG_TEXT_2') }}
                    className='text-base text-body-color dark:text-dark-6'></p>
                </>
              )}
            </div>
          </div>
        </div>
        <CategoryFilter categories={categories} active={activeCat} />
        <Blog {...props} posts={filteredPosts} />
      </div>
    </section>
  )
}

// 404
const Layout404 = () => {
  return (
    <section className='bg-white py-20 dark:bg-dark-2 lg:py-[110px]'>
      <div className='container mx-auto'>
        <div className='flex flex-wrap items-center -mx-4'>
          <div className='w-full px-4 md:w-5/12 lg:w-6/12'>
            <div className='text-center'>
              <img src='/images/starter/404.svg' alt='image' className='max-w-full mx-auto' />
            </div>
          </div>
          <div className='w-full px-4 md:w-7/12 lg:w-6/12 xl:w-5/12'>
            <div>
              <div className='mb-8'><SVG404 /></div>
              <h3 className='mb-5 text-2xl font-semibold text-dark dark:text-white'>
                {siteConfig('STARTER_404_TITLE')}
              </h3>
              <p className='mb-8 text-base text-body-color dark:text-dark-6'>
                {siteConfig('STARTER_404_TEXT')}
              </p>
              <SmartLink
                href='/'
                className='py-3 text-base font-medium text-white transition rounded-md bg-dark px-7 hover:bg-primary'>
                {siteConfig('STARTER_404_BACK')}
              </SmartLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// 分類列表
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  const { locale } = useGlobal()
  return (
    <section className='bg-white pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]'>
      <div className='container mx-auto min-h-96'>
        <span className='mb-2 text-lg font-semibold text-primary flex justify-center items-center '>
          {locale.COMMON.CATEGORY}
        </span>
        <div id='category-list' className='duration-200 flex flex-wrap justify-center items-center '>
          {categoryOptions?.map(category => (
            <SmartLink
              key={category.name}
              href={`/category/${encodeURIComponent(category.name)}`}
              passHref
              legacyBehavior>
              <h2 className='hover:text-black text-2xl font-semibold text-dark sm:text-4xl md:text-[40px] md:leading-[1.2] dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600 px-5 cursor-pointer py-2 hover:bg-gray-100'>
                <i className='mr-4 fas fa-folder' />
                {category.name}({category.count})
              </h2>
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  )
}

// 標籤列表
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()
  return (
    <section className='bg-white pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]'>
      <div className='container mx-auto min-h-96'>
        <span className='mb-2 text-lg font-semibold text-primary flex justify-center items-center '>
          {locale.COMMON.TAGS}
        </span>
        <div id='tags-list' className='duration-200 flex flex-wrap justify-center items-center'>
          {tagOptions.map(tag => {
            const color = tag.color || 'default'
            return (
              <div key={tag.name} className='p-2'>
                <SmartLink
                  href={`/tag/${encodeURIComponent(tag.name)}`}
                  passHref
                  className={`cursor-pointer inline-block rounded hover:bg-gray-500 hover:text-white duration-200  mr-2 py-1 px-2 text-md whitespace-nowrap dark:hover:text-white text-gray-600 hover:shadow-xl dark:border-gray-400 notion-${color}_background dark:bg-gray-800`}>
                  <div className='font-light dark:text-gray-400'>
                    <i className='mr-1 fas fa-tag' aria-hidden='true' /> {tag.name}{tag.count ? `(${tag.count})` : ''}
                  </div>
                </SmartLink>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// 登入
const LayoutSignIn = () => {
  const enableClerk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  const title = siteConfig('STARTER_SIGNIN', '登录')
  const description = siteConfig(
    'STARTER_SIGNIN_DESCRITION',
    '这里是演示页面，NotionNext目前不提供会员登录功能'
  )
  return (
    <div className='grow mt-20'>
      <Banner title={title} description={description} />
      {enableClerk ? (
        <div className='flex justify-center py-6'><SignIn /></div>
      ) : <SignInForm />}
    </div>
  )
}

// 註冊
const LayoutSignUp = () => {
  const enableClerk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  const title = siteConfig('STARTER_SIGNIN', '注册')
  const description = siteConfig(
    'STARTER_SIGNIN_DESCRITION',
    '这里是演示页面，NotionNext目前不提供会员注册功能'
  )
  return (
    <div className='grow mt-20'>
      <Banner title={title} description={description} />
      {enableClerk ? (
        <div className='flex justify-center py-6'><SignUp /></div>
      ) : <SignUpForm />}
    </div>
  )
}
// 博客列表（純文章列表，不帶標題膠囊）
const LayoutPostList = props => {
  const { posts } = props
  return (
    <section className='bg-white pb-10 pt-10 dark:bg-dark'>
      <div className='container mx-auto'>
        <Blog {...props} posts={posts} />
      </div>
    </section>
  )
}

export {
  Layout404,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutDashboard,
  LayoutIndex,
  LayoutSearch,
  LayoutSignIn,
  LayoutSignUp,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG,
  LayoutBlogAndArchive as LayoutArchive, // ➜ 專門給 /archive 用
  LayoutPostList // ➜ 專門給 /page/[page].js 用
}
