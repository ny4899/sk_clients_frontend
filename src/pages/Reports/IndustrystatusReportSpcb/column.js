import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { nanoid } from "nanoid";
import { useGlobalContext } from "./../../../context";

const EditButton = ({ cell }) => {
  const [deviceName, setDeviceName] = useState(null);
  const [location, setLocation] = useState(null);
  const [modalClass, setModalClass] = useState("modal");
  const [parameters, setParameters] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { userType } = useGlobalContext();

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
      if (deviceName) {
        try {
          const res = await axios(
            `${window.apiURL}/data_setting/by/device/${deviceName}`
          );
          setParameters(res.data.data.dataSettings[0].parameters);
          setModalClass("modal show d-block");
        } catch (error) {
          console.log(error.message);
        }
      }
    }
    fetchData();
  }, [deviceName]);

  const handleOnchange = (para, station, spcb) => {
    const newParaList = parameters.map((item) => {
      if (item.parameter_name === para && item.station_name === station) {
        return { ...item, to_pcb: spcb };
      } else {
        return item;
      }
    });
    setParameters(newParaList);
  };

  const handleSubmit = async (device_name) => {
    try {
      setMessage("Processing...");
      const res = await axios.post(
        `${window.apiURL}/data_setting/update/${device_name}`,
        parameters
      );
      if (res.status === 201) {
        setError("");
        setMessage("Data setting updated successfully!");
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

  if (userType !== "admin") {
    return <></>;
  }

  return (
    <>
      <div className="d-flex">
        <button
          onClick={() => {
            setDeviceName(cell.row.original.device_name);
            setLocation(
              `${cell.row.original.city || "-----"}, ${
                cell.row.original.state || "-----"
              }`
            );
          }}
          title="Edit data settings"
          className="btn btn-sm btn-warning text-white"
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
      </div>

      <div
        className={modalClass}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog shadow ">
          <div className="modal-content ">
            <div className="modal-header">
              <div>
                <h5 className="modal-title fw-bold" id="exampleModalLabel">
                  {`( ${deviceName} ) ${location}`}
                </h5>
                <p>Parameters data sending to SPCB</p>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setModalClass("modal");
                  setDeviceName(null);
                }}
              ></button>
            </div>
            <div className="modal-body">
              {parameters ? (
                parameters.map(({ parameter_name, station_name, to_pcb }) => {
                  const paraName = parameter_name.split("+")[0];
                  const stationName = station_name;
                  return (
                    <div className="form-check" key={nanoid()}>
                      <div className="row mb-2">
                        <label
                          className="col-sm-9 form-check-label text-start p-0"
                          htmlFor={paraName + stationName}
                        >
                          {paraName}
                          {"  ( "}
                          {stationName}
                          {" )"}
                        </label>
                        <div className="col-sm-3">
                          <select
                            id={paraName + stationName}
                            defaultValue={to_pcb}
                            onChange={(e) => {
                              handleOnchange(
                                parameter_name,
                                stationName,
                                e.target.value
                              );
                            }}
                            className="form-select"
                          >
                            <option value="">Select PCB</option>
                            <option value="DL">DL</option>
                            <option value="HR">HR</option>
                            <option value="PB">PB</option>
                            <option value="MAH">MAH</option>
                            <option value="RJ">RJ</option>
                            <option value="AP">AP</option>
                            <option value="MP">MP</option>
                            <option value="BH">BH</option>
                            <option value="JH">JH</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
            <div className="modal-footer">
              {message && (
                <div className="col-12">
                  <div className="alert alert-success px-2" role="alert">
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

              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setModalClass("modal");
                  setDeviceName(null);
                }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleSubmit(deviceName)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Industry name",
    accessor: "industry_name",
    Cell: ({ cell }) => {
      return (
        <Link to={`/${cell.row.original.industry_id}`}>
          {cell.row.values.industry_name}
        </Link>
      );
    },
  },
  {
    Header: "Device name",
    accessor: "device_name",
  },
  {
    Header: "Device category",
    accessor: "device_category",
  },
  {
    Header: "SPCB status",
    accessor: "status_SPCB",
  },
  {
    Header: "Address",
    accessor: "address",
  },
  {
    Header: "City",
    accessor: "city",
  },
  {
    Header: "State",
    accessor: "state",
  },
  {
    Header: "Pincode",
    accessor: "pincode",
  },
  {
    Header: "Latitude",
    accessor: "latitude",
  },
  {
    Header: "Longitude",
    accessor: "longitude",
  },
  {
    Header: "Ganga basin",
    accessor: "ganga_basin",
  },
  {
    Header: "Actions",
    accessor: "name",
    Cell: ({ cell }) => <EditButton cell={cell} />,
  },
];
