import { useContext, useEffect, useState } from "react";
import Cart from "./components/Cart/Cart";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Product/Products";
import CartProvider from "./store/CartProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CartNavbar from "./components/CartNavbar";
import CheckoutForm from "./components/CheckoutForm/CheckoutForm";
import Payment from "./components/CheckoutForm/Payment";
import CartContext from "./store/cart-context";

function App() {
  const [marketProducts, setMarketProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([]);

  const cartCtx = useContext(CartContext);
  console.log(cartCtx.items, "data");
  useEffect(() => {
    fetch("https://firdavs-fa547-default-rtdb.firebaseio.com/products.json")
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        const productData = [];

        for (const key in responseData) {
          productData.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
            image: responseData[key].image,
          });
        }
        setMarketProducts(productData);
        setIsLoading(false);
      });
  }, []);

  const submitOrderHandler = (userData) => {
    setUser({ ...userData, user });
    /* fetch("https://firdavs-fa547-default-rtdb.firebaseio.com/userData.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
      headers: { "Content-Type": "application/json" },
    });*/
    console.log(cartCtx.items, "hello");
  };

  return (
    <Router>
      <CartProvider>
        <Switch>
          <Route exact path="/">
            <Navbar />
            <Products marketProducts={marketProducts} isLoading={isLoading} />
          </Route>
          <Route exact path="/cart">
            <CartNavbar />
            <Cart cart={user} />
          </Route>
          <Route exact path="/cart/checkout">
            <CheckoutForm onConfirm={submitOrderHandler} />
          </Route>
          <Route exact path="/payment">
            <Payment />
          </Route>
        </Switch>
      </CartProvider>
    </Router>
  );
}

export default App;
