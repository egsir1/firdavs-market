import React, { useContext } from "react";
import classes from "./CartNavbar.module.css";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import CartContext from "../store/cart-context";
import { Link } from "react-router-dom";

const CartNavbar = () => {
  const cartCtx = useContext(CartContext);
  const updatePage = () => {
    window.location.reload();
  };

  return (
    <div className={classes.mainCart}>
      <Link to="/">
        <div className={classes.arrowLeft} style={{ color: "white" }}>
          <KeyboardDoubleArrowLeftIcon style={{ fontWeight: "bold" }} />
        </div>
      </Link>
      <div className={classes.cartTitle}>
        <h2>Mening savatcham</h2>
      </div>
      <div onClick={updatePage} className={classes.cartDelete}>
        {cartCtx.items.length !== 0 && <DeleteSweepIcon />}
      </div>
    </div>
  );
};

export default CartNavbar;
