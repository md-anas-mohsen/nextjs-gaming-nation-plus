import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import Layout from "../../components/Layout/Layout";
import ProductCard from "../../components/ProductCard/ProductCard";
import { client } from "../../utils/shopify";

const Search = ({ products, platforms, collections }) => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [platform, setPlatform] = useState("");
  const [searched, setSearched] = useState(false);
  const [collection, setCollection] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const resPerPage = 8;

  useEffect(() => {
    // console.log(resPerPage * (page - 1));
    // setFilteredProducts((prev) =>
    //   prev.slice(resPerPage * (page - 1), resPerPage * page)
    // );
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = async (e) => {
    e.preventDefault();
    let products = [];
    if (collection) {
      collections.forEach((coll) => {
        if (coll.handle === collection.toLowerCase()) products = coll.products;
      });
    } else {
      products = await client.product.fetchAll();
    }
    const filtered = products.filter(
      (product) =>
        product.productType.includes(platform) &&
        product.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredProducts(JSON.parse(JSON.stringify(filtered)));
    setPage(1);
  };

  return (
    <Layout>
      <div className="container my-5 text-center">
        <div className="row">
          <div className="col col-xs-10">
            <div className="card card-body p-5">
              <div className="search-controls row mb-4">
                <form onSubmit={handleSearch}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Title"
                        onChange={(e) => setKeyword(e.target.value)}
                      />
                    </div>
                    <div className="col-md-2">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => setPlatform(e.target.value)}
                        defaultValue=""
                      >
                        <option value="">All Platforms</option>
                        {platforms.map((platform, index) => (
                          <option key={index} value={platform}>
                            {platform}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-2">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        defaultValue=""
                        onChange={(e) => setCollection(e.target.value)}
                      >
                        <option value="">All Categories</option>
                        {collections.map((collection) => (
                          <option key={collection.id} value={collection.handle}>
                            {collection.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-2">
                      <button className="btn btn-primary" type="submit">
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="row">
                {filteredProducts
                  .slice(resPerPage * (page - 1), resPerPage * page)
                  .map((product, index) => {
                    return <ProductCard key={index} product={product} />;
                  })}
              </div>
              <div className="row">
                <Pagination
                  activePage={page}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={filteredProducts.length}
                  pageRangeDisplayed={5}
                  onChange={(e) => setPage(e)}
                  innerClass="pagination justify-content-center"
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const resPerPage = 8;
  const products = await client.product.fetchAll();
  const collections = await client.collection.fetchAllWithProducts();
  let platforms = [];
  products.forEach((product) =>
    !platforms.includes(product.productType)
      ? platforms.push(product.productType)
      : null
  );
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      platforms: JSON.parse(JSON.stringify(platforms)),
      collections: JSON.parse(JSON.stringify(collections)),
    },
  };
};

export default Search;
