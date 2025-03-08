import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import FormLegend from "../../../components/IndustryDashboard/FormLegend";

const CreateNewPartner = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const refPartnerName = useRef(null);

  useEffect(() => {
    const timeId = setTimeout(() => {
      if (message || error) {
        setMessage("");
        setError("");
      }
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [message, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("processing!");
    try {
      const dataObj = {
        partner_name: refPartnerName.current.value,
      };
      const res = await axios.post(`${window.apiURL}/partner`, dataObj);
      if (res.status === 201) {
        setError("");
        setMessage("Partner created successfully");
      }
    } catch (error) {
      if (error.response.data.message.includes("E11000")) {
        setMessage("");
        setError(`Partner name already exist!`);
      } else {
        setMessage("");
        setError(`Something went wrong! ${error.message}`);
      }
    }
  };

  return (
    <>
      <div className="container-fluid px-3 py-4">
        <div className="row g-3">
          <div className="col-12">
            <div className="data__wrapper p-1 p-sm-3 shadow-sm">
              <div
                className="mx-auto"
                style={{
                  width: "100%",
                  overflowX: "scroll",
                }}
              >
                <form onSubmit={handleSubmit}>
                  <fieldset className="">
                    <FormLegend msg={"Create New Parameter"} />
                    <div className="row g-3">
                      {/* ================== */}

                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refPartnerName}
                          required
                          type="text"
                          className="form-control"
                          placeholder="Partner Name"
                        ></input>
                      </div>

                      {message && (
                        <div className="col-9 col-sm-10 col-xl-11">
                          <div
                            className="alert alert-success px-2"
                            role="alert"
                          >
                            {message}
                          </div>
                        </div>
                      )}
                      {error && (
                        <div className="col-9 col-sm-10 col-xl-11">
                          <div className="alert alert-danger" role="alert">
                            {error}
                          </div>
                        </div>
                      )}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <div className="d-flex justify-content-end py-2">
                          <button type="submit" className="btn btn-success">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewPartner;
