import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import FormLegend from "../../../components/IndustryDashboard/FormLegend";

const DeleteParameter = () => {
  const [parameterNames, setParameterNames] = useState("");
  const [selectedParameterId, setSelectedParameterId] = useState("");
  const [selectedParameterName, setSelectedParameterName] = useState("");
  const [inputMessage, setInputMessage] = useState("Loading...");
  const [selectMessage, setSelectMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const refSelectedParameter = useRef("");

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
        const res = await axios(`${window.apiURL}/parameters`);
        setParameterNames(res.data.data.parameters);
      } catch (error) {
        setInputMessage(`Somthing went wrong ${error.message}`);
      }
    }
    fetchData();
  }, [deleteMessage]);

  const handleSelectedIndustry = (e) => {
    e.preventDefault();
    setSelectedParameterId(refSelectedParameter.current.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!selectedParameterId) {
      setSelectMessage("Please select industry");
    } else {
      try {
        const res = await axios(
          `${window.apiURL}/parameters/${selectedParameterId}`
        );
        setSelectedParameterName(res.data.data.parameter.parameter_name);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleDeleteConfirm = async () => {
    setDeleteMessage("processing...");
    try {
      const res = await axios.delete(
        `${window.apiURL}/parameters/${selectedParameterId}`
      );
      if (res.status === 204) {
        setDeleteMessage("Deleted successfully!");
        refSelectedParameter.current.value = "";
      }
    } catch (error) {
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
                <form>
                  <fieldset>
                    <FormLegend msg={"Select Parameter"} />
                    <div className="row g-3">
                      {/* ================*/}
                      <div className="col-12">
                        <select
                          required
                          defaultValue={""}
                          className="form-select mb-2"
                          ref={refSelectedParameter}
                          onChange={handleSelectedIndustry}
                        >
                          <option disabled value="">
                            Select industry
                          </option>
                          {parameterNames ? (
                            parameterNames.map((name) => {
                              return (
                                <option key={name._id} value={name._id}>
                                  {name.parameter_name}
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
                      {/* ================*/}
                      {selectedParameterId ? (
                        <div className="col-12">
                          <div className="d-flex justify-content-end py-2">
                            <button
                              className="btn btn-secondary me-3"
                              onClick={() => {
                                refSelectedParameter.current.value = "";
                                setSelectedParameterId("");
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* delete conformation model  */}
      {selectedParameterId ? (
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
                    {` ${selectedParameterName} ` || "------"}
                  </span>
                  parameter permanently.
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

export default DeleteParameter;
