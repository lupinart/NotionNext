import BLOG from "@/blog.config";

export default function getAllPageIds(collectionQuery, collectionId, collectionView, viewIds) {
  if (!collectionQuery || !collectionId) {
    console.warn('Invalid input: collectionQuery or collectionId is missing');
    return [];
  }

  let pageIds = [];
  try {
    const groupIndex = Number(BLOG.NOTION_INDEX) || 0;
    if (Array.isArray(viewIds) && viewIds.length > 0 && groupIndex >= 0 && groupIndex < viewIds.length) {
      const ids = collectionQuery[collectionId][viewIds[groupIndex]]?.collection_group_results?.blockIds || [];
      pageIds.push(...ids);
    }
  } catch (error) {
    console.error('Error fetching page IDs:', error);
    return [];
  }

  if (pageIds.length === 0 && collectionQuery[collectionId]) {
    const pageSet = new Set();
    Object.values(collectionQuery[collectionId] || {}).forEach(view => {
      if (view && typeof view === 'object') {
        view.blockIds?.forEach(id => pageSet.add(id));
        view.collection_group_results?.blockIds?.forEach(id => pageSet.add(id));
      }
    });
    pageIds = [...pageSet];
  }

  if (pageIds.length === 0) {
    console.warn('No page IDs found for collection:', collectionId);
  }

  return pageIds;
}
