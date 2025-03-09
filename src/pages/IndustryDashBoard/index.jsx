import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

import Filter from "../../components/Dashboard/Filter";
// import Nav from "../../components/IndustryDashboard/Nav";
import IndustryInfo from "../../components/IndustryDashboard/IndustryInfo";
import LoggerDataBox from "../../components/IndustryDashboard/LoggerDataBox";
import Spinner from "../../components/Spinner";

const Model = ({ txt, data }) => {
  const [showModel, setShowModel] = useState(true);
  return (
    <div
      className={showModel ? "modal fade show" : "d-none"}
      id="staticBackdropLive"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLiveLabel"
      aria-modal="true"
      role="dialog"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        background: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(5px)",
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body d-flex align-items-center justify-content-center flex-column">
            <p className="fw-bold text-danger fs-5">{txt}</p>
            <p className="fw-bold fs-6">
              Expired Parameters :{" "}
              {data.reduce(function (total, obj) {
                return total + " " + obj.parameterStr;
              }, "")}
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => setShowModel(false)}
            >
              close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const IndustryDashboard = () => {
  const { industry_name } = useParams();

  const [errorindustryData, setErrorindustryData] = useState("");
  const [selectedIndustriesId, setSelectedIndustriesId] = useState("");
  const [industriesNames, setIndustriesNames] = useState(null);
  const [allState, setAllState] = useState(null);
  const [allCategories, setAllCategories] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [values, setValues] = useState(null);

  const {
    userType,
    username,
    userIndustryName,
    userFrom,
    userTill,
    userSubscribtion,
    messageindustryData,
    allDevices,
    setSelectedIndustriesName,
    industriesData,
    setAllDevices,
    setMessageindustryData,
    setDeviceNameForGraph,
    setIndustriesData,
  } = useGlobalContext();

  const isUserSubscribtion = (subscribtionArr) => {
    const hold = { subscribtion: true, data: [] };
    for (let i = 0; i < subscribtionArr.length; i++) {
      const { from, till, parameters } = subscribtionArr[i];
      const parameterStr = parameters.join(" ");
      const fromTime = new Date(from).getTime();
      const tillTime = 1000 * 60 * 60 * 24 * Number(till);
      const currTime = new Date().getTime();
      if (currTime > fromTime + tillTime) {
        hold.subscribtion = false;
        hold.data.push({
          from,
          till,
          parameterStr,
        });
      }
    }
    return hold;
  };

  const getDataObj = (arr) => {
    let counter = {};
    arr.forEach((element) => {
      counter[element] = (counter[element] || 0) + 1;
    });
    return counter;
  };

  useEffect(() => {
    const setDataToGraphDeviceName = async () => {
      try {
        const result = await axios(
          `${window.apiURL}/industries/${industry_name}`
        );
        setIndustriesData(result.data.data.industry);
        setAllDevices(result.data.data.industry.devices);
        setDeviceNameForGraph(result.data.data.industry.devices);
        setMessageindustryData("");
      } catch (error) {
        console.log(error.message);
      }
    };
    setDataToGraphDeviceName();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (userType === "partner") {
          const result = await axios(
            `${window.apiURL}/industries?industry_partner=${username}`
          );
          let states = [];
          let categories = [];
          let industriesName = [];
          result.data.data.industries.forEach(
            ({ state, industry_category, industry_name, _id }) => {
              if (industry_name)
                industriesName.push({
                  industry_name,
                  state,
                  industry_category,
                  industry_id: _id,
                });
              if (state) states.push(state);
              if (industry_category) categories.push(industry_category);
            }
          );
          setIndustriesNames(industriesName);
          setAllState(getDataObj(states));
          setAllCategories(getDataObj(categories));
        } else if (userType === "client") {
          const result = await axios(
            `${window.apiURL}/industries?industry_name=${userIndustryName}`
          );
          let states = [];
          let categories = [];
          let industriesName = [];
          result.data.data.industries.forEach(
            ({ state, industry_category, industry_name, _id }) => {
              if (industry_name)
                industriesName.push({
                  industry_name,
                  state,
                  industry_category,
                  industry_id: _id,
                });
              if (state) states.push(state);
              if (industry_category) categories.push(industry_category);
            }
          );
          setIndustriesNames(industriesName);
          setAllState(getDataObj(states));
          setAllCategories(getDataObj(categories));
        } else {
          const result = await axios(`${window.apiURL}/industries`);
          let states = [];
          let categories = [];
          let industriesName = [];
          result.data.data.industries.forEach(
            ({ state, industry_category, industry_name, _id }) => {
              if (industry_name)
                industriesName.push({
                  industry_name,
                  state,
                  industry_category,
                  industry_id: _id,
                });
              if (state) states.push(state);
              if (industry_category) categories.push(industry_category);
            }
          );
          setIndustriesNames(industriesName);
          setAllState(getDataObj(states));
          setAllCategories(getDataObj(categories));
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (allDevices) {
        setValues("");
        const devices = allDevices
          .map((device) => device.device_name)
          .join("+");
        try {
          const result = await axios(`${window.apiURL}/device_data/${devices}`);
          setValues(result.data.values);
          // console.log(devices)
          if (result.data.values.length > 0) {
            setMessageindustryData("");
            setErrorindustryData("");
          }
        } catch (error) {
          setMessageindustryData("");
          error.response.data.message
            ? setErrorindustryData(`ERROR: ${error.response.data.message}`)
            : setErrorindustryData(`Something went wrong: ${error.message}`);
        }
      }
    })();
  }, [industriesData, allDevices, selectedIndustriesId]);

  return (
    <div className="container-fluid p-3">
      {/* {!isUserSubscribtion(userSubscribtion).subscribtion ? (
        <Model
          txt={"Renew your account"}
          data={isUserSubscribtion(userSubscribtion).data}
        />
      ) : null} */}

      <div className="row g-3">
        {userType !== "client" ? (
          <div className="col-12">
            <div className="row g-3">
              <Filter
                industriesNames={industriesNames}
                allState={allState}
                allCategories={allCategories}
                errorMessage={errorMessage}
                industriesData={industriesData}
                setIndustriesData={setIndustriesData}
                setSelectedIndustriesId={setSelectedIndustriesId}
                setSelectedIndustriesName={setSelectedIndustriesName}
                setAllDevices={setAllDevices}
                setErrorindustryData={setErrorindustryData}
                setMessageindustryData={setMessageindustryData}
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        {messageindustryData ? (
          <>
            <div className="col-12">
              <div className="row g-4">
                <div className="col-12">
                  <div className="alert alert-primary" role="alert">
                    {messageindustryData}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : errorindustryData ? (
          <>
            <div className="col-12">
              <div className="row g-4">
                <div className="col-12">
                  <div className="alert alert-danger" role="alert">
                    {errorindustryData}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-12">
              <div className="row g-4">
                <div
                  className="pt-2"
                  style={{
                    position: "-webkit-sticky",
                    position: "sticky",
                    top: 0,
                    // backgroundColor: "#f0f5ff",
                  }}
                >
                  {industriesData ? (
                    <IndustryInfo industriesData={industriesData} />
                  ) : (
                    <></>
                  )}
                </div>
                {values ? (
                  values.map((item, i) => {
                    return <LoggerDataBox key={i} data={item} />;
                  })
                ) : (
                  <>
                    <div className="col-3">
                      <div className="box_bg rounded-1 py-2 shadow">
                        <div className="p-4">
                          <Spinner />
                        </div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="box_bg rounded-1 py-2 shadow">
                        <div className="p-4">
                          <Spinner />
                        </div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="box_bg rounded-1 py-2 shadow">
                        <div className="p-4">
                          <Spinner />
                        </div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="box_bg rounded-1 py-2 shadow">
                        <div className="p-4">
                          <Spinner />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
        {/* <div className="col-12">
          <div className="p-2 p-sm-3 bg-white shadow mt-2">
            <Nav />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default IndustryDashboard;
