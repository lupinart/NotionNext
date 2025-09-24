import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { DynamicLayout } from '@/themes/theme'
import { useEffect } from 'react'

/**
 * 404
 * @param {*} props
 * @returns
 */
const NoFound = props => {
  useEffect(() => {
    console.log('404頁面加載')
  }, [])
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='Layout404' {...props} />
}

export async function getStaticProps(req) {
  const { locale } = req
  const props = (await getGlobalData({ from: '404', locale })) || {}
  
  // 在 404 頁面不需要所有文章列表，只取必要的配置資料
  delete props.posts
  delete props.allPages

  return { 
    props,
    revalidate: siteConfig('NEXT_REVALIDATE_SECOND', BLOG.NEXT_REVALIDATE_SECOND)
  }
}

export default NoFound
