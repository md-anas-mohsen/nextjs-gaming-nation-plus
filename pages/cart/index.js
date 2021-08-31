import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { AppContext } from "../../context/AppContext";

const Item = ({ item, deleteFromCart }) => {
  return (
    <li className="item">
      <div className="item-main cf">
        <div className="item-block ib-info cf">
          <img className="product-img" src={item.variant.image.src} />
          <div className="ib-info-meta">
            <span className="title">{item.title}</span>
            <span className="itemno">
              #{window.atob(item.variant.product.id).split("/")[4]}
            </span>
          </div>
        </div>
        <div className="item-block ib-qty">
          <input disabled type="text" value={item.quantity} className="qty" />
          <span className="price">
            <span>x</span> ${item.variant.price}
          </span>
        </div>
        <div className="item-block ib-total-price">
          <span className="tp-price">
            ${(item.quantity * item.variant.price).toFixed(2)}
          </span>
          <span className="tp-remove" onClick={() => deleteFromCart(item.id)}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </span>
        </div>
      </div>
    </li>
  );
};

const Cart = () => {
  const { cart, deleteFromCart } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log(cart);
    setItems(cart?.lineItems);
    setLoading(false);
  }, [cart]);

  return (
    <Layout title="Cart">
      <div className="container my-5">
        <div className="col col-10">
          <div className="card card-body">
            <div className="wrap">
              <header
                className="cart-header cf"
                style={{ border: items.length === 0 && !loading && "none" }}
              >
                <strong>
                  {items && items.length === 1 && !loading
                    ? `1 Item in Your Cart`
                    : items && items.length > 1 && !loading
                    ? `${items.length} Items in Your Cart`
                    : items && items.length === 0 && !loading
                    ? "No Items in Cart"
                    : ""}
                </strong>
              </header>
              <div
                className="cart-table"
                style={{ border: items.length === 0 && !loading && "none" }}
              >
                <ul>
                  {items &&
                    deleteFromCart &&
                    items.map((item, i) => (
                      <Item
                        key={i}
                        item={item}
                        deleteFromCart={deleteFromCart}
                      />
                    ))}
                </ul>
              </div>
              {cart && items && items.length > 0 && !loading && (
                <div className="cart-footer cf">
                  <Link href={cart.webUrl} passHref>
                    <button className="btn">Checkout</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
