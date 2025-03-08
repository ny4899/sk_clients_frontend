import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import Select from "react-select";
import FormLegend from "../../../components/IndustryDashboard/FormLegend";

const CloseIndustry = () => {
  const [industryNames, setIndustryNames] = useState("");
  const [deviceNames, setDeviceNames] = useState("");
  const [selectedIndustryId, setSelectedIndustryId] = useState("");
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formView, setformView] = useState("d-none");
  const [deviceFormView, setDeviceFormView] = useState("d-none");

  const refSelectedIndustry = useRef(null);
  const refSelectedDevice = useRef(null);

  const refSelectedStatus = useRef("");

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
        const res = await axios(`${window.apiURL}/industry_names`);
        setIndustryNames(res.data.data.industry_names);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedIndustryId) {
      async function fetchData() {
        try {
          const res = await axios(
            `${window.apiURL}/device/${selectedIndustryId}`
          );
          setDeviceNames(res.data.data.devices);
        } catch (error) {
          console.log(error.message);
        }
      }
      fetchData();
    }
  }, [selectedIndustryId]);

  const handleSelectedIndustry = () => {
    setSelectedIndustryId(refSelectedIndustry.current.value);
    setDeviceFormView("d-block");
    setSelectedDeviceId("");
  };

  const handleSelectedDevice = () => {
    setSelectedDeviceId(refSelectedDevice.current.value);
    setformView("d-block");
  };

  const handleSelectedStatus = (e) => {
    e.preventDefault();
    setSelectedStatus(refSelectedStatus.current.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("processing...");
    try {
      const res = await axios.post(
        `${window.apiURL}/industries_status/update/${selectedIndustryId}/${selectedDeviceId}/${refSelectedStatus.current.value}`
      );
      if (res.status === 201) {
        setError("");
        setMessage("Device status updated successfully!");
      }
    } catch (error) {
      setMessage("");
      if (error.response.data.message) {
        setError(`${error.response.data.message}!`);
      } else {
        setError(`${error.message}!`);
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
                }}
              >
                <form>
                  <fieldset>
                    <FormLegend msg={"Select industry"} />
                    <div className="row g-3">
                      {/* ================*/}
                      <div className="col-12">
                        {industryNames ? (
                          <Select
                            ref={refSelectedIndustry}
                            className="mb-3"
                            placeholder="Select industry"
                            options={industryNames.map(
                              ({ _id, industry_name }) => ({
                                value: _id,
                                label: industry_name,
                              })
                            )}
                            onChange={(e) => {
                              refSelectedIndustry.current.value = e.value;
                              handleSelectedIndustry();
                            }}
                          />
                        ) : (
                          <select
                            defaultValue={"loading"}
                            className="form-select"
                          >
                            <option disabled value="loading">
                              Loading...
                            </option>
                          </select>
                        )}
                      </div>
                      {/* ================*/}
                    </div>
                  </fieldset>
                </form>

                {selectedIndustryId ? (
                  <form className={`mt-3 ${deviceFormView}`}>
                    <fieldset>
                      <FormLegend msg={"Select Device"} />
                      <div className="row g-3">
                        <div className="col-12">
                          {deviceNames ? (
                            <Select
                              ref={refSelectedDevice}
                              className="mb-3"
                              placeholder="Select Device"
                              options={deviceNames.map(
                                ({ _id, device_name }) => ({
                                  value: _id,
                                  label: device_name,
                                })
                              )}
                              onChange={(e) => {
                                refSelectedDevice.current.value = e.value;
                                handleSelectedDevice();
                              }}
                            />
                          ) : (
                            <select
                              defaultValue={"loading"}
                              className="form-select"
                            >
                              <option disabled value="loading">
                                Loading...
                              </option>
                            </select>
                          )}
                        </div>
                      </div>
                    </fieldset>
                  </form>
                ) : (
                  <></>
                )}

                {selectedIndustryId && selectedDeviceId ? (
                  <form onSubmit={handleSubmit} className={`mt-3 ${formView}`}>
                    <fieldset>
                      <FormLegend msg={"Update Device Status"} />
                      <div className="row g-3">
                        <div className="col-12">
                          <select
                            id="deviceCategory"
                            defaultValue={""}
                            className="form-select"
                            ref={refSelectedStatus}
                            onChange={handleSelectedStatus}
                          >
                            <option disabled value="">
                              Select an option
                            </option>
                            <option value="online">online</option>
                            <option value="maintainance">maintainance</option>
                            <option value="shutdown">shutdown</option>
                            <option value="seasonal_shutdown">
                              seasonal_shutdown
                            </option>
                            <option value="closed_by_cpcb">
                              closed_by_cpcb
                            </option>
                          </select>
                        </div>
                        {/* ========== */}
                        {message && (
                          <div className="col-12">
                            <div
                              className="alert alert-success px-2"
                              role="alert"
                            >
                              {message}
                            </div>
                          </div>
                        )}
                        {error && (
                          <div className="col-12">
                            <div className="alert alert-danger" role="alert">
                              {error}
                            </div>
                          </div>
                        )}
                        {selectedIndustryId &&
                        selectedDeviceId &&
                        selectedStatus ? (
                          <div className="col-12">
                            <div className="d-flex justify-content-end py-2">
                              <button
                                className="btn btn-secondary me-3"
                                onClick={() => {
                                  setformView("d-none");
                                  setSelectedIndustryId("");
                                  refSelectedIndustry.current.value = "";
                                }}
                              >
                                Cancel
                              </button>
                              <button type="submit" className="btn btn-success">
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
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

export default CloseIndustry;
