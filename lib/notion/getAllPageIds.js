import BLOG from "@/blog.config";

export default function getAllPageIds(collectionQuery, collectionId, collectionView, viewIds) {
  if (!collectionQuery && !collectionView) {
    return [];
  }
  let pageIds = [];
  try {
    // Notion数据库中的第几个视图用于站点展示和排序：
    const groupIndex = typeof BLOG.NOTION_INDEX === 'number' ? BLOG.NOTION_INDEX : 0;
    if (viewIds && Array.isArray(viewIds) && viewIds.length > 0) {
      const viewId = viewIds[groupIndex];
      const ids = collectionQuery[collectionId]?.[viewId]?.collection_group_results?.blockIds || [];
      pageIds.push(...ids); // 使用展開運算符更簡潔
    }
  } catch (error) {
    console.error('Error fetching page IDs:', error); // 移除未定義的 ids
    return [];
  }

  // 否则按照数据库原始排序
  if (pageIds.length === 0 && collectionQuery && Object.values(collectionQuery).length > 0) {
    const pageSet = new Set();
    Object.values(collectionQuery[collectionId] || {}).forEach(view => {
      if (view && typeof view === 'object') {
        view?.blockIds?.forEach(id => pageSet.add(id)); // group视图
        view?.collection_group_results?.blockIds?.forEach(id => pageSet.add(id)); // table视图
      }
    });
    pageIds = [...pageSet];
    // console.log('PageIds: 从collectionQuery获取', collectionQuery, pageIds.length);
  }
  return pageIds;
}
