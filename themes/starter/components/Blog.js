/* eslint-disable @next/next/no-img-element */
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'

/**
 * 博文列表
 * @param posts
 * @param headerSlot 會插在標題區塊正下方（用來放分類膠囊等）
 * @param showHeader 是否顯示內建標題（預設 true）
 */
export const Blog = ({ posts, headerSlot, showHeader = true }) => {
  return (
    <>
      {/* <!-- ====== Blog Section Start --> */}
      <section className='bg-white pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]'>
        <div className='container mx-auto'>

          {/* 區塊標題 */}
          {showHeader && (
            <div className='-mx-4 flex flex-wrap justify-center'>
              <div className='w-full px-4'>
                <div className='mx-auto mb-6 max-w-[485px] text-center'>
                  <span className='mb-2 block text-lg font-semibold text-primary'>
                    {siteConfig('STARTER_BLOG_TITLE')}
                  </span>
                  <h2 className='mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]'>
                    {siteConfig('STARTER_BLOG_TEXT_1')}
                  </h2>
                  <p
                    dangerouslySetInnerHTML={{ __html: siteConfig('STARTER_BLOG_TEXT_2') }}
                    className='text-base text-body-color dark:text-dark-6'
                  />
                </div>
              </div>
            </div>
          )}

          {/* 🔽 標題正下方：自訂插槽（放分類膠囊等） */}
          {headerSlot && (
            <div className='-mx-4 flex flex-wrap justify-center mb-8'>
              <div className='w-full px-4 flex justify-center'>
                {headerSlot}
              </div>
            </div>
          )}

          {/* 博客列表 */}
          <div className='-mx-4 flex flex-wrap'>
            {posts?.map((item, index) => (
              <div key={index} className='w-full px-4 md:w-1/2 lg:w-1/3'>
                <div className='wow fadeInUp group mb-10' data-wow-delay='.1s'>
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
                  <div>
                    <span className='mb-6 inline-block rounded-[5px] bg-primary px-4 py-0.5 text-center text-xs font-medium leading-loose text-white'>
                      {item.publishDay}
                    </span>
                    <h3>
                      <SmartLink
                        href={item?.href}
                        className='mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl'>
                        {item.title}
                      </SmartLink>
                    </h3>
                    <p className='max-w-[370px] text-base text-body-color dark:text-dark-6'>
                      {item.summary}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
      {/* <!-- ====== Blog Section End --> */}
    </>
  )
}
