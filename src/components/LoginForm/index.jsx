import React, { useEffect } from "react";
import "./login-form.scss";
import logo from "../../images/logo.png";

const LoginForm = ({
  handleSubmit,
  refPassword,
  refUserName,
  error,
  setError,
  fetchingData,
}) => {
  useEffect(() => {
    const timeId = setTimeout(() => {
      if (error) {
        setError("");
      }
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [error]);

  return (
    <div className="loginform__main__container">
      <div className="form__container container-fluid">
        <form onSubmit={handleSubmit}>
          <div className="row g-3 m-0 px-2 py-4 px-sm-3">
            <div className="col-12 d-flex justify-content-center">
              <img src={logo} width={"200px"} alt="" />
            </div>
            <div className="col-12">
              {fetchingData && (
                <div
                  className="alert alert-primary alert-dismissible fade show"
                  role="alert"
                >
                  {fetchingData}
                </div>
              )}
            </div>
            <div className="col-12">
              {error && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  {error}
                </div>
              )}
            </div>
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                placeholder="User Id"
                ref={refUserName}
                required
              />
            </div>
            <div className="col-12">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                ref={refPassword}
                required
              />
            </div>
            <div className="col-12  d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
