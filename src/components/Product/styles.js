import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  root: {
    marginTop: "2rem",
    maxWidth: "100%",

    cursor: "pointer",
  },
  media: {
    height: "150px",
    marginTop: "0.5rem",

    paddingTop: "56.25%",
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
