'use client';

import { useTranslations } from 'next-intl';
import PostList from './PostList';
import { ArticleInfo } from '@/app/[locale]/page';

export default function HomePage({ locale, articles }: { locale: string, articles: ArticleInfo[]}) {
  const t = useTranslations('Home');


  return (
    <main className="flex-1">
      <div className="mb-8">
        <div className="@[480px]:p-0">
          <div
            className="flex min-h-[300px] md:min-h-[400px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 rounded-lg items-center justify-center p-4"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuC1Ia-JEXY97tEkJdh2okNRGN4iXt_yzKgq06NxO62wL6SgaXHkg2IzO8gTp29PbjQHtYaQNCxTRGZPLC7NO8qg9Nexp_BVmAm0ftsmPacxDO0LQWTwxkHATBU9IK15BsFro-TTp1AW2Wyda15q8aZxG2XUG9lbtovF6G5vj-AQT2m-3nRDX-6mx1_UdKpCBxvKt_eBTUyy3jSHHuKnk3PYMJKCmBlI-S2nlRUSKAlNam6MkZu6dZMQ5ZsfQdPxAKTSvhC1mkY0Svdf")'
            }}
          >
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
                {t('title')}
              </h1>
              <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base">
                {t('description')}
              </h2>
            </div>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-accent hover:bg-accent/90 text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base">
              <span className="truncate">home</span>
            </button>
          </div>
        </div>
      </div>
      <PostList articles={articles} />
    </main>
  );
}
