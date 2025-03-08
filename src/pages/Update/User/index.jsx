import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import FormLegend from "../../../components/IndustryDashboard/FormLegend";
import { nanoid } from "nanoid";

const UpdateUser = () => {
  const [userNames, setUserNames] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [parameters, setParameters] = useState(null);

  const [formView, setformView] = useState("d-block");
  const [formMessage, setFormMessage] = useState("fetching data...");

  const [userListMessage, setUserListMessage] = useState("Loading...");
  const [industryListMessage, setIndustryListMessage] = useState("Loading...");

  const [industryList, setIndustryList] = useState("");
  const [message, setMessage] = useState("");

  const [error, setError] = useState("");
  const [subscribtions, setSubscribtions] = useState([]);
  const refName = useRef(null);
  const refLastname = useRef(null);
  const refUsername = useRef(null);
  const refPassword = useRef(null);

  const refEmail = useRef(null);
  const refPhone = useRef(null);
  const refIndustry = useRef(null);
  const refCity = useRef(null);
  const refAddress = useRef(null);
  const refState = useRef(null);
  const refContainer = useRef(null);

  const refSelectedUser = useRef("");

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
        const res = await axios(`${window.apiURL}/user_names`);
        if (res.status === 200) {
          setUserListMessage("");
          setUserNames(res.data.data.user_names);
        }
      } catch (error) {
        setUserListMessage(`Somthing went wrong ${error.message}`);
      }
    }
    fetchData();
  }, []);

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

  const getUserData = async () => {
    try {
      const res = await axios(`${window.apiURL}/users/${selectedUserId}`);
      if (res.status === 200) {
        const {
          name,
          last_name,
          username,
          passwordStr,
          subscribtions,
          email,
          industry,
          industry_id,
          phone,
          city,
          address,
          state,
        } = res.data.data.user;

        refName.current.value = name;
        refLastname.current.value = last_name;
        refUsername.current.value = username;
        refPassword.current.value = passwordStr;
        setSubscribtions(subscribtions);
        refEmail.current.value = email;
        refIndustry.current.value = `${industry_id}++${industry}`;
        refPhone.current.value = phone;
        refCity.current.value = city;
        refAddress.current.value = address;
        refState.current.value = state;
      } else {
        setFormMessage(`Unable to fetch: try again!`);
      }
      setformView("d-block");
    } catch (error) {
      setFormMessage(`Something went wrong: ${error.message}`);
    }
  };

  useEffect(() => {
    if (selectedUserId) {
      getUserData();
    }
  }, [selectedUserId]);

  const handleSelectedIndustry = (e) => {
    e.preventDefault();
    setformView("d-none");
    setSelectedUserId(refSelectedUser.current.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("processing!");
    try {
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
        subscribtions: subscribtions,
      };
      const res = await axios.patch(
        `${window.apiURL}/users/${selectedUserId}`,
        dataObj
      );
      if (res.status === 204) {
        setMessage("Updated successfully!");
      }
    } catch (error) {
      setMessage("");
      setError(`Something went wrong! ${error.message}`);
    }
  };

  const handleFormChange = (index, event) => {
    let data = [...subscribtions];
    if (event.target.name === "parameters") {
      if (
        !data[index][event.target.name].includes(
          event.target.value.split("+")[0]
        )
      ) {
        data[index][event.target.name].push(event.target.value.split("+")[0]);
      } else if (
        data[index][event.target.name].includes(
          event.target.value.split("+")[0]
        )
      ) {
        const position = data[index][event.target.name].indexOf(
          event.target.value.split("+")[0]
        );
        if (position > -1) {
          data[index][event.target.name].splice(position, 1);
        }
      }
    } else {
      data[index][event.target.name] = event.target.value;
    }
    setSubscribtions(data);
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
                <form>
                  <fieldset>
                    <FormLegend msg={"Select User"} />
                    <div className="row g-3">
                      {/* ================*/}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <select
                          defaultValue={""}
                          className="form-select mb-3"
                          ref={refSelectedUser}
                          onChange={handleSelectedIndustry}
                        >
                          <option disabled value="">
                            Select User
                          </option>
                          {userNames ? (
                            userNames.map((name) => {
                              return (
                                <option key={name._id} value={name._id}>
                                  {name.username}
                                </option>
                              );
                            })
                          ) : (
                            <option disabled value="loading">
                              {userListMessage}
                            </option>
                          )}
                        </select>
                      </div>
                      {/* ================*/}
                    </div>
                  </fieldset>
                </form>

                {formView === "d-none" ? (
                  <div className="py-3 py-sm-4">
                    {formMessage === "fetching data..." ? (
                      <h5 className="text-center">{formMessage}</h5>
                    ) : (
                      <h6 className="text-center text-danger">{formMessage}</h6>
                    )}
                  </div>
                ) : (
                  <></>
                )}

                {selectedUserId ? (
                  <form onSubmit={handleSubmit} className={`mt-3 ${formView}`}>
                    <fieldset>
                      <FormLegend msg={"Update Industry"} />
                      <div className="row gx-3 gy-2">
                        {/* ================ */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="name" className="col-form-label">
                            Name:
                          </label>
                          <input
                            id="name"
                            ref={refName}
                            type="text"
                            className="form-control"
                            placeholder="Name"
                          ></input>
                        </div>

                        {/* ================ */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="lastname" className="col-form-label">
                            Lastname:
                          </label>
                          <input
                            id="lastname"
                            ref={refLastname}
                            type="text"
                            className="form-control"
                            placeholder="Name *"
                          ></input>
                        </div>

                        {/* ================ */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="username" className="col-form-label">
                            Username:
                          </label>
                          <input
                            id="username"
                            ref={refUsername}
                            type="text"
                            className="form-control"
                            placeholder="Username"
                          ></input>
                        </div>

                        {/* ================ */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="password" className="col-form-label">
                            Password:
                          </label>
                          <input
                            id="password"
                            ref={refPassword}
                            type="text"
                            className="form-control"
                            placeholder="Password"
                          ></input>
                        </div>
                        {subscribtions.length > 0 &&
                          subscribtions.map((data, i) => (
                            <fieldset
                              key={nanoid()}
                              className="w-100 mt-3 bg-light"
                            >
                              <FormLegend msg={`Subscription ${i + 1}`} />
                              <div className="row">
                                <div className="col-9 col-sm-10 col-xl-11">
                                  <select
                                    id="parameters"
                                    defaultValue={""}
                                    className="form-select"
                                    name="parameters"
                                    onChange={(event) =>
                                      handleFormChange(i, event)
                                    }
                                  >
                                    <option disabled value="">
                                      Select parameter *
                                    </option>
                                    {parameters ? (
                                      parameters.map((item) => {
                                        return (
                                          <option
                                            key={nanoid()}
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
                                  {data.parameters.length > 0 && (
                                    <p className="m-0 p-0 mt-1 d-flex flex-wrap">
                                      Parameters :
                                      {data.parameters.map((name) => (
                                        <span className="ms-3" key={nanoid()}>
                                          {name}
                                        </span>
                                      ))}
                                    </p>
                                  )}
                                </div>

                                {/* ================ */}
                                <div className="col-9 col-sm-10 col-xl-11">
                                  <div className="row mt-3">
                                    <label
                                      htmlFor="station"
                                      className="col-form-label col-sm-2 col-lg-1"
                                    >
                                      Station name:
                                    </label>
                                    <div className="col-sm-10 col-lg-11">
                                      <input
                                        value={data.station_name}
                                        onChange={(event) =>
                                          handleFormChange(i, event)
                                        }
                                        id="station"
                                        className="form-control"
                                        type="text"
                                        name="station_name"
                                        placeholder="station name"
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* ================ */}
                                <div className="col-9 col-sm-10 col-xl-11">
                                  <div className="row mt-3">
                                    <label
                                      htmlFor="from"
                                      className="col-form-label col-sm-2 col-lg-1"
                                    >
                                      From:
                                    </label>
                                    <div className="col-sm-10 col-lg-11">
                                      <span className="mb-1 d-inline-block">yyyy-mm-dd</span>
                                      <input
                                        value={data.from}
                                        onChange={(event) =>
                                          handleFormChange(i, event)
                                        }
                                        id="from"
                                        className="form-control"
                                        type="text"
                                        name="from"
                                        placeholder="yyyy-mm-dd"
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* ================ */}
                                <div className="col-9 col-sm-10 col-xl-11">
                                  <div className="row mt-3">
                                    <label
                                      htmlFor="till"
                                      className="col-form-label col-sm-2 col-lg-1"
                                    >
                                      Days:
                                    </label>
                                    <div className="col-sm-10 col-lg-11">
                                      <input
                                        id="till"
                                        value={data.till}
                                        onChange={(event) =>
                                          handleFormChange(i, event)
                                        }
                                        className="form-control"
                                        type="number"
                                        placeholder="Days"
                                        name="till"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="col-9 col-sm-10 col-xl-11 mt-3">
                                  <button
                                    onClick={() => {
                                      let arr = [...subscribtions];
                                      arr.splice(i, 1);
                                      setSubscribtions(arr);
                                    }}
                                    className="btn btn-sm btn-danger"
                                  >
                                    Delete Subscription
                                  </button>
                                </div>
                              </div>
                            </fieldset>
                          ))}

                        <div className="col-9 col-sm-10 col-xl-11">
                          <button
                            onClick={() => {
                              setSubscribtions([
                                ...subscribtions,
                                {
                                  station_name: "",
                                  from: "2000-01-01",
                                  till: 0,
                                  parameters: [],
                                },
                              ]);
                            }}
                            className="btn btn-sm btn-primary"
                          >
                            Add Subscription
                          </button>
                        </div>
                        {/* ================ */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="email" className="col-form-label">
                            Email:
                          </label>
                          <input
                            id="email"
                            ref={refEmail}
                            type="text"
                            className="form-control"
                            placeholder="email"
                          ></input>
                        </div>

                        {/* col-10  */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label
                            htmlFor="selectIndustry"
                            className="col-form-label"
                          >
                            select Industry:
                          </label>
                          <select
                            id="selectIndustry"
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

                        {/* ================ */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="phone" className="col-form-label">
                            Phone:
                          </label>
                          <input
                            id="phone"
                            ref={refPhone}
                            type="text"
                            className="form-control"
                            placeholder="Phone"
                          ></input>
                        </div>

                        {/* ================ */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="city" className="col-form-label">
                            City:
                          </label>
                          <input
                            id="city"
                            ref={refCity}
                            type="text"
                            className="form-control"
                            placeholder="City"
                          ></input>
                        </div>

                        {/* ================ */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="address" className="col-form-label">
                            Address:
                          </label>
                          <input
                            id="address"
                            ref={refAddress}
                            type="text"
                            className="form-control"
                            placeholder="Address"
                          ></input>
                        </div>

                        {/* ================ */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="state" className="col-form-label">
                            State:
                          </label>
                          <input
                            id="state"
                            ref={refState}
                            type="text"
                            className="form-control"
                            placeholder="State *"
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
                            <button
                              className="btn btn-secondary me-3"
                              onClick={() => {
                                setSelectedUserId("");
                                refSelectedUser.current.value =
                                  "DEFAULT_Industry";
                              }}
                            >
                              Cancel
                            </button>
                            <button type="submit" className="btn btn-success">
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
