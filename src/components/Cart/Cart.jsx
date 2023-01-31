/* import React from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import useStyles from "./CartStyles";

const Cart = ({ cart }) => {
  const classes = useStyles();
  console.log(cart);
  const isEmpty = cart.length === 0;

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      Sizning savatchangiz bo'm-bo'sh!
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <div>{cart[1].name}</div>
          </Grid>
        ))}
      </Grid>
      <div className={classes.cartDetail}>
        <Typography variant="h4">Subtotal: {cart[1].price}</Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3">
        Your Shopping Cart{" "}
      </Typography>
      {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
 */
import React, { useContext, useEffect } from "react";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const data = cartCtx.items;
  let checkout = false;
  //let item = true;
  const { cart } = props;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  console.log(cart, "cart");
  useEffect(() => {
    const senReq = () => {
      fetch("https://firdavs-fa547-default-rtdb.firebaseio.com/userData.json", {
        method: "POST",
        body: JSON.stringify({
          user: cart,
          orderedItems: data,
        }),
        headers: { "Content-Type": "application/json" },
      });
    };
    senReq();
  }, [cart, data]);
  console.log(cartCtx.items, "cartdata");
  const cartItem = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={() => cartItemAddHandler(item)}
        />
      ))}
    </ul>
  );

  const emptyBasket = (
    <div className={classes.emptyBasket}>
      <div className={classes.emptyBasketImg}>
        <img
          src="https://www.getillustrations.com/packs/matilda-startup-illustrations/scenes/_1x/shopping,%20e-commerce%20_%20empty,%20shopping%20cart,%20items,%20products,%20zero,%20none_md.png"
          alt="Empty Basket"
        />
      </div>
      <h2>Savatchangiz bo'sh!</h2>
      <h3>Bozorlik qilib uni to'ldirishingiz mumkin</h3>
      <div className={classes.action}>
        <Link to="/">
          <button>Bozorlik qilish</button>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {cartCtx.items.length && (
        <div className={classes.cartMain}>
          <div className={classes.productName}>{cartItem}</div>
          <div className={classes.billSection}>
            <div className={classes.total}>
              <div>Mahsulot Narxi:</div>
              <div>
                ₩ {cartCtx.items.length !== 0 ? cartCtx.totalAmount : 0}
              </div>
            </div>
            <div className={classes.total}>
              <span>Tekpe:</span>
              <span>₩ {cartCtx.totalAmount >= 100000 ? 0 : 3900}</span>
            </div>
            <div className={classes.totalBill}>
              <h3>
                Jami: ₩ {cartCtx.items.length === 0}
                {cartCtx.totalAmount >= 100000
                  ? cartCtx.totalAmount + 0
                  : cartCtx.items.length !== 0 && cartCtx.totalAmount + 3900}
              </h3>
            </div>
            <div className={classes.actions}>
              <Link to="/">
                <button className={classes["button-alt"]}>Bekor qilish</button>
              </Link>
              <Link to="cart/checkout">
                <button className={classes.button}>Davom etish</button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {cartCtx.items.length === 0 && emptyBasket}
      {checkout && <CheckoutForm />}
    </>
  );
};

export default Cart;
