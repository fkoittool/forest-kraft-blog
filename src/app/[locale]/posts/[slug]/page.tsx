import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export const postsDirectory = path.join(process.cwd(), 'content/posts');

export async function generateStaticParams() {
  const locales = fs.readdirSync(postsDirectory);
  const allPaths = locales.flatMap((locale) => {
    const localePostsPath = path.join(postsDirectory, locale);
    if (!fs.statSync(localePostsPath).isDirectory()) {
      return [];
    }
    const fileNames = fs.readdirSync(localePostsPath);
    return fileNames.map((fileName) => ({
      locale,
      slug: fileName.replace(/\.md$/, ''),
    }));
  });

  return allPaths;
}

interface Post{
    title: string,
    date: string,
    contentHtml: string
}

export async function getPostData(locale: string, slug: string) {
  const fullPath = path.join(postsDirectory, locale, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const post :Post = {
    ...matterResult.data,
    title: matterResult.data.title,
    date: matterResult.data.date.toLocaleString(),
    contentHtml: contentHtml,
  }
  return post;
}

interface Props {
  params: Promise<{
    locale: string,
    slug: string
  }>;
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  const postData = await getPostData(locale, slug);
  return (
    <article>
      <h1>{postData.title}</h1>
      <div>{postData.date}</div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}
