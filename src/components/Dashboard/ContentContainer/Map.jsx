import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import {
  LoadScript,
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import all from "../../../images/location/all.svg";
import purple from "../../../images/location/purple.svg";
import blue from "../../../images/location/blue.svg";
import green from "../../../images/location/green.svg";
import light_blue from "../../../images/location/light_blue.svg";
import orange from "../../../images/location/orange.svg";
import red from "../../../images/location/red.svg";
import yellow from "../../../images/location/yellow.svg";
import black from "../../../images/location/black.svg";
import axios from "axios";
import { useGlobalContext } from "../../../context";

function Map() {
  const [activeMarker, setActiveMarker] = useState(null);
  const [activeMarkerIncicator, setActiveMarkerIncicator] = useState("all");

  const { mapMessage, markersData, markers, setMarkers } = useGlobalContext();

  const [markerData, setMarkerData] = useState("");
  const [markerDataMessage, setMarkerDataMessage] = useState("Loading..");

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  const filterData = (val) => {
    if (val !== "all") {
      const filteredData = markersData.filter(
        (marker) => marker.industry_state === val
      );
      setMarkers(filteredData);
      setActiveMarkerIncicator(val);
    } else {
      setMarkers(markersData);
      setActiveMarkerIncicator(val);
    }
  };

  const getDataCount = (val) => {
    if (val === "all") {
      return markersData.length;
    } else {
      return markersData.filter((marker) => marker.industry_state === val)
        .length;
    }
  };

  const getActiveMarkerDeviceData = async (device) => {
    device = device.slice(device.indexOf("(") + 1, device.indexOf(")"));
    try {
      setMarkerDataMessage("Loading..");
      const result = await axios(`${window.apiURL}/device_data/${device}`);
      if (result.data.values.length > 0) {
        setMarkerDataMessage("");
        setMarkerData(result.data.values);
      } else {
        setMarkerDataMessage("NO Data Available");
      }
    } catch (error) {
      setMarkerDataMessage(error.message);
    }
  };

  return (
    <>
      <div className="row g-3 pt-3">
        {mapMessage ? (
          mapMessage === "Loading..." ? (
            <h5 className="text-center py-4">{mapMessage}</h5>
          ) : (
            <h6 className="text-center py-4 text-danger">{mapMessage}</h6>
          )
        ) : (
          <>
            <div className="col-9">
              <div className="h-100">
                <LoadScript googleMapsApiKey="AIzaSyDz_PeIxvU7F6KClXx_nrupzKuFzc4FGNI">
                  <GoogleMap
                    onLoad={handleOnLoad}
                    onClick={() => setActiveMarker(null)}
                    defaultCenter={{ lat: 35.6358345, lng: 78.6683933 }}
                    defaultZoom={5}
                    mapContainerStyle={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <MarkerClusterer>
                      {(clusterer) =>
                        markers.map((marker) => (
                          <Marker
                            key={nanoid()}
                            position={marker.position}
                            clusterer={clusterer}
                            icon={{
                              url:
                                marker.industry_state === "online"
                                  ? green
                                  : marker.industry_state === "offline"
                                  ? red
                                  : marker.industry_state === "delay"
                                  ? orange
                                  : marker.industry_state === "maintainance"
                                  ? blue
                                  : marker.industry_state === "shutdown"
                                  ? purple
                                  : marker.industry_state ===
                                    "seasonal_shutdown"
                                  ? yellow
                                  : marker.industry_state === "closed_by_cpcb"
                                  ? light_blue
                                  : black,
                            }}
                            onClick={() => {
                              getActiveMarkerDeviceData(marker.name);
                              handleActiveMarker(marker.id);
                            }}
                          >
                            {activeMarker === marker.id ? (
                              <InfoWindow
                                position={marker.position}
                                onCloseClick={() => setActiveMarker(null)}
                              >
                                <div className="d-flex flex-column align-items-center justify-content-center bg-light p-2 ms-1">
                                  <h6 className="mb-1">{marker.name}</h6>
                                  <div className="d-flex flex-column align-items-center justify-content-center">
                                    {markerDataMessage ? (
                                      <p>{markerDataMessage}</p>
                                    ) : (
                                      <div>
                                        <p className="text-center text-primary">
                                          As on{" "}
                                          {markerData[0].created_at === "never"
                                            ? "n/a"
                                            : `${
                                                markerData[0].created_at.split(
                                                  "T"
                                                )[0]
                                              } ${markerData[0].created_at.slice(
                                                markerData[0].created_at.indexOf(
                                                  "T"
                                                ) + 1,
                                                markerData[0].created_at.indexOf(
                                                  "+"
                                                )
                                              )}`}
                                        </p>
                                        {markerData.map((item) => (
                                          <p
                                            key={nanoid()}
                                            className="d-inline-block mb-1 mx-2"
                                          >
                                            <span className="fw-bold">
                                              {item.parameter_name}
                                            </span>{" "}
                                            : <span>{item.value}</span>{" "}
                                            <span>{item.parameter_unit}</span>
                                          </p>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </InfoWindow>
                            ) : null}
                          </Marker>
                        ))
                      }
                    </MarkerClusterer>
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
            <div className="col-3">
              <div className="row g-2">
                <div className="col-12">
                  <button
                    onClick={() => filterData("all")}
                    className={`w-100 h-100 btn px-3 py-2 bg-light ${
                      activeMarkerIncicator === "all"
                        ? "border border-1 border-secondary"
                        : ""
                    }`}
                  >
                    <div className="d-flex align-items-center justify-content-start">
                      <img width={"20px"} className="me-3" src={all} alt="" />

                      <p className="m-0 text-start">
                        all {`(${getDataCount("all")})`}
                      </p>
                    </div>
                  </button>
                </div>
                <div className="col-12">
                  <button
                    onClick={() => filterData("online")}
                    className={`w-100 h-100 btn px-3 py-2 bg-light ${
                      activeMarkerIncicator === "online"
                        ? "border border-1 border-secondary"
                        : ""
                    }`}
                  >
                    <div className="d-flex align-items-center justify-content-start">
                      <img width={"20px"} className="me-3" src={green} alt="" />

                      <p className="m-0 text-start">
                        online {`(${getDataCount("online")})`}
                      </p>
                    </div>
                  </button>
                </div>
                <div className="col-12">
                  <button
                    onClick={() => filterData("offline")}
                    className={`w-100 h-100 btn px-3 py-2 bg-light ${
                      activeMarkerIncicator === "offline"
                        ? "border border-1 border-secondary"
                        : ""
                    }`}
                  >
                    <div className="d-flex align-items-center justify-content-start">
                      <img width={"20px"} className="me-3" src={red} alt="" />

                      <p className="m-0 text-start">
                        offline {`(${getDataCount("offline")})`}
                      </p>
                    </div>
                  </button>
                </div>
                <div className="col-12">
                  <button
                    onClick={() => filterData("delay")}
                    className={`w-100 h-100 btn px-3 py-2 bg-light ${
                      activeMarkerIncicator === "delay"
                        ? "border border-1 border-secondary"
                        : ""
                    }`}
                  >
                    <div className="d-flex align-items-center justify-content-start">
                      <img
                        width={"20px"}
                        className="me-3"
                        src={orange}
                        alt=""
                      />

                      <p className="m-0 text-start">
                        delay {`(${getDataCount("delay")})`}
                      </p>
                    </div>
                  </button>
                </div>
                <div className="col-12">
                  <button
                    onClick={() => filterData("maintainance")}
                    className={`w-100 h-100 btn px-3 py-2 bg-light ${
                      activeMarkerIncicator === "maintainance"
                        ? "border border-1 border-secondary"
                        : ""
                    }`}
                  >
                    <div className="d-flex align-items-center justify-content-start">
                      <img width={"20px"} className="me-3" src={blue} alt="" />

                      <p className="m-0 text-start">
                        maintainance {`(${getDataCount("maintainance")})`}
                      </p>
                    </div>
                  </button>
                </div>
                <div className="col-12">
                  <button
                    onClick={() => filterData("shutdown")}
                    className={`w-100 h-100 btn px-3 py-2 bg-light ${
                      activeMarkerIncicator === "shutdown"
                        ? "border border-1 border-secondary"
                        : ""
                    }`}
                  >
                    <div className="d-flex align-items-center justify-content-start">
                      <img
                        width={"20px"}
                        className="me-3"
                        src={purple}
                        alt=""
                      />

                      <p className="m-0 text-start">
                        shutdown {`(${getDataCount("shutdown")})`}
                      </p>
                    </div>
                  </button>
                </div>
                <div className="col-12">
                  <button
                    onClick={() => filterData("seasonal_shutdown")}
                    className={`w-100 h-100 btn px-3 py-2 bg-light ${
                      activeMarkerIncicator === "seasonal_shutdown"
                        ? "border border-1 border-secondary"
                        : ""
                    }`}
                  >
                    <div className="d-flex align-items-center justify-content-start">
                      <img
                        width={"20px"}
                        className="me-3"
                        src={yellow}
                        alt=""
                      />

                      <p className="m-0 text-start">
                        seasonal shutdown{" "}
                        {`(${getDataCount("seasonal_shutdown")})`}
                      </p>
                    </div>
                  </button>
                </div>
                <div className="col-12">
                  <button
                    onClick={() => filterData("closed_by_cpcb")}
                    className={`w-100 h-100 btn px-3 py-2 bg-light ${
                      activeMarkerIncicator === "closed_by_cpcb"
                        ? "border border-1 border-secondary"
                        : ""
                    }`}
                  >
                    <div className="d-flex align-items-center justify-content-start">
                      <img
                        width={"20px"}
                        className="me-2"
                        src={light_blue}
                        alt=""
                      />

                      <p className="m-0 text-start">
                        closed by cpcb {`(${getDataCount("closed_by_cpcb")})`}
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Map;
