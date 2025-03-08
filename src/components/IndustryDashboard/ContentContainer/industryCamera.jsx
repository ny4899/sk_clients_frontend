import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { nanoid } from "nanoid";
import noCameraImg from "../../../images/no-camera.png";
import Spinner from "../../Spinner";

const Camera = () => {
  const { industry_name } = useParams();

  const [message, setMessage] = useState("");

  const [allData, setAllData] = useState("");
  const [allIps, setAllIps] = useState("");
  const [selectedIp, setSelectedIp] = useState("");
  const [selectedIpData, setSelectedIpData] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const result = await axios(`${window.apiURL}/camera/${industry_name}`);
        const data = result.data.data.cameras;
        const ips = data.map(({ camera_ip }) => camera_ip);
        setAllData(data);
        setAllIps(ips);
        setSelectedIpData(data[0]);
        setSelectedIp(ips[0]);
      } catch (error) {
        setMessage(error.message);
      }
    })();
  }, []);

  return (
    <div className="container-fluid py-3">
      {message ? (
        <div className="py-4">
          <h6 className="text-center">{message}</h6>
        </div>
      ) : !allIps ? (
        <div className="col-12">
          <div className="box_bg rounded-1 py-4 mt-3">
            <div className="p-4">
              <Spinner />
            </div>
          </div>
        </div>
      ) : allIps.length < 1 ? (
        <div className="box_bg rounded-1 p-3">
          <h5 className="text-center py-3">No camera on this site.</h5>
          <div className="d-flex align-items-center justify-content-center">
            <img style={{ width: "200px" }} src={noCameraImg} alt="" />
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-8">
            <iframe
              style={{ width: "100%", height: "350px" }}
              src={selectedIpData.live_stream_url}
            ></iframe>
          </div>
          <div className="col-4 p-0">
            <div className="row ">
              <div className="col-12">
                {selectedIp && allIps ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle w-100"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {selectedIp}
                    </button>
                    <ul
                      className="dropdown-menu w-100"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {allIps.map((ip) => (
                        <li key={nanoid()}>
                          <span
                            onClick={() => {
                              setSelectedIp(ip);
                              setSelectedIpData(
                                allData.filter(
                                  (item) => item.camera_ip === ip
                                )[0]
                              );
                            }}
                            className="dropdown-item"
                          >
                            {ip}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <button className="btn btn-secondary" type="button" disabled>
                    Loading...
                  </button>
                )}
              </div>
              <div className="col-12 mt-3">
                {selectedIpData ? (
                  <div className="card ">
                    <div className="card-header p-2">
                      <h6 className="mb-1">Camera Details</h6>
                    </div>
                    <div className="row ">
                      <div className="col-6 ">
                        <p className="px-2 m-0">Camera Make</p>
                      </div>
                      <div className="col-6">
                        <p className="px-2 m-0">
                          {selectedIpData.camera_company}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <p className="px-2 m-0">Camera Model No.</p>
                      </div>
                      <div className="col-6">
                        <p className="px-2 m-0">
                          {selectedIpData.model_number}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <p className="px-2 m-0">PTZ</p>
                      </div>
                      <div className="col-6">
                        <p className="px-2 m-0">
                          {selectedIpData.ptz ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <p className="px-2 m-0">10x Zoom</p>
                      </div>
                      <div className="col-6">
                        <p className="px-2 m-0">
                          {selectedIpData.zoom ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <p className="px-2 m-0">Night Vision</p>
                      </div>
                      <div className="col-6">
                        <p className="px-2 m-0">
                          {" "}
                          {selectedIpData.night_vision ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <p className="px-2 m-0">IP Camera</p>
                      </div>
                      <div className="col-6">
                        <p className="px-2 m-0">
                          {selectedIpData.ip_camera ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <p className="px-2 m-0">Connectivity Type</p>
                      </div>
                      <div className="col-6">
                        <p className="px-2 m-0">
                          {selectedIpData.connectivity_type}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <p className="px-2 m-0">Bandwidth</p>
                      </div>
                      <div className="col-6">
                        <p className="px-2 m-0">
                          {selectedIpData.bandwidth_available}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Camera;
