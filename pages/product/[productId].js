/* eslint-disable @next/next/no-img-element */
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { client } from "../../utils/shopify";
import { Parser } from "html-to-react";
import { AppContext } from "../../context/AppContext";

const Product = ({ product }) => {
  const router = useRouter();
  const { productId } = router.query;

  const { cart, addToCart } = useContext(AppContext);

  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState("");

  const addToCartHandler = async () => {
    addToCart(variant, quantity);
  };

  useEffect(() => {
    setVariant(product.variants[0].id);
  }, [product]);

  return (
    <Layout title={product.title} description={product.description}>
      <div className="container my-5">
        <div className="product-image">
          <div
            id="carouselExampleSlidesOnly"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                {product.images.map((image, i) => (
                  <img
                    className="d-block w-100"
                    key={i}
                    src={image.src}
                    alt=""
                  />
                ))}
              </div>
            </div>
          </div>
          {/* <Image
            src="https://www.jerecho.com/codepen/nike-product-page/nikeLogo.png"
            alt=""
            className="product-logo"
            width="100%"
            height="100%"
          />
          <Image
            src="https://www.jerecho.com/codepen/nike-product-page/nikeShoe.png"
            alt=""
            className="product-pic"
            width="100%"
            height="100%"
          />
          <div className="dots">
            <a href="#!" className="active">
              <i>1</i>
            </a>
            <a href="#!">
              <i>2</i>
            </a>
            <a href="#!">
              <i>3</i>
            </a>
            <a href="#!">
              <i>4</i>
            </a>
          </div> */}
        </div>

        <div className="product-details shadow-lg">
          <header>
            <h1 className="title">{product.title}</h1>
            <span className="colorCat">{product.productType}</span>
            <div className="price">
              {product.variants.map((variant, i) => (
                <span key={i} className="current">
                  ${variant.price}
                </span>
              ))}
            </div>
          </header>
          <article>
            <h5>Description</h5>
            <p>{Parser().parse(product.descriptionHtml)}</p>
          </article>
          <div className="controls">
            {/* <div className="color">
              <h5>color</h5>
              <ul>
                <li>
                  <a href="#!" className="colors color-bdot1 active"></a>
                </li>
                <li>
                  <a href="#!" className="colors color-bdot2"></a>
                </li>
                <li>
                  <a href="#!" className="colors color-bdot3"></a>
                </li>
                <li>
                  <a href="#!" className="colors color-bdot4"></a>
                </li>
                <li>
                  <a href="#!" className="colors color-bdot5"></a>
                </li>
              </ul>
            </div>
            <div className="size">
              <h5>size</h5>
              <a href="#!" className="option">
                (UK 8)
              </a>
            </div> */}
            <div className="qty">
              <h5>quantity</h5>
              <input
                className="form-control w-25 mt-2"
                type="number"
                placeholder="Quantity"
                value={quantity <= 0 ? 1 : quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>
          <div className="footer">
            <button type="button" onClick={addToCartHandler}>
              <FontAwesomeIcon
                style={{ color: "#fff" }}
                size="lg"
                icon={faShoppingCart}
              />
              <span>add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }) => {
  const productId = query.productId;
  const product = await client.product.fetch(productId);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
};

export default Product;
