import { Link } from "react-router-dom";
import signupImage from "../../assets/signup.svg";
import classes from "../../styles/Signup.module.css";
import Button from "../Button";
import Checkbox from "../Checkbox";
import Form from "../Form";
import Illustration from "../Illustration";
import TextInput from "../TextInput";

export default function Signup() {
  return (
    <>
      <h1>Create an account</h1>
      <div className="column">
        <Illustration image={signupImage} />
        <Form className={classes.signup}>
          <TextInput placeholder="Enter Name" type="text" icon="person" />
          <TextInput
            placeholder="Enter Email"
            type="text"
            icon="alternate_email"
          />
          <TextInput placeholder="Enter Password" type="password" icon="lock" />
          <TextInput
            placeholder="Confirm Password"
            type="password"
            icon="lock_clock"
          />
          <Checkbox text="I agree to the Terms &amp; Conditions" />
          <Button>
            <span>Sign Up</span>
          </Button>
          <div className="info">
            Already have an account? <Link to="/login">Login</Link> instead.
          </div>
        </Form>
      </div>
    </>
  );
}
