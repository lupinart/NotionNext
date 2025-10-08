import BLOG from '@/blog.config'

export default function getAllPageIds (collectionQuery, collectionId, collectionView, viewIds) {
  if (!collectionQuery || !collectionId) {
    console.warn('Invalid input: collectionQuery or collectionId is missing')
    return []
  }

  let pageIds = []
  try {
    // Notion数据库中的第几个视图用于站点展示和排序：
    const groupIndex = Number(BLOG.NOTION_INDEX) || 0
    if (Array.isArray(viewIds) && viewIds.length > 0 && groupIndex < viewIds.length) {
      const ids = collectionQuery?.[collectionId]?.[viewIds[groupIndex]]?.collection_group_results?.blockIds || []
      if (Array.isArray(ids)) {
        pageIds.push(...ids)
      }
    }
  } catch (error) {
    console.error('Error fetching page IDs:', error)
    return []
  }

  // 否则按照数据库原始排序
  if (pageIds.length === 0 && collectionQuery[collectionId]) {
    const pageSet = new Set()
    Object.values(collectionQuery[collectionId] || {}).forEach(view => {
      if (view && typeof view === 'object') {
        if (Array.isArray(view.blockIds)) {
          view.blockIds.forEach(id => pageSet.add(id))
        }
        if (Array.isArray(view.collection_group_results?.blockIds)) {
          view.collection_group_results.blockIds.forEach(id => pageSet.add(id))
        }
      }
    })
    pageIds = [...pageSet]
  }

  return pageIds
}
