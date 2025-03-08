import React from "react";
import { useRef } from "react";
import FormLegend from "../../../components/IndustryDashboard/FormLegend";

const CreateNewStation = () => {
  const refName = useRef(null);
  const refLocatiion = useRef(null);
  const refDevice = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataObj = {
      name: refName.current.value,
      location: refLocatiion.current.value,
      Device: refDevice.current.value,
    };
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
                    <FormLegend msg={"Create New Station"} />
                    <div className="row g-3">
                      {/* ============================================= */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refName}
                          required
                          type="text"
                          className="form-control"
                          placeholder="Name ======="
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refLocatiion}
                          type="text"
                          className="form-control"
                          placeholder="Location ======="
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refDevice}
                          type="text"
                          className="form-control"
                          placeholder="Devices ======="
                        ></input>
                      </div>
                      {/* ============================================= */}
                      {/* col-10  */}
                      <div className="col-9 col-sm-10 col-xl-11">
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
                      </div>
                      {/* col-10  */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Price"
                        ></input>
                      </div>
                      {/* col-10  */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <select
                          defaultValue={"DEFAULT_Model"}
                          className="form-select"
                        >
                          <option disabled value="DEFAULT_Model">
                            Select a Model *
                          </option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      {/* col-2 */}
                      <div className="col-3 col-sm-2 col-xl-1">
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#createModelContainer"
                        >
                          New
                        </button>
                      </div>
                      {/* col-10  */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <select
                          defaultValue={"DEFAULT_Status"}
                          className="form-select"
                        >
                          <option disabled value="DEFAULT_Status">
                            Select a Status *
                          </option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      {/* col-2 */}
                      <div className="col-3 col-sm-2 col-xl-1">
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#createStatusContainer"
                        >
                          New
                        </button>
                      </div>

                      {/* col-10  */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                        ></input>
                      </div>
                      {/* col-10  */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Station Name"
                        ></input>
                      </div>
                      {/* col-10  */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          className="form-control"
                          placeholder="Select Date"
                          type="text"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                        ></input>
                      </div>
                      {/* col-10  */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <select
                          defaultValue={"DEFAULT_supplier"}
                          className="form-select"
                        >
                          <option disabled value="DEFAULT_supplier">
                            Select a Supplier
                          </option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      {/* col-2 */}
                      <div className="col-3 col-sm-2 col-xl-1">
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#createSupplierContainer"
                        >
                          New
                        </button>
                      </div>

                      {/* col-10  */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Station Tag"
                        ></input>
                      </div>
                      {/* col-10  */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Purchase Cost"
                        ></input>
                      </div>
                      {/* col-10  */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Warranty"
                        ></input>
                      </div>
                      {/* col-10  */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Note"
                        ></textarea>
                      </div>
                      {/* col-10  */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <select
                          defaultValue={"DEFAULT_location"}
                          className="form-select"
                        >
                          <option disabled value="DEFAULT_location">
                            Select a Location
                          </option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      {/* col-2 */}
                      <div className="col-3 col-sm-2 col-xl-1">
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#createLocationContainer"
                        >
                          New
                        </button>
                      </div>
                      {/* col-10  */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="requestable"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="requestable"
                          >
                            Requestable
                          </label>
                        </div>
                      </div>
                      {/* col-10  */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input type="file" name="file" />
                      </div>
                      {/* col-10  */}
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

export default CreateNewStation;
