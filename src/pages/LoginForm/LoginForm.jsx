import React, { useRef } from "react";

const LoginForm = () => {
  const refUserName = useRef();
  const refPassword = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      refUserName.current.value === "admin" &&
      refPassword.current.value === "1234"
    ) {
      localStorage.setItem("isAuthenticated", "true");
      window.location.pathname = "/";
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row g-4 p-3">
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              placeholder="First name"
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
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
