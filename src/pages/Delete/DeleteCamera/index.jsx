import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import FormLegend from "../../../components/IndustryDashboard/FormLegend";

const DeleteCamera = () => {
  const [industryNames, setIndustryNames] = useState("");
  const [cameraNames, setCameraNames] = useState("");
  const [selectedIndustryId, setSelectedIndustryId] = useState("");
  const [selectedCameraId, setSelectedCameraId] = useState("");
  const [selectedCameraName, setSelectedCameraName] = useState("");
  const [inputMessage, setInputMessage] = useState("Loading...");
  const [selectMessage, setSelectMessage] = useState("");
  const [cameraInputMessage, setCameraInputMessage] = useState("Loading..");
  const [deleteMessage, setDeleteMessage] = useState("");

  const refSelectedIndustry = useRef(null);
  const refSelectedCamera = useRef(null);

  useEffect(() => {
    const timeId = setTimeout(() => {
      if (selectMessage) {
        setSelectMessage("");
      }
      if (deleteMessage) {
        setDeleteMessage("");
      }
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [selectMessage, deleteMessage]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios(`${window.apiURL}/industry_names`);
        setIndustryNames(res.data.data.industry_names);
      } catch (error) {
        setInputMessage(`Somthing went wrong ${error.message}`);
      }
    }
    fetchData();
  }, [deleteMessage]);

  useEffect(() => {
    if (selectedIndustryId) {
      async function fetchData() {
        try {
          const res = await axios(
            `${window.apiURL}/camera/${selectedIndustryId}`
          );
          setCameraNames(res.data.data.cameras);
        } catch (error) {
          setCameraInputMessage("Unable to fetch!");
        }
      }
      fetchData();
    }
  }, [selectedIndustryId, deleteMessage]);

  const handleSelectedIndustry = (e) => {
    e.preventDefault();
    setSelectedIndustryId(refSelectedIndustry.current.value);
  };

  const handleSelectedCamera = (e) => {
    e.preventDefault();
    setSelectedCameraId(refSelectedCamera.current.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!selectedCameraId) {
      setSelectMessage("Please select Camera");
    } else {
      try {
        const res = await axios(
          `${window.apiURL}/camera/${selectedIndustryId}/${selectedCameraId}`
        );
        setSelectedCameraName(res.data.data.camera.camera_ip);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteConfirm = async () => {
    setDeleteMessage("processing...");
    try {
      const res = await axios.patch(
        `${window.apiURL}/camera/delete/${selectedIndustryId}/${selectedCameraId}`
      );
      if (res.status === 201) {
        setDeleteMessage("Deleted successfully!");
        refSelectedIndustry.current.value = "";
      }
    } catch (error) {
      console.log(error);
      setDeleteMessage(`Something went wrong! ${error.message}`);
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
                <form className="mb-3">
                  <fieldset>
                    <FormLegend msg={"Select industry"} />
                    <div className="row g-3">
                      {/* ================*/}
                      <div className="col-12">
                        <select
                          required
                          defaultValue={""}
                          className="form-select mb-2"
                          ref={refSelectedIndustry}
                          onChange={handleSelectedIndustry}
                        >
                          <option disabled value="">
                            Select industry
                          </option>
                          {industryNames ? (
                            industryNames.map((name) => {
                              return (
                                <option key={name._id} value={name._id}>
                                  {name.industry_name}
                                </option>
                              );
                            })
                          ) : (
                            <option disabled value="loading">
                              {inputMessage}
                            </option>
                          )}
                        </select>

                        <span className="text-danger m-0">{selectMessage}</span>
                      </div>
                    </div>
                  </fieldset>
                </form>

                {cameraNames && selectedIndustryId ? (
                  <form>
                    <fieldset>
                      <FormLegend msg={"Select Camera"} />
                      <div className="row g-3">
                        {/* ================*/}
                        <div className="col-12">
                          <select
                            required
                            defaultValue={""}
                            className="form-select mb-2"
                            ref={refSelectedCamera}
                            onChange={handleSelectedCamera}
                          >
                            <option value="">Select Camera</option>
                            {cameraNames ? (
                              cameraNames.map((camera) => {
                                return (
                                  <option key={camera._id} value={camera._id}>
                                    {camera.camera_ip}
                                  </option>
                                );
                              })
                            ) : (
                              <option disabled value="loading">
                                {cameraInputMessage}
                              </option>
                            )}
                          </select>

                          <span className="text-danger m-0">
                            {selectMessage}
                          </span>
                        </div>
                        {/* ================*/}

                        {selectedCameraId ? (
                          <div className="col-12">
                            <div className="d-flex justify-content-end py-2">
                              <button
                                className="btn btn-secondary me-3"
                                onClick={(e) => {
                                  e.preventDefault();
                                  refSelectedIndustry.current.value = "";
                                  setSelectedCameraId("");
                                  setSelectedIndustryId("");
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="btn btn-danger"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={handleDelete}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                        {/* ================*/}
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

      {/* delete conformation model  */}
      {selectedIndustryId ? (
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog ">
            <div className="modal-content ">
              <div className="modal-body ">
                <p className="m-0">
                  Are you sure you want to delete
                  <span className="fw-bolder">
                    {` camera ip: ${selectedCameraName} ` || "------"}
                  </span>
                  permanently.
                </p>
              </div>
              <div className="modal-footer ">
                {deleteMessage ? (
                  <div
                    className="alert alert-success w-100 mb-2 py-2"
                    role="alert"
                  >
                    {deleteMessage}
                  </div>
                ) : (
                  <></>
                )}
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  data-bs-dismiss="modal"
                >
                  cancel
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default DeleteCamera;
