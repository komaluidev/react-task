import { useEffect, useState } from "react";
import "./LoginForm.css";
const LoginForm = () => {
  const [formSubmitted, setformSubmitted] = useState(false);
  const [samePasswordError, setsamePasswordError] = useState(false);

  const [formLogin, setformLogin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    confirmPassword: "",
    img: "",
  });
  const handleSave = (event) => {
    console.log("::Form Data", formLogin);
    event.preventDefault();
    setformSubmitted(true);
  };

  const handleChange = (event) => {
    console.log(":: handle chnage ", event);
    const value = event.target.value;
    event.preventDefault();
    setformLogin({ ...formLogin, [event.target.name]: value });
  };
  const fromValidation = (name) => {
    return formSubmitted && !formLogin[name] ? (
      <p className="error">This is required</p>
    ) : (
      <></>
    );
  };

  useEffect(() => {
    checkEmailValidity();
    checkSamePass();
  }, [formLogin.email]);

  useEffect(() => {
    checkSamePass();
  }, [formLogin.confirmPassword]);

  const checkSamePass = () => {
    const result = formLogin.password === formLogin.confirmPassword;
    setsamePasswordError(!result);
  };

  const [emailErr, setemailErr] = useState(false);
  const checkEmailValidity = () => {
    const isValid = /\S+@\S+\.\S+/.test(formLogin.email);
    setemailErr(!isValid);
  };
  return (
    <form onSubmit={handleSave} className="centered-container">
      <div className="LoginForm">
        <div>
          <h1>Login Form</h1>

          <label>First Name</label>
          <input
            type="text"
            onChange={handleChange}
            value={formLogin.firstName}
            name="firstName"
            placeholder="first name"
          />

          {fromValidation("firstName")}
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formLogin.lastName}
            onChange={handleChange}
            placeholder="Last name"
          />
          {fromValidation("lastName")}
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formLogin.email}
            placeholder="email@123.com"
          />
          {formSubmitted &&
          emailErr &&
          (!formLogin.email || !/\S+@\S+\.\S+/.test(formLogin.email)) ? (
            <p className="error">Please enter a valid email</p>
          ) : (
            <></>
          )}

          <label>Password</label>
          <input
            type="Password"
            onChange={handleChange}
            value={formLogin.password}
            name="password"
            placeholder="password"
          />
          {fromValidation("password")}
          <label>Confirm Password</label>
          <input
            type="Password"
            onChange={handleChange}
            value={formLogin.confirmPassword}
            name="confirmPassword"
          />
          {fromValidation("confirmPassword")}

          {samePasswordError && <p>Please enter same password</p>}
          <label>Gender</label>
          <select name="gender" onChange={handleChange}>
            <option value="">Selected options</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {fromValidation("gender")}
        </div>
        <button onClick={handleSave}>Save</button>
      </div>
    </form>
  );
};

export default LoginForm;
