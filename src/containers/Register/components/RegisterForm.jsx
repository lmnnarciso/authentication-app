import React, { PureComponent } from "react";
import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import { Link, Redirect } from "react-router-dom";
import CheckBox from "../../../shared/components/form/CheckBox";
import axios from "axios";
import { isAuthenticated } from "../../../auth/auth";
import "./index.css";

class RegisterForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      isRegisterSuccess: false,
      isRegisterFail: false,
      isRegisterLoading: false,
      isRegisterIdle: false,
    };
  }

  showPassword = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  componentDidMount() {
    if (isAuthenticated()) {
      console.log("authenticated", isAuthenticated());
    }
  }

  render() {
    const {
      showPassword,
      isRegisterFail,
      isRegisterSuccess,
      authenticated,
    } = this.state;
    if (authenticated) {
      return <Redirect to="/pages/one" />;
    }

    let warningMessage = (
      <div className="alert-message__fail">
        <h1>Registration failed</h1>
      </div>
    );

    let successMessage = (
      <div className="alert-message__success">
        <h1>Registration succeeded</h1>
      </div>
    );
    return (
      <div>
        {(() => {
          if (isRegisterSuccess) {
            return <>{successMessage}</>;
          }
          if (isRegisterFail) {
            return <>{warningMessage}</>;
          }
        })()}
        <form className="form">
          <div className="form__form-group">
            <span className="form__form-group-label">Username</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <AccountOutlineIcon />
              </div>
              <input name="name" type="text" placeholder="Name" />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Email</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <AccountOutlineIcon />
              </div>
              <input name="email" type="email" placeholder="Name" />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Password</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <KeyVariantIcon />
              </div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <button
                className={`form__form-group-button${
                  showPassword ? " active" : ""
                }`}
                onClick={(e) => this.showPassword(e)}
                type="button"
              >
                <EyeIcon />
              </button>
            </div>
            <div className="account__forgot-password">
              <a href="/">Forgot a password?</a>
            </div>
          </div>
          <div className="form__form-group">
            <div className="form__form-group-field">
              <CheckBox
                name="remember_me"
                label="Remember me"
                value="on"
                onChange={() => {}}
              />
            </div>
          </div>
          {/* <Link className="btn btn-primary account__btn account__btn--small" to="/pages/one">Sign In</Link> */}
          <button
            type="submit"
            // console.log("docu.", document.getElementsByName("email")[0]);
            className="btn btn-outline-primary account__btn account__btn--small"
            onClick={(e) => {
              e.preventDefault();
              let data = {
                name: document.getElementsByName("name")[0].value,
                email: document.getElementsByName("email")[0].value,
                password: document.getElementsByName("password")[0].value,
              };
              axios
                .post("http://localhost:4000/users", data)
                .then((response) => {
                  // response
                  console.log("response", !response.data.errors);
                  if (response.data) {
                    if (response.data.token) {
                      // setSession(response.data.user.email, response.data.token);
                      this.setState(
                        {
                          isRegisterSuccess: true,
                          isRegisterFail: false,
                        },
                        () => {
                          document.getElementsByName("name")[0].value = "";
                          document.getElementsByName("email")[0].value = "";
                          document.getElementsByName("password")[0].value = "";
                        }
                      );
                    } else {
                      this.setState({
                        isRegisterFail: true,
                        isRegisterSuccess: false,
                      });
                    }
                  } else {
                    this.setState({
                      isRegisterFail: true,
                      isRegisterSuccess: false,
                    });
                  }
                })
                .catch((e) => {
                  this.setState({
                    isRegisterFail: true,
                    isRegisterSuccess: false,
                  });
                });
            }}
          >
            Create Account
          </button>
          <Link
            className="btn btn-outline-primary account__btn account__btn--small"
            to="/log_in"
          >
            Go back
          </Link>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
