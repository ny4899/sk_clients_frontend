import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import dateformat from "dateformat";
import { nanoid } from "nanoid";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useReactToPrint } from "react-to-print";
import Select from "react-select";
import noDataImg from "../../../images/cloud.png";
import "./data.scss";
import {
  exportComponentAsPNG,
  exportComponentAsPDF,
  exportComponentAsJPEG,
} from "react-component-export-image";
import { useGlobalContext } from "../../../context";
import LineChart from "../../../common/LineChart";
import Spinner from "../../Spinner";
import NoData from "../../NoData";

const getDataSet = (arr) => {
  const colorArr = [
    "#7FFFD4",
    "#C19A6B",
    "#7F4E52",
    "#00008B",
    "#FFA500",
    "#DF73D4",
    "#800080",
    "#00FF00",
    "#FF00FF",
    "#FF0000",
  ];
  let hold = {};
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    const data = arr[i];
    for (const key in data) {
      if (!hold[key]) {
        hold[key] = true;
      } else if (key !== "createdAt") {
      }
      hold[key] = true;
    }
  }

  for (const key in hold) {
    if (key !== "createdAt") {
      result.push({
        label: key,
        data: arr.map((data) => data[key]),
        backgroundColor: ["#ecf0f1"],
        borderColor: colorArr.pop() || "#000000",
        borderWidth: 1,
      });
    }
  }
  return result;
};
const getDataSetWithCreatedAt = (arr) => {
  const colorArr = [
    "#7FFFD4",
    "#C19A6B",
    "#7F4E52",
    "#00008B",
    "#FFA500",
    "#DF73D4",
    "#800080",
    "#00FF00",
    "#FF00FF",
    "#FF0000",
  ];
  let hold = {};
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    const data = arr[i];
    for (const key in data) {
      hold[key] = true;
    }
  }

  for (const key in hold) {
    result.push({
      label: key,
      data: arr.map((data) => data[key]),
      backgroundColor: ["#ecf0f1"],
      borderColor: colorArr.pop() || "#000000",
      borderWidth: 1,
    });
  }
  return result;
};

const fillNotAvailableDataWithNA = (data) => {
  const arrOfVal = getDataSet(data);
  let result = [];
  for (let i = 0; i < data.length; i++) {
    let hold = {};
    let allLabel = arrOfVal.map((item) => item.label);
    for (const [key, value] of Object.entries(data[i])) {
      delete allLabel[allLabel.indexOf(key)];

      if (typeof value === "number") {
        hold[key] = value.toFixed(2) * 1;
      } else {
        hold[key] = value;
      }
    }
    for (let i = 0; i < allLabel.length; i++) {
      hold[allLabel[i]] = "n/a";
    }
    result.push(hold);
    hold = {};
  }
  return result;
};

