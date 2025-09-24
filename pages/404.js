import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { DynamicLayout } from '@/themes/theme'

/**
 * 404
 * @param {*} props
 * @returns
 */
const NoFound = props => {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='Layout404' {...props} />
}

export async function getStaticProps({ locale }) {
  const props = (await getGlobalData({ from: '404', locale })) || {}
  
  // 為了確保 404 頁面載入速度快，可以考慮在這裡清空不必要的資料
  // props.allPosts = []
  
  return { 
    props,
    revalidate: siteConfig('NEXT_REVALIDATE_SECOND', BLOG.NEXT_REVALIDATE_SECOND, props.NOTION_CONFIG)
  }
}

export default NoFound
