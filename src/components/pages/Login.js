import React from "react";
import { Link } from "react-router-dom";
import loginImage from "../../assets/login.svg";
import classes from "../../styles/Login.module.css";
import Button from "../Button";
import Form from "../Form";
import Illustration from "../Illustration";
import TextInput from "../TextInput";

export default function Login() {
  return (
    <>
      <h1>Login to your account</h1>
      <div className="column">
        <Illustration image={loginImage} />

        <Form className={classes.login}>
          <TextInput
            placeholder="Enter Email"
            type="text"
            icon="alternate_email"
          />
          <TextInput placeholder="Enter Password" type="password" icon="lock" />
          <Button>
            <span> Submit now </span>
          </Button>
          <div className="info">
            Don't have an account? <Link to="/signup">Signup</Link> instead.
          </div>
        </Form>
      </div>
    </>
  );
}
