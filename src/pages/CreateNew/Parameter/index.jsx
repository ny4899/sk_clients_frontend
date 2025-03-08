import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import FormLegend from "../../../components/IndustryDashboard/FormLegend";

const CreateNewParameter = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const refParameterName = useRef(null);
  const refParameterFullName = useRef(null);
  const refParameterUnit = useRef(null);

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
        parameter_name: refParameterName.current.value,
        parameter_full_name: refParameterFullName.current.value,
        parameter_unit: refParameterUnit.current.value,
      };
      const res = await axios.post(`${window.apiURL}/parameters`, dataObj);
      if (res.status === 201) {
        setError("");
        setMessage("Parameter created successfully");
      }
    } catch (error) {
      if (error.response.data.message.includes("E11000")) {
        setMessage("");
        setError(`Industry name already exist!`);
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
                          ref={refParameterName}
                          required
                          type="text"
                          className="form-control"
                          placeholder="Parameter Name"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refParameterFullName}
                          type="text"
                          className="form-control"
                          placeholder="Parameter Full Name"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refParameterUnit}
                          type="text"
                          className="form-control"
                          placeholder="Parameter unit"
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

export default CreateNewParameter;
