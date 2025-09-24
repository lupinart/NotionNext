import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { isBrowser } from '@/lib/utils'
import { formatDateFmt } from '@/lib/utils/formatDate'
import { DynamicLayout } from '@/themes/theme'
import { useEffect } from 'react'

/**
 * 归档首頁
 * @param {*} props
 * @returns
 */
const ArchiveIndex = props => {
  useEffect(() => {
    if (isBrowser) {
      const anchor = window.location.hash
      if (anchor) {
        setTimeout(() => {
          const anchorElement = document.getElementById(anchor.substring(1))
          if (anchorElement) {
            anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' })
          }
        }, 300)
      }
    }
  }, [])

  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  // ✅ 使用 LayoutArchive 顯示「設計筆記」「最新分享」「分類膠囊」
  return <DynamicLayout theme={theme} layoutName='LayoutArchive' {...props} />
}

export async function getStaticProps({ locale }) {
  const props = await getGlobalData({ from: 'archive-index', locale })
  // 過濾只取已發布文章
  props.posts = props.allPages?.filter(
    page => page.type === 'Post' && page.status === 'Published'
  )
  delete props.allPages

  // 按照日期排序
  const postsSortByDate = Object.create(props.posts)
  postsSortByDate.sort((a, b) => {
    return b?.publishDate - a?.publishDate
  })

  // 按月份分組
  const archivePosts = {}
  postsSortByDate.forEach(post => {
    const date = formatDateFmt(post.publishDate, 'yyyy-MM')
    if (archivePosts[date]) {
      archivePosts[date].push(post)
    } else {
      archivePosts[date] = [post]
    }
  })

  props.archivePosts = archivePosts
  delete props.allPages

  return {
    props,
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          BLOG.NEXT_REVALIDATE_SECOND,
          props.NOTION_CONFIG
        )
  }
}

export default ArchiveIndex
