import Image from "next/image";
import React from "react";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="col-xs-12 col-sm-6 col-md-3 my-3">
      <div className="">
        <Image
          width="100%"
          height="100%"
          objectFit="contain"
          className="card-img-top mx-auto"
          src={product.images[0].src}
          alt=""
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link href={`/product/${product.id}`}>{product.title}</Link>
          </h5>
          {/* <div className="ratings mt-auto">
            <div className="rating-outer">
              <div className="rating-inner"></div>
            </div>
            <span id="no_of_reviews">(5 Reviews)</span>
          </div> */}
          {product.variants.map((variant, index) => (
            <p key={index} className="card-text">
              ${variant.price}
            </p>
          ))}
          {/* <a href="#" id="view_btn" className="btn btn-block">
            View Details
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
