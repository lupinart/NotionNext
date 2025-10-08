import BLOG from '@/blog.config'

export default function getAllPageIds(collectionQuery, collectionId, collectionView, viewIds) {
  if (!collectionQuery && !collectionView) {
    return []
  }

  let pageIds = []

  try {
    const groupIndex = BLOG.NOTION_INDEX || 0

    if (viewIds && viewIds.length > 0) {
      const view = collectionQuery[collectionId][viewIds[groupIndex]]

      // 嘗試不同格式
      const ids =
        view?.blockIds ||
        view?.result?.blockIds ||
        view?.collection_group_results?.blockIds ||
        []

      if (Array.isArray(ids)) {
        pageIds.push(...ids)
      }
    }
  } catch (error) {
    console.error('⚠️ Error fetching page IDs:', error)
    return []
  }

  // 如果還是空的，兜底處理所有 view
  if (pageIds.length === 0 && collectionQuery && Object.values(collectionQuery).length > 0) {
    const pageSet = new Set()
    Object.values(collectionQuery[collectionId]).forEach(view => {
      view?.blockIds?.forEach(id => pageSet.add(id))
      view?.result?.blockIds?.forEach(id => pageSet.add(id))
      view?.collection_group_results?.blockIds?.forEach(id => pageSet.add(id))
    })
    pageIds = [...pageSet]
  }

  return pageIds
}
