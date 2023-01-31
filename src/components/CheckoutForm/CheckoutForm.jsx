import React, { useRef, useState } from "react";
import classes from "./CheckoutForm.module.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Payment from "./Payment";
/* 
const isNotEmpty = (value) => value.trim().length >= 3;

const isNotEmptyNumber = (value) => value.trim().length >= 10;
const emailIsValid = (value) => value.includes("@"); */

const CheckoutForm = (props) => {
  const [nameInput, setNameInput] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [file, setFile] = useState();
  const [infoInput, setInfoInput] = useState("");
  let formData;
  const [paymentSection, setPaymentSection] = useState(false);

  const form = useRef();
  /* 
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: false,
    email: false,
    number: false,
    info: false,
  }); */

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  /*   const handleUploadClick = () => {
    if (!file) {
      return;
    }

    // 👇 Uploading the file using the fetch API to the server
    fetch("https://firdavs-fa547-default-rtdb.firebaseio.com/userData.json", {
      method: "POST",
      body: JSON.stringify(file),
      // 👇 Set headers manually for single file upload
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };
 */
  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(true);
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);
  const [enteredNumberIsValid, setEnteredNumberIsValid] = useState(true);
  const [enteredInfoIsValid, setEnteredInfoIsValid] = useState(true);
  const sumbitFormHandler = (e) => {
    e.preventDefault();
    setEnteredNameIsValid(nameInput.trim().length !== 0);
    setEnteredNumberIsValid(numberInput.trim().length !== 11);
    setEnteredEmailIsValid(emailInput.includes("@"));
    setEnteredInfoIsValid(infoInput.trim().length > 5);

    props.onConfirm({
      name: nameInput,
      number: numberInput,
      email: emailInput,
      info: infoInput,
    });

    console.log(formData);

    const sendEmail = () => {
      emailjs
        .sendForm(
          "service_fyhukkw",
          "template_5d7m9r8",
          form.current,
          "L44z88kRkpNXC22sl"
        )
        .then(
          (result) => {
            console.log(result);
          },
          (error) => {
            console.log(error.text);
          }
        );
      console.log(form.current);
    };
    sendEmail();

    console.log(formData);
    /*     setFormInputsValidity({
      name: enteredNameIsValid,
      email: enteredEmailIsValid,
      number: enteredNumberIsValid,
      info: enteredInfoIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredEmailIsValid &&
      enteredNumberIsValid &&
      enteredInfoIsValid &&
      numberIsValid; */

    /* if (!formIsValid) {
      <p>Please fill in first</p>;
      return;
    } */
    setPaymentSection(true);
  };
  return (
    <div className={classes.toolbar}>
      {!paymentSection && (
        <>
          <div className={classes.mainCheckout}>
            <h1>Checkout</h1>
            <h2>Iltimos, quyidagi formaga kerakli ma'lumotlarni kiriting</h2>
          </div>
          <div className={classes.inputForm}>
            <form
              onSubmit={sumbitFormHandler}
              ref={form}
              className={classes.form}
            >
              <div className={classes.control}>
                <label htmlFor="name">Ism</label>
                <input
                  value={nameInput}
                  onChange={(event) => {
                    setNameInput(event.target.value);
                  }}
                  type="text"
                  id="name"
                  name="name"
                />
                {!enteredNameIsValid && <p>Please enter a valid name</p>}
              </div>
              <div className={classes.control}>
                <label htmlFor="number">Telefon raqam</label>
                <input
                  value={numberInput}
                  onChange={(event) => {
                    setNumberInput(event.target.value);
                  }}
                  type="tel"
                  id="number"
                  name="number"
                />
                {/*   {!enteredNumberIsValid && (
                  <p>Please enter a valid phone number</p>
                )} */}
              </div>
              <div className={classes.control}>
                <label htmlFor="email">Email</label>
                <input
                  value={emailInput}
                  onChange={(event) => {
                    setEmailInput(event.target.value);
                  }}
                  type="email"
                  id="email"
                  name="email"
                />
                {!enteredEmailIsValid && <p>Please enter a valid email</p>}
              </div>

              <div className={classes.control}>
                <div className={classes.controlImg}>
                  <label htmlFor="address">Manzil</label>
                  <div
                    className={classes.imgload}
                    style={{
                      marginLeft: "0.25rem",
                      marginTop: "0.25rem",
                    }}
                  >
                    <AddAPhotoIcon />
                    <input
                      onChange={handleFileChange}
                      type="file"
                      id="address"
                      name="address"
                      accept=".jpg, .jpeg, .png"
                      style={{ display: "none" }}
                    />

                    <div>{file && `${file.name} - ${file.type}`}</div>
                  </div>
                </div>
              </div>
              <div className={classes.control}>
                <label htmlFor="additional">
                  Izoh (manzilni to'liqlashtirish)
                </label>
                <input
                  value={infoInput}
                  onChange={(event) => {
                    setInfoInput(event.target.value);
                  }}
                  type="text"
                  id="additional"
                  name="additional"
                />
                {!enteredInfoIsValid && <p>Please</p>}
              </div>
              <div className={classes.act}>
                <Link to="/cart">
                  <button className={classes.reset} type="reset">
                    Bekor qilish
                  </button>
                </Link>

                <button
                  className={classes.btnDis}
                  disabled={
                    nameInput.length < 3 ||
                    !emailInput.includes("@") ||
                    infoInput.length < 5 ||
                    numberInput.length < 11
                      ? true
                      : false
                  }
                  type="submit"
                >
                  Xarid qilish
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      {paymentSection && <Payment />}
    </div>
  );
};

export default CheckoutForm;
