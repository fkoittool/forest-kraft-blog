import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArticleInfo } from '@/app/[locale]/page';

const PostList = ({ articles }: { articles: ArticleInfo[] }) => {
  const t = useTranslations('Home');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {articles.map((post: ArticleInfo, index: number) => (
        <Link key={`post-${index}`} href={post.url} passHref>
          <div className="flex flex-col gap-3 pb-3 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover"
              data-alt={post.title}
            ></div>
            <div className="p-4">
              <p className="text-base font-bold leading-normal mb-2 text-text-light dark:text-text-dark">{post.title}</p>
              <p className="text-sm font-normal leading-normal text-gray-600 dark:text-gray-400 mb-3">
                {post.description}
              </p>
              <p className="text-xs font-normal leading-normal text-gray-500 dark:text-gray-400">
                {post.date}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostList;
