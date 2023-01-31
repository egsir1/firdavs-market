import React, { useContext } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useStyles from "./styles";
import CartContext from "../../store/cart-context";
const Product = ({ product, isLoading }) => {
  const classes = useStyles();
  // console.log(product);

  const cartCtx = useContext(CartContext);

  /*   useEffect(() => {
    const pushProducts = (items) => {
      fetch(
        "https://firdavs-fa547-default-rtdb.firebaseio.com/cartProducts.json",
        {
          method: "POST",
          body: JSON.stringify(cartCtx.items),
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          setUserCartProducts((prev) => [
            ...prev,
            { id: responseData.id, ...items },
          ]);
        });
    };
  }, [cartCtx.items]); */

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: product.id,
      name: product.name,
      amount: 1,
      price: product.price,
      image: product.image,
    });
    console.log(product.amount);
  };
  /* 
  useEffect(() => {
    fetch("https://firdavs-fa547-default-rtdb.firebaseio.com/cartProducts.json")
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        const newProducts = [];

        for (const key in responseData) {
          newProducts.push({
            id: responseData[key].id,
            title: responseData[key].name,
            amount: responseData[key].amount,
          });
        }
        setUserCartProducts(newProducts);
        console.log("888");
      });
  }, []); */
  return (
    <Card className={classes.root} onClick={() => console.log("clicked")}>
      <CardMedia
        className={classes.media}
        image={product.image}
        title={product.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6">₩ {product.price}</Typography>
        </div>
        <Typography variant="body4" color="textSecondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions
        onClick={addToCartHandler}
        disableSpacing
        style={{ backgroundColor: "#09bf06", color: "white" }}
        className={classes.cardActions}
      >
        <h3 style={{ margin: "auto" }}>Xarid qilish</h3>
        <IconButton
          className="cartBtn"
          style={{ color: "white" }}
          aria-label="Add to Cart"
        >
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
