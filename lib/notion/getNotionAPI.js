import { NotionAPI as NotionLibrary } from 'notion-client'
import { Client } from '@notionhq/client' // 加新工具
import BLOG from '@/blog.config'

let notionAPI = null // 放全局變量，儲存成功的方法

function getNotionAPI() {
  if (notionAPI) return notionAPI; // 如果有，就直接用
  try {
    // 試舊方法
    const api = new NotionLibrary({
      activeUser: BLOG.NOTION_ACTIVE_USER || null,
      authToken: BLOG.NOTION_TOKEN_V2 || null,
      userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      kyOptions: { 
        mode: 'cors',
        hooks: {
          beforeRequest: [
            (request) => {
              const url = request.url.toString()
              if (url.includes('/api/v3/syncRecordValues')) {
                return new Request(
                  url.replace('/api/v3/syncRecordValues', '/api/v3/syncRecordValuesMain'),
                  request
                )
              }
              return request
            }
          ]
        }
      }
    });
    // 測試舊方法能不能用
    api.getPage('你的測試頁面ID'); // 隨便挑一個頁面ID測試
    notionAPI = api; // 如果成功，存下來
  } catch (error) {
    console.error('舊方法壞了，用新方法:', error);
    // 換新方法
    const newApi = new Client({ auth: BLOG.NOTION_TOKEN_V2 || process.env.NOTION_TOKEN });
    notionAPI = newApi; // 存新方法
  }
  return notionAPI;
}

export default getNotionAPI(); // 改成直接呼叫函數
