import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from "./Payment.module.css";
import { Link } from "react-router-dom";

const Payment = () => {
  const cartCtx = useContext(CartContext);

  return (
    <div className={classes.paymentMain}>
      <div className={classes.paymentTitle}>
        <h2>Oxirgi Bosqich</h2>
        <h3>Buyurtma qabul qilindi!</h3>
        <h4>Xaridni to'liq yakunlash uchun to'lovni amalga oshiring</h4>
      </div>
      <div className={classes.paymentContent}>
        <h2>Do'kon hisob raqami:</h2>
        <h3>Alikulov Nodir</h3>
        <h3>302-0914-32-4571 농협 인행</h3>
        <h3>Nonghyop bank</h3>
        <h3>Kodi: 011</h3>
        <h4>To'lov amalga oshirilgach siz bilan bog'lanamiz</h4>
      </div>
      <div className={classes.paymentData}>
        <div className={classes.paymentDetails}>
          <span>Jami: </span>

          {cartCtx.totalAmount >= 100000 ? (
            <span className={classes.amountWon}>₩ {cartCtx.totalAmount}</span>
          ) : (
            <span className={classes.amountWon}>
              ₩ {cartCtx.totalAmount + 3900}
            </span>
          )}
        </div>
      </div>
      <div className={classes.actionss}>
        <Link to="/">
          <button>Bosh sahifaga qaytish</button>
        </Link>
      </div>
    </div>
  );
};

export default Payment;
