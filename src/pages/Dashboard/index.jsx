import React, { useEffect, useState } from "react";
import Filter from "../../components/Dashboard/Filter";
import Nav from "../../components/Dashboard/Nav";
import InfoContainer from "../../components/Dashboard/InfoContainer";
import axios from "axios";
import { useGlobalContext } from "../../context";

const getDataObj = (arr) => {
  let counter = {};
  arr.forEach((element) => {
    counter[element] = (counter[element] || 0) + 1;
  });
  return counter;
};

const Dashboard = () => {
  const [errorindustryData, setErrorindustryData] = useState("");
  const [industriesData, setIndustriesData] = useState("");
  const [selectedIndustriesId, setSelectedIndustriesId] = useState("");
  const [industriesNames, setIndustriesNames] = useState(null);
  const [allState, setAllState] = useState(null);
  const [allCategories, setAllCategories] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [allDevices, setAllDevices] = useState(null);

  const [values, setValues] = useState(null);
  const {
    userType,
    username,
    userIndustryName,
    allIndustriesinfo,
    filterSelectedIndustry,
    filterSelectedCategory,
    setAllIndustriesinfo,
    setSelectedIndustriesName,
    setMessageindustryData,
    setMapMessage,
    setMarkersData,
    setMarkers,
    setFilterSelectedIndustry,
    setFilterSelectedCategory,
    setDeviceNameForGraph,
  } = useGlobalContext();

  useEffect(() => {
    setFilterSelectedIndustry(null);
    setFilterSelectedCategory(null);
    setDeviceNameForGraph([])
    setAllDevices([])
  }, []);

  const fetchAndSetData = async () => {
    try {
      let url = "";
      if (userType === "admin" || userType === "serviceengineer") {
        url = `${window.apiURL}/industries_status?`;
      } else {
        url = `${window.apiURL}/industries_status?industry_partner=${username}&`;
      }
      if (filterSelectedIndustry && filterSelectedCategory) {
        url = `${url}state=${filterSelectedIndustry}&industry_category=${filterSelectedCategory}`;
      } else if (filterSelectedIndustry) {
        url = `${url}state=${filterSelectedIndustry}`;
      } else if (filterSelectedCategory) {
        url = `${url}industry_category=${filterSelectedCategory}`;
      }
      const res = await axios(url);
      const infoData = {
        industries: res.data.total_industries,
        industriesOnCpcb: res.data.total_industries_cpcb,
        industriesOnSpcb: res.data.total_industries_spcb,
        devices: res.data.total_devices,
        devicesOnCpcb: res.data.total_devices_cpcb,
        devicesOnSpcb: res.data.total_devices_spcb,
        more_data: res.data.more_data,
        more_data_cpcb: res.data.more_data_cpcb,
        more_data_spcb: res.data.more_data_spcb,
      };
      setMapMessage("");
      setMarkersData(res.data.results);
      setMarkers(res.data.results);
      setAllIndustriesinfo(infoData);
    } catch (error) {
      setMapMessage(`Something went wrong: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchAndSetData();
  }, [filterSelectedIndustry, filterSelectedCategory]);

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
      if (industriesData && allDevices) {
        const devices = allDevices.map((device) => device.device_name);
        const responses = [];
        for (let i = 0; i < devices.length; i++) {
          try {
            const result = await axios(
              `${window.apiURL}/device_data/${devices[i]}`
            );
            result.data.values.forEach((item) => {
              responses.push(item);
            });
          } catch (error) {
            error.response.data.message
              ? setErrorindustryData(`ERROR: ${error.response.data.message}`)
              : setErrorindustryData(`Something went wrong: ${error.message}`);
          }
        }
        setValues(responses);
        if (responses.length > 0) {
          setErrorindustryData("");
        }
      }
    })();
  }, [industriesData, allDevices, selectedIndustriesId]);

  return (
    <div className="container-fluid p-3">
      <div className="row g-3">
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
        <div className="col-12">
          <div className="row g-3">
            <InfoContainer
              allIndustriesinfo={allIndustriesinfo}
            />
          </div>
        </div>
        <div className="col-12">
          <div className="p-2 p-sm-3 bg-white shadow">
            <Nav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
