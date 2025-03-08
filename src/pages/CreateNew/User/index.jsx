import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import FormLegend from "../../../components/IndustryDashboard/FormLegend";
import { nanoid } from "nanoid";

const CreateNewUser = () => {
  const [parameters, setParameters] = useState("");
  const [selectedparameters, setSelectedParameters] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [industryList, setIndustryList] = useState("");
  const [industryListMessage, setIndustryListMessage] = useState("Loading...");
  const refName = useRef(null);
  const refLastname = useRef(null);
  const refUsername = useRef(null);
  const refPassword = useRef(null);
  const refParameter = useRef(null);
  const refStationName = useRef(null)
  const refFrom = useRef(null);
  const refTill = useRef(null);
  const refEmail = useRef(null);
  const refIndustry = useRef(null);
  const refPhone = useRef(null);
  const refCity = useRef(null);
  const refAddress = useRef(null);
  const refState = useRef(null);

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

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios(`${window.apiURL}/parameters`);
        setParameters(res.data.data.parameters);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios(`${window.apiURL}/industry_names`);
        setIndustryListMessage("");
        setIndustryList(res.data.data.industry_names);
      } catch (error) {
        setIndustryListMessage(`Somthing went wrong ${error.message}`);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const dataObj = {
        name: refName.current.value,
        last_name: refLastname.current.value,
        username: refUsername.current.value,
        password: refPassword.current.value,
        email: refEmail.current.value,
        industry: refIndustry.current.value.split("++")[1],
        industry_id: refIndustry.current.value.split("++")[0],
        phone: refPhone.current.value,
        city: refCity.current.value,
        address: refAddress.current.value,
        state: refState.current.value,
        subscribtions: [
          {
            parameters: selectedparameters,
            station_name: refStationName.current.value,
            from: refFrom.current.value,
            till: Number(refTill.current.value),
          },
        ],
      };
      const res = await axios.post(`${window.apiURL}/users/register`, dataObj);
      if (res.status === 201) {
        setMessage("User added successfully!");
      }
    } catch (error) {
      console.log(error.message);
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
                  <fieldset>
                    <FormLegend msg={"Create New User"} />
                    <div className="row g-3">
                      {/* ============================================= */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refName}
                          required
                          type="text"
                          className="form-control"
                          placeholder="Name *"
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refLastname}
                          type="text"
                          className="form-control"
                          placeholder="Lastname"
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refUsername}
                          required
                          type="text"
                          className="form-control"
                          placeholder="Username *"
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refPassword}
                          required
                          type="text"
                          className="form-control"
                          placeholder="Password *"
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <select
                          defaultValue={""}
                          className="form-select"
                          ref={refParameter}
                          onChange={() => {
                            setSelectedParameters([
                              ...selectedparameters,
                              refParameter.current.value.split("+")[0],
                            ]);
                          }}
                        >
                          <option disabled value="">
                            Select parameter
                          </option>
                          {parameters ? (
                            parameters.map((item) => {
                              return (
                                <option
                                  key={item._id}
                                  value={`${item.parameter_name}+${item.parameter_unit}`}
                                >
                                  {item.parameter_name}
                                </option>
                              );
                            })
                          ) : (
                            <option disabled value="loading">
                              Loading...
                            </option>
                          )}
                        </select>
                        {selectedparameters.length > 0 && (
                          <p className="m-0 p-0 mt-1">
                            Selected Parameters : {"  "}
                            {selectedparameters.map((name) => (
                              <span className="me-3" key={nanoid()}>
                                {name}
                              </span>
                            ))}
                          </p>
                        )}
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          defaultValue={""}
                          ref={refStationName}
                          className="form-control"
                          type="text"
                          placeholder="Station Name"
                        />
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          step={1}
                          defaultValue={"2000-01-01"}
                          ref={refFrom}
                          className="form-control"
                          type="date"
                          placeholder="From"
                        />
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refTill}
                          defaultValue={0}
                          className="form-control"
                          type="number"
                          name=""
                        />
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refEmail}
                          type="email"
                          className="form-control"
                          placeholder="Email"
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <select
                          defaultValue={""}
                          className="form-select"
                          ref={refIndustry}
                        >
                          <option disabled value="">
                            Select Industry
                          </option>
                          {industryList ? (
                            industryList.map((name) => {
                              return (
                                <option
                                  key={name._id}
                                  value={`${name._id}++${name.industry_name}`}
                                >
                                  {name.industry_name}
                                </option>
                              );
                            })
                          ) : (
                            <option disabled value="loading">
                              {industryListMessage}
                            </option>
                          )}
                        </select>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refPhone}
                          type="text"
                          className="form-control"
                          placeholder="Phone no."
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refCity}
                          type="text"
                          className="form-control"
                          placeholder="City"
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refAddress}
                          type="text"
                          className="form-control"
                          placeholder="Address"
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refState}
                          type="text"
                          className="form-control"
                          placeholder="State"
                        ></input>
                      </div>
                      {/* ============================================= */}
                      {/* col-10  */}
                      {/* <div className="col-9 col-sm-10 col-xl-11">
                        <select
                          defaultValue={"DEFAULT_Industry"}
                          className="form-select"
                        >
                          <option disabled value="DEFAULT_Industry">
                            about
                          </option>
                          <option value="team leader">team leader</option>
                          <option value="owner">owner</option>
                          <option value="office boy">office boy</option>
                        </select> 
                      </div> */}

                      {/* col-10  */}

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
                          <button className="btn btn-secondary me-3">
                            Cancel
                          </button>
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

      {/* modal for model  */}
      <div
        className="modal fade"
        id="createModelContainer"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Model
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-light">
              <div className="row gy-3">
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Name *"
                    required
                  ></input>
                </div>
                <div className="col-12">
                  <select
                    defaultValue={"DEFAULT_manufacture"}
                    className="form-select form-select-sm"
                    required
                  >
                    <option disabled value="DEFAULT_manufacture">
                      Select a Manufacture *
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-12">
                  <select
                    defaultValue={"DEFAULT_category"}
                    className="form-select form-select-sm"
                    required
                  >
                    <option disabled value="DEFAULT_category">
                      Select a Category *
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Model No."
                  ></input>
                </div>
                <div className="col-12">
                  <select
                    defaultValue={"DEFAULT_fieldset"}
                    className="form-select form-select-sm"
                  >
                    <option disabled value="DEFAULT_fieldset">
                      Select a Fieldset
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* modal for create Status label  */}
      <div
        className="modal fade"
        id="createStatusContainer"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Status Label
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-light">
              <div className="row gy-3">
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Name *"
                    required
                  ></input>
                </div>
                <div className="col-12">
                  <select
                    defaultValue={"DEFAULT_statusType"}
                    className="form-select form-select-sm"
                    required
                  >
                    <option disabled value="DEFAULT_statusType">
                      Select Status Type *
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* modal for create Supplier  */}
      <div
        className="modal fade"
        id="createSupplierContainer"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Supplier
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-light">
              <div className="row gy-3">
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Name *"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* modal for create Location  */}
      <div
        className="modal fade"
        id="createLocationContainer"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Location
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-light">
              <div className="row gy-3">
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Name *"
                    required
                  ></input>
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="City *"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateNewUser;
