import Head from 'next/head'
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Article from '../components/article'

export default function Home(props) {
  console.log(props.topArticles)
  return (
    <MainLayout>
      <Head>
        <title>Simple News</title>
      </Head>

      // Articleコンポーネントを追加
      <div className={styles.main}>
        <Article title="headlines" articles={props.topArticles} />
      </div>
    </MainLayout>
  )
}


export const getStaticProps = async () => {
  // NewsAPIのトップ記事の情報を取得
  const pageSize = 10;
  const topRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=ed4903ec04fd45fda47c5222554eb4ec`
  );
  const topJson = await topRes.json();
  const topArticles = topJson?.articles;

  return {
    props: {
      topArticles,
    },
    revalidate: 60 * 10,
  };
};

