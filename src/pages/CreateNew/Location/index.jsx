import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import Select from "react-select";
import FormLegend from "../../../components/IndustryDashboard/FormLegend";
import { nanoid } from "nanoid";

const allIndianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

const CreateNewLocation = () => {
  const [industryNames, setIndustryNames] = useState("");
  const [selectedIndustryId, setSelectedIndustryId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formView, setformView] = useState("d-block");
  const [formMessage, setFormMessage] = useState("fetching data...");

  const refSelectedIndustry = useRef("");

  const refLocationName = useRef(null);
  const refAddress = useRef(null);
  const refCity = useRef(null);
  const refState = useRef(null);
  const refPincode = useRef(null);
  const refPhoneNumber = useRef(null);
  const refLatitude = useRef(null);
  const refLongitude = useRef(null);
  const refIndustrycode = useRef(null);
  const refGangaBasin = useRef(null);

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

  const getAllIndustries = async () => {
    try {
      const res = await axios(
        `${window.apiURL}/industries/${selectedIndustryId}`
      );

      if (res.status === 200) {
        const {
          location_name,
          address,
          city,
          state,
          pincode,
          phone_number,
          latitude,
          longitude,
          industry_code,
          ganga_basin,
        } = res.data.data.industry;

        refLocationName.current.value = location_name;
        refAddress.current.value = address;
        refCity.current.value = city;
        refState.current.value = state;
        refPincode.current.value = pincode;
        refPhoneNumber.current.value = phone_number;
        refLatitude.current.value = latitude;
        refLongitude.current.value = longitude;
        refIndustrycode.current.value = industry_code;
        refGangaBasin.current.value = ganga_basin;
      } else {
        setFormMessage(`Unable to fetch: try again!`);
      }
      setformView("d-block");
    } catch (error) {
      setFormMessage(`Something went wrong: ${error.message}`);
    }
  };

  useEffect(() => {
    if (selectedIndustryId) {
      getAllIndustries();
    }
  }, [selectedIndustryId]);

  const handleSelectedIndustry = () => {
    setformView("d-none");
    setSelectedIndustryId(refSelectedIndustry.current.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("processing!");
    try {
      const dataObj = {
        location_name: refLocationName.current.value.trim(),
        address: refAddress.current.value.trim(),
        city: refCity.current.value.trim(),
        state: refState.current.value.trim(),
        pincode: refPincode.current.value.trim(),
        phone_number: refPhoneNumber.current.value.trim(),
        latitude: refLatitude.current.value.trim(),
        longitude: refLongitude.current.value.trim(),
        industry_code: refIndustrycode.current.value.trim(),
        ganga_basin: refGangaBasin.current.value.trim(),
      };
      const res = await axios.patch(
        `${window.apiURL}/industries/${selectedIndustryId}`,
        dataObj
        );
      if (res.status === 201) {
        setMessage("Location added successfully!");
      }
    } catch (error) {
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
                }}
              >
                <form>
                  <fieldset>
                    <FormLegend msg={"Select industry"} />
                    <div className="row g-3">
                      {/* ================*/}
                      <div className="col-9 col-sm-10 col-xl-11">
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

                {selectedIndustryId ? (
                  <form onSubmit={handleSubmit} className={`mt-3 ${formView}`}>
                    <fieldset>
                      <FormLegend msg={"Add Location"} />
                      <div className="row gx-3 gy-2">
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label
                            htmlFor="locationName"
                            className="col-form-label"
                          >
                            Location name :
                          </label>
                          <input
                            ref={refLocationName}
                            required
                            id="locationName"
                            type="text"
                            className="form-control"
                            placeholder="Location name *"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="address" className="col-form-label">
                            Address :
                          </label>
                          <input
                            id="address"
                            ref={refAddress}
                            type="text"
                            className="form-control"
                            placeholder="Address"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="city" className="col-form-label">
                            City :
                          </label>
                          <input
                            id="city"
                            ref={refCity}
                            type="text"
                            className="form-control"
                            placeholder="City"
                          ></input>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="state" className="col-form-label">
                            Select state :
                          </label>
                          <select
                            id="state"
                            defaultValue={""}
                            className="form-select"
                            ref={refState}
                          >
                            <option value="">Select state</option>
                            {allIndianStates.map((state) => (
                              <option key={nanoid()} value={state}>{state}</option>
                            ))}
                          </select>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="pincode" className="col-form-label">
                            Pincode :
                          </label>
                          <input
                            id="pincode"
                            ref={refPincode}
                            type="number"
                            className="form-control"
                            placeholder="Pincode"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="phoneNumber" className="col-form-label">
                          Phone Number :
                          </label>
                          <input
                            id="phoneNumber"
                            ref={refPhoneNumber}
                            type="text"
                            className="form-control"
                            placeholder="Phone number"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="latitude" className="col-form-label">
                            Latitude :
                          </label>
                          <input
                            id="latitude"
                            ref={refLatitude}
                            type="number"
                            className="form-control"
                            placeholder="Latitude"
                            step="any"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="longitude" className="col-form-label">
                            Longitude :
                          </label>
                          <input
                            id="longitude"
                            ref={refLongitude}
                            type="number"
                            className="form-control"
                            placeholder="Longitude"
                            step="any"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label
                            htmlFor="industryCode"
                            className="col-form-label"
                          >
                            Industry code :
                          </label>
                          <input
                            id="industryCode"
                            ref={refIndustrycode}
                            type="text"
                            className="form-control"
                            placeholder="Industry code"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label
                            htmlFor="gangaBasin"
                            className="col-form-label"
                          >
                            Ganga Basin :
                          </label>
                          <select
                            id="gangaBasin"
                            defaultValue={""}
                            className="form-select"
                            ref={refGangaBasin}
                          >
                            <option
                              disabled
                              style={{ color: "red !important" }}
                              value=""
                            >
                              Ganga Basin
                            </option>
                            <option value={true}>Yes</option>
                            <option value={false}>no</option>
                          </select>
                        </div>
                        {/* ========== */}
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

export default CreateNewLocation;
