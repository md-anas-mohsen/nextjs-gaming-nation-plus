import Banner from "../components/Banner/Banner";
import styles from "../styles/Home.module.css";
import { client } from "../utils/shopify";
import HomeCard from "../components/HomeCard/HomeCard";
import Layout from "../components/Layout/Layout";

export default function Home({ products }) {
  return (
    <div className={styles.App}>
      <Layout>
        <main>
          <Banner description="Gaming Never Stops" />
          <HomeCard products={products} />
        </main>
      </Layout>
    </div>
  );
}

export const getServerSideProps = async () => {
  const products = await client.product.fetchAll(4);
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};
