import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  navbarMain: {
    margin: "3rem",
  },
  appBar: {
    height: "5rem",
    marginBottom: "2rem",

    boxShadow: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  title: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
    textDecoration: "none",
    fontSize: "30px",
  },
  image: {
    borderRadius: "10px",
    margin: "1rem",
    border: "1px solid #dcca87",
  },
  grow: {
    flexGrow: 1,
  },
  cartsize: {
    fontSize: "30px",
  },
}));
