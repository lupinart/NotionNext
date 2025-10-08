import BLOG from '@/blog.config'

export default function getAllPageIds(collectionQuery, collectionId, collectionView, viewIds) {
  if (!collectionQuery || !collectionId) {
    console.warn('⚠️ collectionQuery 或 collectionId 不存在')
    return []
  }

  let pageIds = []

  try {
    // 嘗試用 NotionNext 原本邏輯
    const groupIndex = typeof BLOG.NOTION_INDEX === 'number' ? BLOG.NOTION_INDEX : 0
    if (viewIds && Array.isArray(viewIds) && viewIds.length > 0) {
      const viewId = viewIds[groupIndex]
      const ids =
        collectionQuery?.[collectionId]?.[viewId]?.collection_group_results?.blockIds ||
        collectionQuery?.[collectionId]?.[viewId]?.blockIds || []
      pageIds.push(...ids)
    }
  } catch (err) {
    console.error('⚠️ getAllPageIds error (viewIds)', err)
  }

  // 如果還是空的 → 遍歷所有 view
  if (pageIds.length === 0) {
    const pageSet = new Set()
    try {
      Object.values(collectionQuery?.[collectionId] || {}).forEach(view => {
        if (view?.blockIds) {
          view.blockIds.forEach(id => pageSet.add(id))
        }
        if (view?.collection_group_results?.blockIds) {
          view.collection_group_results.blockIds.forEach(id => pageSet.add(id))
        }
      })
    } catch (err) {
      console.error('⚠️ getAllPageIds error (fallback)', err)
    }
    pageIds = [...pageSet]
  }

  // 🚨 最後再保險：避免 undefined
  pageIds = pageIds.filter(id => typeof id === 'string')

  console.log('✅ 最終 pageIds:', pageIds.length)
  return pageIds
}