const Graph = () => {
  const [allDeviceAndIndustryNames, setAllDeviceAndIndustryNames] = useState(
    null
  );
  const [selectDeviceInputMessage, setSelectDeviceInputMessage] = useState(
    "Loading..."
  );
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedInterval, setSelectedInterval] = useState(15);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [chartData, setChartData] = useState(null);
  const [allData, setAllData] = useState([]);
  const chartRef = useRef(null);
  const tableRef = useRef(null);
  const tableContainerRef = useRef(null);
  const [tableView, setTableView] = useState("d-none");
  const [dataMessage, setDataMessage] = useState("");

  const refSelectedDevice = useRef(null);
  const refSelectedInterval = useRef(selectedInterval);
  const refStartDate = useRef();
  const refEndDate = useRef();
  const refStartTime = useRef();
  const refEndTime = useRef();

  const { username, userType } = useGlobalContext();

  useEffect(() => {
    async function fetchData() {
      try {
        let url = "";
        if (userType === "admin" || userType === "serviceengineer") {
          url = `${window.apiURL}/device/get_all_devices_data`;
        } else {
          url = `${window.apiURL}/device/get_all_devices_data?industry_partner=${username}`;
        }
        const res = await axios(url);
        const data = res.data.data.devices;
        setAllDeviceAndIndustryNames(data);
      } catch (error) {
        setSelectDeviceInputMessage(`Somthing went wrong ${error.message}`);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (allDeviceAndIndustryNames) {
      const max = allDeviceAndIndustryNames.length - 1;
      const min = 0;
      const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
      const randomDeviceName = allDeviceAndIndustryNames[randomNum].device_name;
      refSelectedDevice.current.value = randomDeviceName;
      setSelectedDevice(randomDeviceName);
    }
  }, [allDeviceAndIndustryNames]);

  useEffect(() => {
    if (allData.length > 0) {
      setChartData({
        labels: allData.map((data) => data.createdAt),
        // datasets: [
        //   {
        //     label: "Users Gained",
        //     data: allData.map((data) => data.BOD),
        //     backgroundColor: ["#f3ba2f", "#2a71d0"],
        //     borderColor: "black",
        //     borderWidth: 2,
        //   },
        // ],
        datasets: getDataSet(allData),
      });
    }
  }, [allData]);

  const { deviceNameForGraph, selectedIndustriesName } = useGlobalContext();
  const today = new Date();
  let todayDate =
    `${today.getDate()}`.length === 1 ? `0${today.getDate()}` : today.getDate();
  let todayMonth =
    `${today.getMonth()}`.length === 1
      ? `0${today.getMonth() + 1}`
      : today.getMonth() + 1;
  let todayYear = today.getFullYear();

  useEffect(() => {
    refStartDate.current.value = `${todayYear}-${todayMonth}-${todayDate}`;
    refEndDate.current.value = `${todayYear}-${todayMonth}-${todayDate}`;
    refStartTime.current.value = `00:00:00`;
    refEndTime.current.value = `${
      String(today.getHours()).length === 1
        ? `0${today.getHours()}`
        : today.getHours()
    }:${
      String(today.getMinutes()).length === 1
        ? `0${today.getMinutes()}`
        : today.getMinutes()
    }:${
      String(today.getSeconds()).length === 1
        ? `0${today.getSeconds()}`
        : today.getSeconds()
    }`;
    setSelectedStartDate(refStartDate.current.value);
    setSelectedEndDate(refEndDate.current.value);
    setSelectedStartTime(refStartTime.current.value);
    setSelectedEndTime(refEndTime.current.value);
  }, []);

  const getData = async (
    device,
    interval,
    startDate,
    endDate,
    startTime,
    endTime
  ) => {
    setDataMessage("Loading...");
    if (
      allDeviceAndIndustryNames &&
      device &&
      startDate &&
      endDate &&
      startTime &&
      endTime
    ) {
      try {
        const res = await axios(
          `${window.apiURL}/rawdata/${device}/${interval}/${startDate}/${endDate}/${startTime}/${endTime}`
        );
        if (res.data.status === "sucess" && res.data.data.length) {
          setDataMessage("");
          setAllData(res.data.data);
        } else {
          setDataMessage("No data available!");
        }
      } catch (error) {
        setDataMessage(error.message);
      }
    }
  };

  const handlePrint = useReactToPrint({
    content: () => chartRef.current,
  });

  useEffect(() => {
    getData(
      selectedDevice,
      selectedInterval,
      selectedStartDate,
      selectedEndDate,
      selectedStartTime,
      selectedEndTime
    );
  }, [
    selectedDevice,
    selectedInterval,
    selectedStartDate,
    selectedEndDate,
    selectedStartTime,
    selectedEndTime,
    allDeviceAndIndustryNames,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedStartDate(refStartDate.current.value);
    setSelectedEndDate(refEndDate.current.value);
    setSelectedStartTime(refStartTime.current.value);
    setSelectedEndTime(refEndTime.current.value);
    getData(
      selectedDevice,
      selectedInterval,
      selectedStartDate,
      selectedEndDate,
      selectedStartTime,
      selectedEndTime
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="row py-2 align-items-center g-3">
            <div className="col-3">
              <div className="d-flex align-items-center justify-content-end">
                {/* <div className="me-auto" style={{ width: "max-content" }}>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <span onClick={handlePrint} className="dropdown-item">
                          print
                        </span>
                      </li>
                      <li>
                        <span
                          onClick={() => exportComponentAsPNG(chartRef)}
                          className="dropdown-item"
                        >
                          Download png
                        </span>
                      </li>
                      <li>
                        <span
                          onClick={() => exportComponentAsJPEG(chartRef)}
                          className="dropdown-item"
                        >
                          Download jpeg
                        </span>
                      </li>

                      <li>
                        <DownloadTableExcel
                          filename="Log-Data"
                          currentTableRef={tableRef.current}
                        >
                          <span className="dropdown-item">Download excel</span>
                        </DownloadTableExcel>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <span
                          onClick={() => {
                            tableContainerRef.current?.scrollIntoView({
                              behavior: "smooth",
                            });
                          }}
                          className="dropdown-item"
                        >
                          View table
                        </span>
                      </li>
                    </ul>
                  </div>
                </div> */}
                <div style={{ width: "max-content" }}>
                  <select
                    onChange={() =>
                      setSelectedInterval(refSelectedInterval.current.value)
                    }
                    className="form-select"
                    defaultValue={15}
                    ref={refSelectedInterval}
                  >
                    <option value={1}>1 min</option>
                    <option value={5}>5 min</option>
                    <option value={15}>15 min</option>
                    <option value={30}>30 min</option>
                    <option value={60}>1 hours</option>
                    <option value={240}>4 hours</option>
                    <option value={480}>8 hours</option>
                    <option value={720}>12 hours</option>
                    <option value={1440}>1 day</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-9">
              <form
                onSubmit={handleSubmit}
                style={{ border: "1px solid gray" }}
              >
                <div className="row g-1 p-1 ">
                  <div className="col-10">
                    <div className="row g-1">
                      <div className="col-3">
                        <input
                          ref={refStartDate}
                          className="form-control form-control-sm"
                          type="date"
                          min={dateformat(
                            Date.now() - 1000 * 60 * 60 * 24 * 30,
                            "yyyy-mm-dd"
                          )}
                          max={dateformat(Date.now(), "yyyy-mm-dd")}
                          name=""
                        />
                      </div>
                      <div className="col-3">
                        <input
                          ref={refEndDate}
                          className="form-control form-control-sm"
                          type="date"
                          min={dateformat(
                            Date.now() - 1000 * 60 * 60 * 24 * 30,
                            "yyyy-mm-dd"
                          )}
                          max={dateformat(Date.now(), "yyyy-mm-dd")}
                          name=""
                        />
                      </div>
                      <div className="col-3">
                        <input
                          step={1}
                          ref={refStartTime}
                          className="form-control form-control-sm"
                          type="time"
                          name=""
                        />
                      </div>
                      <div className="col-3">
                        <input
                          step={1}
                          ref={refEndTime}
                          className="form-control form-control-sm"
                          type="time"
                          name=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="row g-1">
                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-sm btn-primary w-100"
                        >
                          <span
                            className="fw-bolder text-white"
                            style={{ fontSize: "12px" }}
                          >
                            Apply
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-3"></div>
        <div className="col-9">
          <select
            onChange={() => {
              setSelectedDevice(refSelectedDevice.current.value);
            }}
            ref={refSelectedDevice}
            className="form-select form-select-sm mt-2"
          >
            {allDeviceAndIndustryNames ? (
              allDeviceAndIndustryNames.map((item) => {
                return (
                  <option
                    key={`${item.device_id + item.indutry_id}`}
                    value={item.device_name}
                  >
                    {`${item.industry_name} (${item.device_name})`}
                  </option>
                );
              })
            ) : (
              <option disabled value="loading">
                {selectDeviceInputMessage}
              </option>
            )}
          </select>
        </div>

        {chartData && allData.length > 0 ? (
          <>
            <div className="col-12">
              <LineChart ref={chartRef} chartData={chartData} />
            </div>
            <div className="col-12 py-3">
              <div className="d-flex align-item-center justify-content-center">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    tableView === "d-none"
                      ? setTableView("d-block")
                      : setTableView("d-none");
                  }}
                >
                  {tableView === "d-none" ? "View Table" : "Close Table"}
                </button>
                {tableView === "d-block" ? (
                  <button className="btn btn-sm btn-info ms-3">
                    <DownloadTableExcel
                      filename="Log-Data"
                      currentTableRef={tableRef.current}
                    >
                      <span className="text-white">Download excel</span>
                    </DownloadTableExcel>
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div ref={tableContainerRef} className={`col-12 table__container `}>
              <table
                ref={tableRef}
                style={{ width: "100%" }}
                className={`${tableView}`}
              >
                <thead>
                  <tr>
                    <th
                      colSpan={getDataSetWithCreatedAt(allData).length}
                      className="py-3 table_head"
                    >
                      <h4 className="text-center">
                        Online Portal For Data Monitoring
                      </h4>
                      <p className="m-0 text-center fw-normal">
                        Industry: {selectedIndustriesName || "---"} <br />
                        {`From Date: ${selectedStartDate || "---"} ${
                          selectedStartTime || "---"
                        } To Date: ${selectedEndDate || "---"}
                        ${selectedEndTime || "---"}`}
                        <br />
                        {`Report: ${
                          selectedInterval < 60
                            ? `${selectedInterval} Mint`
                            : `${selectedInterval / 60} hour`
                        } Avg Report`}
                      </p>
                    </th>
                  </tr>
                  <tr>
                    {getDataSetWithCreatedAt(allData).map((item, i) => {
                      return item.label === "createdAt" ? (
                        <th key={nanoid()} style={{ width: "100%" }}>
                          Date / Time
                        </th>
                      ) : (
                        <th key={nanoid()} style={{ width: "100%" }}>
                          {item.label || "---"}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {fillNotAvailableDataWithNA(allData).map((item, i) => {
                    return (
                      <tr key={nanoid()}>
                        {getDataSetWithCreatedAt(allData).map((val) => {
                          return <td key={nanoid()}>{item[val.label]}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : dataMessage === "Loading..." ? (
          <div className="col-12">
            <div className="box_bg rounded-1 py-4 mt-3">
              <div className="p-4">
                <Spinner />
              </div>
            </div>
          </div>
        ) : (
          <NoData dataMessage={dataMessage} />
        )}
      </div>
    </>
  );
};

export default Graph;
