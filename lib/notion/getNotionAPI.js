import { Client } from '@notionhq/client' // 加這行，引入新工具

// 舊方法在這裡
export async function getCollectionQuery(collectionId, viewId) {
  try {
    // 這裡放舊的程式碼，先試舊方法
    const response = await fetch('https://www.notion.so/api/v3/queryCollection', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collectionId,
        collectionViewId: viewId,
        // 加你的舊 payload，如果有其他
      })
    });
    if (!response.ok) {
      throw new Error('舊方法失敗');
    }
    return await response.json();
  } catch (error) {
    console.error('舊方法出錯，用新方法試試:', error);
    // 如果舊方法壞了，換新方法
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    const response = await notion.databases.query({
      database_id: collectionId,
    });
    // 把新回應轉成舊格式，讓程式碼繼續用
    return {
      [collectionId]: {
        [viewId]: {
          collection_group_results: {
            blockIds: response.results.map(page => page.id)
          }
        }
      }
    };
  }
}
