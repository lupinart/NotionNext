import BLOG from "@/blog.config";

export default function getAllPageIds(collectionQuery, collectionId, collectionView, viewIds) {
  if (!collectionQuery || !collectionId) {
    console.warn('Invalid input: collectionQuery or collectionId is missing');
    return [];
  }

  let pageIds = [];
  try {
    // Notion 數據庫中的第幾個視圖用於展示和排序
    const groupIndex = Number(BLOG.NOTION_INDEX) || 0;
    if (Array.isArray(viewIds) && viewIds.length > 0 && groupIndex >= 0 && groupIndex < viewIds.length) {
      const ids = collectionQuery[collectionId][viewIds[groupIndex]]?.collection_group_results?.blockIds || [];
      pageIds.push(...ids); // 使用展開運算符更簡潔
    }
  } catch (error) {
    console.error('Error fetching page IDs:', error);
    return [];
  }

  // 後備邏輯：從 collectionQuery 獲取所有頁面 ID
  if (pageIds.length === 0 && collectionQuery[collectionId]) {
    const pageSet = new Set();
    Object.values(collectionQuery[collectionId] || {}).forEach(view => {
      if (view && typeof view === 'object') {
        view.blockIds?.forEach(id => pageSet.add(id)); // group 視圖
        view.collection_group_results?.blockIds?.forEach(id => pageSet.add(id)); // table 視圖
      }
    });
    pageIds = [...pageSet];
  }

  if (pageIds.length === 0) {
    console.warn('No page IDs found for collection:', collectionId);
  }
