import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import FormLegend from "../../../components/IndustryDashboard/FormLegend";

const DeleteUser = () => {
  const [userNames, setUserNames] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUsername, setSelectedUsername] = useState("");
  const [inputMessage, setInputMessage] = useState("Loading...");
  const [selectMessage, setSelectMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const refSelectedUser = useRef("");

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
        const res = await axios(`${window.apiURL}/user_names`);
        setUserNames(res.data.data.user_names);
      } catch (error) {
        setInputMessage(`Somthing went wrong ${error.message}`);
      }
    }
    fetchData();
  }, [deleteMessage]);

  const handleSelectedUser = (e) => {
    e.preventDefault();
    setSelectedUserId(refSelectedUser.current.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!selectedUserId) {
      setSelectMessage("Please select Username");
    } else {
      try {
        const res = await axios(`${window.apiURL}/users/${selectedUserId}`);
        setSelectedUsername(res.data.data.user.username);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleDeleteConfirm = async () => {
    setDeleteMessage("processing...");
    try {
      const res = await axios.delete(
        `${window.apiURL}/users/${selectedUserId}`
      );
      if (res.status === 204) {
        setDeleteMessage("Deleted successfully!");
        refSelectedUser.current.value = "DEFAULT_User";
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
                    <FormLegend msg={"Select User"} />
                    <div className="row g-3">
                      {/* ================*/}
                      <div className="col-12">
                        <select
                          required
                          defaultValue={"DEFAULT_User"}
                          className="form-select mb-2"
                          ref={refSelectedUser}
                          onChange={handleSelectedUser}
                        >
                          <option disabled value="DEFAULT_User">
                            Select user
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
                              {inputMessage}
                            </option>
                          )}
                        </select>

                        <span className="text-danger m-0">{selectMessage}</span>
                      </div>
                      {/* ================*/}
                      {selectedUserId ? (
                        <div className="col-12">
                          <div className="d-flex justify-content-end py-2">
                            <button
                              className="btn btn-secondary me-3"
                              onClick={() => {
                                refSelectedUser.current.value = "DEFAULT_User";
                                setSelectedUserId("");
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
      {selectedUserId ? (
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
                    {` ${selectedUsername} ` || "------"}
                  </span>
                  user permanently.
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

export default DeleteUser;
