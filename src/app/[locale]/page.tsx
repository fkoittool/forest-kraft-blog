import HomePage from "@/components/HomePage";
import { locales } from "@/lib/i18n";
import { postsDirectory } from "./posts/[slug]/page";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Props {
  params: Promise<{ locale: string | undefined}>;
}

export async function generateStaticParams() {
    return locales.map((locale) => ({locale: locale}))
}

export async function getArticlesInfo(target_locale:string | undefined) {
  const locales = fs.readdirSync(postsDirectory);
  const allFileNames = locales.flatMap((locale) => {
    if (locale != target_locale) return [];
    const localePostsPath = path.join(postsDirectory, locale);
    if (!fs.statSync(localePostsPath).isDirectory()) {
      return [];
    }
    const fileNames = fs.readdirSync(localePostsPath);
    return fileNames
  });

  const articlesInfo = allFileNames.map((fileName) =>  getPostInfo(fileName, target_locale)).filter((post) => post!=undefined)
  return articlesInfo;
}

export interface ArticleInfo{
  title: string,
  date: string,
  description: string,
  url: string
}

function getPostInfo(fileName: string, locale: string|undefined): ArticleInfo | undefined{
  if (!locale) return
  const fullPath = path.join(postsDirectory, locale, fileName);
  if (!fs.existsSync(fullPath)) return
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  console.log(matterResult);
  return {
    title: matterResult.data.title,
    date: matterResult.data.date.toLocaleString(),
    description: matterResult.data.description,
    url: locale+'/posts/'+ fileName.replace(/\.md$/, ''),
  }
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const articles = await getArticlesInfo(locale);
  
  if (!locale) return <></>
  return (
    <HomePage locale={locale} articles={articles}/>
  );
}