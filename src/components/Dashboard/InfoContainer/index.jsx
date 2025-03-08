import React from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import "./InfoContainer.scss";

const getCamelCaseStr = (str) =>
  str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();

const getStartBorderColor = (key) => {
  return key === "online"
    ? "success"
    : key === "offline"
    ? "danger"
    : key === "delay"
    ? "warning"
    : key === "inactive"
    ? "info"
    : "light";
};

const Info = ({ industries, devices, status, path, headingTxt }) => {
  const mainStatus = {};
  if (status?.inactive) mainStatus.inactive = status.inactive;
  if (status?.delay) mainStatus.delay = status.delay;
  if (status?.offline) mainStatus.offline = status.offline;
  if (status?.online) mainStatus.online = status.online;

  const restStatus = {};
  Object.entries(status).forEach(([key, val]) => {
    if (
      key !== "inactive" &&
      key !== "online" &&
      key !== "offline" &&
      key !== "delay"
    ) {
      restStatus[key] = val;
    }
  });
  const navigate = useNavigate();
  return (
    <>
      <div className="col-12 pt-2">
        <div className=" rounded-2 p-3 bg-light infocontainer position-relative ">
          {/* <span
            className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-white text-dark border border-dark "
            style={{ letterSpacing: "1.5px" }}
          >
            {headingTxt}
            <span className="visually-hidden">unread messages</span>
          </span> */}
          <h5 className="mt-1">
            Total Industries ( <span>{industries} )</span>
          </h5>
          {headingTxt === "ALL" ? (
            <p className="m-0">
              Monitoring Stations ( <span>{devices} )</span>
            </p>
          ) : (
            <></>
          )}
          <div className="row g-3 mt-1">
            {mainStatus?.online ? (
              <div className="col-4" key={nanoid()}>
                <div
                  className={`rounded-1 border-1 border border-${getStartBorderColor(
                    "online"
                  )} bg-light py-2 px-2 h-100`}
                >
                  <p className="m-0 text-center" style={{ letterSpacing: 0.6 }}>
                    Online Stations ( {mainStatus?.online} )
                  </p>
                </div>
              </div>
            ) : null}
             {mainStatus?.offline ? (
              <div className="col-4" key={nanoid()}>
                <div
                  className={`rounded-1 border-1 border border-${getStartBorderColor(
                    "offline"
                  )} bg-light py-2 px-2 h-100`}
                >
                  <p className="m-0 text-center" style={{ letterSpacing: 0.6 }}>
                    Offline Stations ( {mainStatus?.offline} )
                  </p>
                </div>
              </div>
            ) : null}
            {mainStatus?.delay ? (
              <div className="col-4" key={nanoid()}>
                <div
                  className={`rounded-1 border-1 border border-${getStartBorderColor(
                    "delay"
                  )} bg-light py-2 px-2 h-100`}
                >
                  <p className="m-0 text-center" style={{ letterSpacing: 0.6 }}>
                    Delay Stations ( {mainStatus?.delay} )
                  </p>
                </div>
              </div>
            ) : null}
             {/* {mainStatus?.inactive ? (
              <div className="col-6" key={nanoid()}>
                <div
                  className={`rounded-1 border-1 border border-${getStartBorderColor(
                    "inactive"
                  )} bg-light py-2 px-2 h-100`}
                >
                  <p className="m-0 text-center" style={{ letterSpacing: 0.6 }}>
                    Inactive Stations ( {mainStatus?.inactive} )
                  </p>
                </div>
              </div>
            ) : null} */}
            {Object.entries(restStatus).map(([keyName, keyValue]) => (
              <div className="col-6" key={nanoid()}>
                <div
                  className={`rounded-1 border-1 border border-${getStartBorderColor(
                    keyName
                  )} bg-light py-0 px-2 h-100`}
                >
                  <p className="m-0 text-center" style={{ letterSpacing: 0.6 }}>
                    {getCamelCaseStr(keyName.split("_").join(" "))} : {keyValue}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {path ? (
            <button
              onClick={() => navigate(path)}
              className="btn btn-dark mt-3 w-100"
            >
              Detailed Status
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

const InfoContainer = ({ allIndustriesinfo, pathStr }) => {
  return allIndustriesinfo ? (
    <>
      <Info
        industries={allIndustriesinfo.industries}
        devices={allIndustriesinfo.devices}
        status={allIndustriesinfo.more_data}
        path={"industrystatus-report"}
        headingTxt={"ALL"}
      />
      {/* <Info
        industries={allIndustriesinfo.industriesOnCpcb}
        devices={allIndustriesinfo.devicesOnCpcb}
        status={allIndustriesinfo.more_data_cpcb}
        path={"industrystatus-report-cpcb"}
        headingTxt={"CPCB"}
      />
      <Info
        industries={allIndustriesinfo.industriesOnSpcb}
        devices={allIndustriesinfo.devicesOnSpcb}
        status={allIndustriesinfo.more_data_spcb}
        path={"industrystatus-report-spcb"}
        headingTxt={"SPCB"}
      /> */}
    </>
  ) : (
    <>
      <Info
        industries={"---"}
        devices={"---"}
        status={{ online: "---", offline: "---" }}
        path={""}
        headingTxt={"ALL"}
      />
      {/* <Info
        industries={"---"}
        devices={"---"}
        status={{ online: "---", offline: "---" }}
        path={""}
        headingTxt={"CPCB"}
      />
      <Info
        industries={"---"}
        devices={"---"}
        status={{ online: "---", offline: "---" }}
        path={""}
        headingTxt={"SPCB"}
      /> */}
    </>
  );
};

export default InfoContainer;
