import BLOG from "@/blog.config";

export default function getAllPageIds(collectionQuery, collectionId, collectionView, viewIds) {
  if (!collectionQuery || !collectionId) {
    console.warn('Invalid input: collectionQuery or collectionId is missing');
    return [];
  }

  let pageIds = [];
  try {
    // Notion数据库中的第几个视图用于站点展示和排序：
    const groupIndex = Number(BLOG.NOTION_INDEX) || 0;
    if (Array.isArray(viewIds) && viewIds.length > 0 && groupIndex >= 0 && groupIndex < viewIds.length) {
      const ids = collectionQuery[collectionId][viewIds[groupIndex]]?.collection_group_results?.blockIds || [];
      pageIds.push(...ids); // 使用展开运算符更简洁
    }
  } catch (error) {
    console.error('Error fetching page IDs:', error);
    return [];
  }

  // 否则按照数据库原始排序
  if (pageIds.length === 0 && collectionQuery[collectionId]) {
    const pageSet = new Set();
    Object.values(collectionQuery[collectionId] || {}).forEach(view => {
      if (view && typeof view === 'object') {
        view?.blockIds?.forEach(id => pageSet.add(id)); // group视图
        view?.collection_group_results?.blockIds?.forEach(id => pageSet.add(id)); // table视图
      }
    });
    pageIds = [...pageSet];
    // console.log('PageIds: 从collectionQuery获取', collectionQuery, pageIds.length)
  }

  if (pageIds.length === 0) {
    console.warn('No page IDs found for collection:', collectionId);
  }

  return pageIds;
}
