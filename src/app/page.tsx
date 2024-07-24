import getArticles from '@/api/get-articles';
import Image from 'next/image';

export default async function Home() {
  // const _data = await getArticles();
  // if (!_data?.success) {
  //   throw 'error';
  // }

  // const { success, data: articles } = _data;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      text
      {/* {articles.data.map((article) => {
        return (
          <div key={article.id}>
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src={article.attributes.banner.data.attributes.url}
              alt={article.attributes.banner.data.attributes.name}
              width={180}
              height={37}
              priority
            />
            <div>{article.attributes.title}</div>;
          </div>
        );
      })} */}
    </main>
  );
}
