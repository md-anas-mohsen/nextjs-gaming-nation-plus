import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import Link from "next/link";

const HomeCard = ({ products }) => {
  return (
    <div className="container my-4">
      <div className="row justify-content-md-center">
        <div className="col col-xs-10">
          <div className="card card-body p-5 text-center">
            <h3 className="pb-4">Your favorite games. All in one place.</h3>
            <div className="row">
              {products.map((product, index) => {
                return <ProductCard key={index} product={product} />;
              })}
            </div>
            <div className="row justify-content-center">
              <div className="col col-3">
                <Link href="/search" passHref>
                  <button className="btn btn-lg bg-light text-primary">
                    View More{" "}
                    <FontAwesomeIcon size="sm" icon={faLongArrowAltRight} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
