import React, { useContext } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Badge, Typography } from "@mui/material";
import logo from "../../constants/images";
import useStyle from "./styles";
import CartContext from "../../store/cart-context";

const Navbar = () => {
  const classes = useStyle();

  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  // console.log(numberOfCartItems);
  return (
    <main className={classes.navbarMain}>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar style={{ background: "#E3EAEA" }}>
          <Typography variant="h6" className={classes.title} color="inherit">
            <img
              src={logo}
              alt="logo"
              height="60px"
              className={classes.image}
              style={{ marginRight: "2rem", color: "inherit" }}
            />
            <p
              style={{
                fontSize: "34px",
                fontWeight: "bold",
                margin: "0 auto",
                color: "#012e11",
                letterSpacing: "0.40rem",

                padding: "0",
              }}
            >
              FIRDAVS
            </p>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.button}>
            <Link to="/cart">
              <IconButton aria-label="Show cart items" color="success">
                <Badge badgeContent={numberOfCartItems} color="primary">
                  <ShoppingCartIcon style={{ fontSize: "36px" }} />
                </Badge>
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </main>
  );
};

export default Navbar;
