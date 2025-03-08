import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import FormLegend from "../../../components/IndustryDashboard/FormLegend";
const CreateNewCamera = () => {
  const [industryNames, setIndustryNames] = useState("");
  const [selectedIndustryId, setSelectedIndustryId] = useState("");

  const [valuePtz, setValuePtz] = useState(false);
  const [valueZoom, setValueZoom] = useState(false);
  const [valueNightVision, setValueNightVision] = useState(false);
  const [valueIpCamera, setValueIpCamera] = useState(false);
  const [valueStatus, setValueStatus] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formView, setformView] = useState("d-none");

  const refSelectedIndustry = useRef("");

  const refCameraIp = useRef(null);
  const refCameraChannel = useRef(null);
  const refCameraUsername = useRef(null);
  const refCameraPassword = useRef(null);
  const refCameraLiveURL = useRef(null);
  const refCameraModel = useRef(null);
  const refCameraCompany = useRef(null);
  const refConnectivityType = useRef(null);
  const refBandwidth = useRef(null);
  const refCameraArea = useRef(null);
  const refCameraLocation = useRef(null);

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

  const handleSelectedIndustry = (e) => {
    e.preventDefault();
    setSelectedIndustryId(refSelectedIndustry.current.value);
    setformView("d-block");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("processing...");
    try {
      const dataObj = {
        camera_ip: refCameraIp.current.value,
        channel: refCameraChannel.current.value,
        user_name: refCameraUsername.current.value,
        password: refCameraPassword.current.value,
        live_stream_url: refCameraLiveURL.current.value,
        model_number: refCameraModel.current.value,
        camera_company: refCameraCompany.current.value,
        ptz: valuePtz,
        zoom: valueZoom,
        night_vision: valueNightVision,
        ip_camera: valueIpCamera,
        connectivity_type: refConnectivityType.current.value,
        bandwidth_available: refBandwidth.current.value,
        area: refCameraArea.current.value,
        location: refCameraLocation.current.value,
        status: valueStatus,
      };
      const res = await axios.post(
        `${window.apiURL}/camera/${selectedIndustryId}`,
        dataObj
      );

      if (res.status === 201) {
        setError("");
        setMessage("Camera added successfully!");
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
                  overflowX: "scroll",
                }}
              >
                <form>
                  <fieldset>
                    <FormLegend msg={"Select industry"} />
                    <div className="row g-3">
                      {/* ================*/}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <select
                          defaultValue={""}
                          className="form-select mb-3"
                          ref={refSelectedIndustry}
                          onChange={handleSelectedIndustry}
                        >
                          <option value="">Select industry</option>
                          {industryNames ? (
                            industryNames.map((name) => {
                              return (
                                <option key={name._id} value={name._id}>
                                  {name.industry_name}
                                </option>
                              );
                            })
                          ) : (
                            <option value="loading">Loading...</option>
                          )}
                        </select>
                      </div>
                      {/* ================*/}
                    </div>
                  </fieldset>
                </form>

                {selectedIndustryId ? (
                  <form onSubmit={handleSubmit} className={`mt-3 ${formView}`}>
                    <fieldset>
                      <FormLegend msg={"Add Camera"} />
                      <div className="row g-3">
                        <div className="col-12">
                          <input
                            ref={refCameraIp}
                            required
                            type="text"
                            className="form-control"
                            placeholder="Camera Ip *"
                          ></input>
                        </div>

                        <div className="col-12">
                          <input
                            ref={refCameraChannel}
                            required
                            type="text"
                            className="form-control"
                            placeholder="Channel *"
                          ></input>
                        </div>

                        <div className="col-12">
                          <input
                            ref={refCameraUsername}
                            required
                            type="text"
                            className="form-control"
                            placeholder="Username *"
                          ></input>
                        </div>

                        <div className="col-12">
                          <input
                            ref={refCameraPassword}
                            required
                            type="text"
                            className="form-control"
                            placeholder="Password *"
                          ></input>
                        </div>

                        <div className="col-12">
                          <input
                            ref={refCameraLiveURL}
                            required
                            type="text"
                            className="form-control"
                            placeholder="Live stream URL *"
                          ></input>
                        </div>

                        <div className="col-12">
                          <input
                            ref={refCameraModel}
                            required
                            type="text"
                            className="form-control"
                            placeholder="Modal number *"
                          ></input>
                        </div>

                        <div className="col-12">
                          <select
                            id="deviceCategory"
                            defaultValue={""}
                            required
                            className="form-select"
                            ref={refCameraCompany}
                          >
                            <option value="">Select Company *</option>
                            <option value="Hikvision">Hikvision</option>
                            <option value="Cp plus">Cp plus</option>
                            <option value="IPC">IPC</option>
                          </select>
                        </div>

                        <div className="col-12">
                          <div className="form-check">
                            <input
                              value={valuePtz}
                              className="form-check-input"
                              type="checkbox"
                              id="ptz"
                              onChange={() => setValuePtz(!valuePtz)}
                            />
                            <label className="form-check-label" htmlFor="ptz">
                              ptz *
                            </label>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-check">
                            <input
                              value={valueZoom}
                              onChange={() => setValueZoom(!valueZoom)}
                              className="form-check-input"
                              type="checkbox"
                              id="zoom"
                            />
                            <label className="form-check-label" htmlFor="zoom">
                              zoom *
                            </label>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-check">
                            <input
                              value={valueNightVision}
                              onChange={() =>
                                setValueNightVision(!valueNightVision)
                              }
                              className="form-check-input"
                              type="checkbox"
                              id="nightVision"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="nightVision"
                            >
                              night vision *
                            </label>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-check">
                            <input
                              value={valueIpCamera}
                              onChange={() => setValueIpCamera(!valueIpCamera)}
                              className="form-check-input"
                              type="checkbox"
                              id="ipcamera"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="ipcamera"
                            >
                              ip camera *
                            </label>
                          </div>
                        </div>

                        <div className="col-12">
                          <input
                            ref={refConnectivityType}
                            required
                            type="text"
                            className="form-control"
                            placeholder="Connectivity Type *"
                          ></input>
                        </div>

                        <div className="col-12">
                          <input
                            ref={refBandwidth}
                            required
                            type="text"
                            className="form-control"
                            placeholder="Bandwidth *"
                          ></input>
                        </div>

                        <div className="col-12">
                          <input
                            ref={refCameraArea}
                            required
                            type="text"
                            className="form-control"
                            placeholder="Area *"
                          ></input>
                        </div>

                        <div className="col-12">
                          <input
                            ref={refCameraLocation}
                            required
                            type="text"
                            className="form-control"
                            placeholder="Location *"
                          ></input>
                        </div>

                        <div className="col-12">
                          <div className="form-check">
                            <input
                              value={valueStatus}
                              onChange={() => {
                                setValueStatus(!valueStatus);
                              }}
                              className="form-check-input"
                              type="checkbox"
                              id="status"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="status"
                            >
                              Status *
                            </label>
                          </div>
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

export default CreateNewCamera;
