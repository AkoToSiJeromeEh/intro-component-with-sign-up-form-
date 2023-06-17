import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import GreeatingsComp from "./Greetings";
import "../style/Main.css";

function IntroComponent(props) {
  const [toggle, setToggle] = useState(false);

  const ValidateInput = yup.object().shape({
    firstName: yup
      .string()
      .required("First Name cannot be empty")
      .matches(
        /^[A-Za-z]+$/,
        "First Name should contain only letter characters " 
      ),
    lastName: yup
      .string()
      .required("Last Name cannot be empty")
      .matches(
        /^[A-Za-z]+$/,
        "Last Name should contain only letter characters"
      ),
    email: yup
      .string()
      .required("Email cannot be empty")
      .email("Looks like this is not an email"),
    password: yup
      .string()
      .required("Password cannot be empty")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,25}$/,
        "Weak Password."
      )
      .min(5)
      .max(25),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords do not match")
      .required("Confirm Password cannot be empty"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ValidateInput),
  });

  const onSubmit = (data) => {
    if (Object.keys(errors).length === 0) {
      console.log(data);
      setToggle(true);
    } else {
      setToggle(false);
    }
  };

  return (
    <>
      <section
        className={!toggle ? "IntroComp--Section" : "IntroComp--Section hide"}
      >
        <div className="Intro--Wrapper">
          <div className="Intro--Contents--Container">
            <h1>{props.FTrialTitle}</h1>
            <p>{props.FTrialintroDescription}</p>
          </div>
          <div className="Intro--Form--Container">
            <div className="Trial--Contents--Cont">
              <span>Try it free {props.FtrialExperience} days then </span>
              <span>
                <span className="price">${props.FtrialPrice}</span>
                /mo.thereafter
              </span>
            </div>
            <div className="Form--Container">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  className={errors.firstName ? "redborder" : ""}
                  type="text"
                  placeholder="First Name"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <img className="err-img-1" src="icon-error.svg" alt="" />
                )}
                <small className="err-1">{errors.firstName?.message}</small>
                <input
                  className={errors.lastName ? "redborder" : ""}
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <img className="err-img-2" src="icon-error.svg" alt="" />
                )}
                <small className="err-2">{errors.lastName?.message}</small>
                <input
                  className={errors.email ? "redborder" : ""}
                  type="text"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <img className="err-img-3" src="icon-error.svg" alt="" />
                )}
                <small className="err-3">{errors.email?.message}</small>
                <input
                  className={errors.password ? "redborder" : ""}
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <img className="err-img-4" src="icon-error.svg" alt="" />
                )}
                <small className="err-4">{errors.password?.message}</small>
                <input
                  className={errors.confirmPassword ? "redborder" : ""}
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <img className="err-img-5" src="icon-error.svg" alt="" />
                )}
                <small className="err-5">
                  {errors.confirmPassword?.message}
                </small>
                <button>{props.FtrialButtonCont}</button>
                <p>
                  By clicking the button you are agreeing to our{" "}
                  <span>Terms and Services</span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      {toggle && <GreeatingsComp />}
    </>
  );
}

IntroComponent.propTypes = {
  FTrialTitle: PropTypes.string.isRequired,
  FTrialintroDescription: PropTypes.string.isRequired,
  FtrialExperience: PropTypes.number.isRequired,
  FtrialButtonCont: PropTypes.string.isRequired,
  FtrialPrice: PropTypes.number.isRequired,
};

export default IntroComponent;
