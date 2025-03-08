import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import FormLegend from "../../../components/IndustryDashboard/FormLegend";

const UpdateParameter = () => {
  const [partnerNames, setPartnerNames] = useState("");
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [formView, setformView] = useState("d-block");
  const [formMessage, setFormMessage] = useState("fetching data...");
  const [inputMessage, setInputMessage] = useState("Loading...");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const refPartnerName = useRef(null);
  const refSelectedPartner = useRef("");

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
        const res = await axios(`${window.apiURL}/partner`);
        setPartnerNames(res.data.data.partners);
      } catch (error) {
        setInputMessage(`Somthing went wrong ${error.message}`);
      }
    }
    fetchData();
  }, [message]);

  const getAllPartner = async () => {
    try {
      const res = await axios(`${window.apiURL}/partner/${selectedPartnerId}`);

      if (res.status === 200) {
        const { partner_name } = res.data.data.partner;
        refPartnerName.current.value = partner_name;
      } else {
        setFormMessage(`Unable to fetch: try again!`);
      }
      setformView("d-block");
    } catch (error) {
      setFormMessage(`Something went wrong: ${error.message}`);
    }
  };

  useEffect(() => {
    if (selectedPartnerId) {
      getAllPartner();
    }
  }, [selectedPartnerId]);

  const handleSelectedPartner = (e) => {
    e.preventDefault();
    setformView("d-none");
    setSelectedPartnerId(refSelectedPartner.current.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("processing!");
    try {
      const dataObj = {
        partner_name: refPartnerName.current.value,
      };
      const res = await axios.patch(
        `${window.apiURL}/partner/${selectedPartnerId}`,
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
                    <FormLegend msg={"Select Partner"} />
                    <div className="row g-3">
                      {/* ================*/}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <select
                          defaultValue={""}
                          className="form-select mb-3"
                          ref={refSelectedPartner}
                          onChange={handleSelectedPartner}
                        >
                          <option disabled value="">
                            Select Parameter
                          </option>
                          {partnerNames ? (
                            partnerNames.map((name) => {
                              return (
                                <option key={name._id} value={name._id}>
                                  {name.partner_name}
                                </option>
                              );
                            })
                          ) : (
                            <option disabled value="loading">
                              {inputMessage}
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

                {selectedPartnerId ? (
                  <form onSubmit={handleSubmit} className={`mt-3 ${formView}`}>
                    <fieldset>
                      <FormLegend msg={"Update Partner"} />
                      <div className="row gx-3 gy-2">
                        {/* ================ */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label
                            htmlFor="partnerName"
                            className="col-form-label"
                          >
                            Partner Name:
                          </label>
                          <input
                            id="partnerName"
                            ref={refPartnerName}
                            type="text"
                            className="form-control"
                            placeholder="Parameter Name"
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
                                setSelectedPartnerId("");
                                refSelectedPartner.current.value =
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

export default UpdateParameter;
