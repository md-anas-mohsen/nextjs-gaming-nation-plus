import "../styles/globals.css";
import "../styles/Banner.scss";
import "../styles/Product.scss";
import "../styles/Cart.scss";

import { AppProvider } from "../context/AppContext";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
