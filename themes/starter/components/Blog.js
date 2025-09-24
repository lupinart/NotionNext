/* eslint-disable @next/next/no-img-element */
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'

/**
 * 博文列表
 * - headerSlot：可選，用來在標題與說明文字底下插入內容（例如分類膠囊）
 * - posts：文章陣列，是否裁切篇數交給呼叫端（首頁可在外層 slice(0,3)）
 */
export const Blog = ({ posts = [], headerSlot = null }) => {
  return (
    <>
      {/* <!-- ====== Blog Section Start --> */}
      <section className="bg-white pb-10 pt-4 dark:bg-dark lg:pb-20 lg:pt-[30px]">
        <div className='container mx-auto'>
          {/* 區塊標題與說明 */}
          <div className='-mx-4 flex flex-wrap justify-center'>
            <div className='w-full px-4'>
              <div className='mx-auto mb-[60px] max-w-[485px] text-center'>
                <span className='mb-2 block text-lg font-semibold text-primary'>
                  {siteConfig('STARTER_BLOG_TITLE')}
                </span>
                <h2 className='mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]'>
                  {siteConfig('STARTER_BLOG_TEXT_1')}
                </h2>
                <p
                  className='text-base text-body-color dark:text-dark-6'
                  dangerouslySetInnerHTML={{
                    __html: siteConfig('STARTER_BLOG_TEXT_2')
                  }}
                />
                {/* ✅ 可插入分類膠囊等自定內容；會顯示在標題與說明文字之後 */}
                {headerSlot ? <div className='mt-6'>{headerSlot}</div> : null}
              </div>
            </div>
          </div>

          {/* 文章卡片列表 */}
          <div className='-mx-4 flex flex-wrap'>
            {posts.map((item, index) => {
              return (
                <div key={index} className='w-full px-4 md:w-1/2 lg:w-1/3'>
                  <div className='wow fadeInUp group mb-10' data-wow-delay='.1s'>
                    {/* 封面圖 */}
                    <div className='mb-8 overflow-hidden rounded-[5px]'>
                      {item.pageCoverThumbnail && (
                        <SmartLink href={item?.href} className='block'>
                          <img
                            src={item.pageCoverThumbnail}
                            alt={item.title}
                            className='w-full transition group-hover:rotate-6 group-hover:scale-125'
                          />
                        </SmartLink>
                      )}
                    </div>

                    {/* 內容 */}
                    <div>
                      {/* 發佈日（小膠囊） */}
                      {item.publishDay && (
                        <span className='mb-6 inline-block rounded-[5px] bg-primary px-4 py-0.5 text-center text-xs font-medium leading-loose text-white'>
                          {item.publishDay}
                        </span>
                      )}

                      {/* 標題 */}
                      <h3>
                        <SmartLink
                          href={item?.href}
                          className='mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl'
                        >
                          {item.title}
                        </SmartLink>
                      </h3>

                      {/* 摘要 */}
                      {item.summary && (
                        <p className='max-w-[370px] text-base text-body-color dark:text-dark-6'>
                          {item.summary}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      {/* <!-- ====== Blog Section End --> */}
    </>
  )
}
