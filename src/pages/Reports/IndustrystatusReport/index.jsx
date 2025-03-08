import React, { useMemo, useState, useEffect, useRef } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { COLUMNS } from "./column";
import GlobalFilter from "../../../common/GlobalFilter";
import { IndeterminateCheckbox } from "../../../common/IndeterminateCheckbox";
import { PageWrapper, PageHeading } from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faRotate } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { nanoid } from "nanoid";
import { formatTableDate } from "../../../components/customHooks/useFormatTableDate";
import { useGlobalContext } from "./../../../context";

import { DownloadTableExcel } from "react-export-table-to-excel";

import "./modal.scss";

const Modal = ({ modalData }) => {
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          {modalData ? (
            <>
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  {modalData.industry_name}{" "}
                  <span className="fs-6">({modalData.device_name})</span>
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-1">
                <table className="w-100 modal_table">
                  <thead>
                    <tr>
                      <th>S.no.</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Time passed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modalData.data.map((item, i) => {
                      const startDate = new Date(item.start);
                      const startDateStr = `${startDate.getFullYear()}-${
                        startDate.getMonth() + 1 > 9
                          ? startDate.getMonth() + 1
                          : `0${startDate.getMonth() + 1}`
                      }-${
                        startDate.getDate() > 9
                          ? startDate.getDate()
                          : `0${startDate.getDate()}`
                      } ${
                        startDate.getHours() > 9
                          ? startDate.getHours()
                          : `0${startDate.getHours()}`
                      }:${
                        startDate.getMinutes() > 9
                          ? startDate.getMinutes()
                          : `0${startDate.getMinutes()}`
                      }:${
                        startDate.getSeconds() > 9
                          ? startDate.getSeconds()
                          : `0${startDate.getSeconds()}`
                      }`;

                      const endDate = new Date(item.end);
                      const endDateStr = `${endDate.getFullYear()}-${
                        endDate.getMonth() + 1 > 9
                          ? endDate.getMonth() + 1
                          : `0${endDate.getMonth() + 1}`
                      }-${
                        endDate.getDate() > 9
                          ? endDate.getDate()
                          : `0${endDate.getDate()}`
                      } ${
                        endDate.getHours() > 9
                          ? endDate.getHours()
                          : `0${endDate.getHours()}`
                      }:${
                        endDate.getMinutes() > 9
                          ? endDate.getMinutes()
                          : `0${endDate.getMinutes()}`
                      }:${
                        endDate.getSeconds() > 9
                          ? endDate.getSeconds()
                          : `0${endDate.getSeconds()}`
                      }`;

                      let deltaDuration = (item.end - item.start) / 1000;
                      const daysDuration = Math.floor(deltaDuration / 86400);
                      deltaDuration -= daysDuration * 86400;

                      const hoursDuration =
                        Math.floor(deltaDuration / 3600) % 24;
                      deltaDuration -= hoursDuration * 3600;

                      const minutesDuration =
                        Math.floor(deltaDuration / 60) % 60;
                      deltaDuration -= minutesDuration * 60;

                      const secondsDuration = deltaDuration % 60;

                      return (
                        <tr key={nanoid()}>
                          <td>{i + 1}</td>
                          <td>{startDateStr}</td>
                          <td>{endDateStr}</td>
                          <td>
                            {daysDuration ? (
                              <span>{daysDuration.toFixed(0)}day </span>
                            ) : (
                              <></>
                            )}
                            {hoursDuration ? (
                              <span>{hoursDuration.toFixed(0)}hour </span>
                            ) : (
                              <></>
                            )}
                            {minutesDuration ? (
                              <span>{minutesDuration.toFixed(0)}min </span>
                            ) : (
                              <></>
                            )}
                            {secondsDuration ? (
                              <span>{secondsDuration.toFixed(0)}sec </span>
                            ) : (
                              <></>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div>
              <h6 className="text-center px-4">...Loading</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const IndustrystatusReport = () => {
  const [apiData, setApiData] = useState([]);
  const [tableMessage, setTableMessage] = useState("");
  const [modalData, setModalData] = useState(null);
  const [tableRows, setTableRows] = useState(0);
  const [btnTxt, setBtnTxt] = useState("");

  const { username, userType } = useGlobalContext();

  const tableRef = useRef(null);

  useEffect(() => {
    setTableMessage("Loading...");
    (async () => {
      try {
        const result = await axios(
          `${
            window.apiURL
          }/industries_status/industry_status_report?industry_partner=${
            userType === "partner" ? username : ""
          }` +
            `&` +
            `devices.status=${btnTxt.toLowerCase()}`
        );
        const data = result.data.results;
        data.forEach((item) => {
          if (!item.id) item.id = "---";
          if (!item.industry_name) item.industry_name = "---";
          if (!item.device_name) item.device_name = "---";
          if (!item.device_category) item.device_category = "---";
          if (!item.industry_status) item.industry_status = "---";
          if (!item.live_since) {
            item.live_since = "---";
          } else {
            item.live_since = formatTableDate(item.live_since);
          }
          if (!item.last_data_recived) {
            item.last_data_recived = "---";
          } else {
            item.last_data_recived = formatTableDate(item.last_data_recived);
          }
          if (!item.address) item.address = "---";
          if (!item.city) item.city = "---";
          if (!item.state) item.state = "---";
          if (!item.pincode) item.pincode = "---";
          if (!item.latitude) item.latitude = "---";
          if (!item.longitude) item.longitude = "---";
          if (item.ganga_basin === "false") item.ganga_basin = "no";
          if (item.ganga_basin === "true") item.ganga_basin = "yes";
          if (!item.ganga_basin) item.ganga_basin = "---";
          if (!item.offline_count && item.offline_count !== 0)
            item.offline_count = "---";
          if (!item.delay_count && item.delay_count !== 0)
            item.delay_count = "---";
        });
        if (result) {
          setTableMessage("");
          setApiData(result.data.results);
          setTableRows(result.data.results.length);
        }
      } catch (error) {
        setTableMessage(`Something went wrong: ${error.message}`);
      }
    })();
  }, [btnTxt]);

  const columns = useMemo(() => COLUMNS, []);

  const data = useMemo(() => apiData, [apiData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: [
          "id",
          "device_category",
          "address",
          "city",
          "state",
          "pincode",
          "latitude",
          "longitude",
          "ganga_basin",
          "live_since",
          "offline_count",
          "delay_count",
        ],
      },
    },
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  const addDataToModal = (data, industry_name, device_name) => {
    const obj = {
      data,
      industry_name,
      device_name,
    };
    setModalData(obj);
  };

  return (
    <>
      <Modal modalData={modalData} />
      <PageWrapper>
        <div className="col-12">
          <div className="d-flex justify-content-between">
            <div>
              <PageHeading txt={"Industry status report"} />
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="data__wrapper p-3 shadow-sm">
            <div className="row g-3 ">
              <div className="col-12">
                <div className="row g-0">
                  <div className="col-12 ">
                    <div className="d-flex justify-content-between ">
                      <div
                        className="d-flex align-items-center"
                        style={{ maxWidth: "350px" }}
                      >
                        <div className=" m-0">
                          <GlobalFilter
                            filter={globalFilter}
                            setFilter={setGlobalFilter}
                          />
                        </div>
                        <div className="ps-3">
                          <p className="fs-5" style={{ fontWeight: 600 }}>
                            List : {tableRows}
                          </p>
                        </div>
                      </div>
                      <div>
                        <button className="btn btn-sm me-2">
                          <FontAwesomeIcon icon={faRotate} className="fs-5" />
                        </button>
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-sm btn-secondary dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <FontAwesomeIcon icon={faDownload} />
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end shadow">
                            <li>
                              <button className="dropdown-item" type="button">
                                {" "}
                                <DownloadTableExcel
                                  filename="Industry-status-Report"
                                  sheet="users"
                                  currentTableRef={tableRef.current}
                                >
                                  Export excel
                                </DownloadTableExcel>
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item" type="button">
                                CSV
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item" type="button">
                                TXT
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item" type="button">
                                JSON
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item" type="button">
                                XML
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item" type="button">
                                PDF
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div className="btn-group ms-2">
                          <button
                            type="button"
                            className="btn btn-primary btn-sm dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {btnTxt === "" ? "All" : btnTxt}
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <span
                                style={{ cursor: "pointer" }}
                                className="dropdown-item"
                                onClick={() => {
                                  if (btnTxt !== "All") {
                                    setBtnTxt("");
                                  }
                                }}
                              >
                                All
                              </span>
                            </li>
                            <li>
                              <span
                                style={{ cursor: "pointer" }}
                                className="dropdown-item"
                                onClick={() => {
                                  if (btnTxt !== "Online") {
                                    setBtnTxt("Online");
                                  }
                                }}
                              >
                                Online
                              </span>
                            </li>
                            <li>
                              <span
                                style={{ cursor: "pointer" }}
                                className="dropdown-item"
                                onClick={() => {
                                  if (btnTxt !== "Offline") {
                                    setBtnTxt("Offline");
                                  }
                                }}
                              >
                                Offline
                              </span>
                            </li>
                            <li>
                              <span
                                style={{ cursor: "pointer" }}
                                className="dropdown-item"
                                onClick={() => {
                                  if (btnTxt !== "Delay") {
                                    setBtnTxt("Delay");
                                  }
                                }}
                              >
                                Delay
                              </span>
                            </li>
                            <li>
                              <span
                                style={{ cursor: "pointer" }}
                                className="dropdown-item"
                                onClick={() => {
                                  if (btnTxt !== "Inactive") {
                                    setBtnTxt("Inactive");
                                  }
                                }}
                              >
                                Inactive
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex my-2 flex-wrap">
                      <div>
                        <IndeterminateCheckbox
                          {...getToggleHideAllColumnsProps()}
                          className="me-1"
                        />{" "}
                        <span className="me-4">Toggle All</span>
                      </div>
                      {allColumns.map((column) => (
                        <div key={column.id}>
                          <label>
                            <input
                              className="me-1"
                              type="checkbox"
                              {...column.getToggleHiddenProps()}
                            />
                            <span className="me-4">{column.Header}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div>
                  <div className="table__container">
                    {tableMessage ? (
                      tableMessage === "Loading..." ? (
                        <h5 className="text-center py-4">{tableMessage}</h5>
                      ) : (
                        <h6 className="text-center py-4 text-danger">
                          {tableMessage}
                        </h6>
                      )
                    ) : (
                      <table {...getTableProps()} ref={tableRef}>
                        <thead>
                          {headerGroups.map((headerGroup) => {
                            return (
                              <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                  <th
                                    {...column.getHeaderProps(
                                      column.getSortByToggleProps()
                                    )}
                                  >
                                    {column.render("Header")}
                                    <span>
                                      {column.isSorted
                                        ? column.isSortedDesc
                                          ? " 🔽"
                                          : " 🔼"
                                        : ""}
                                    </span>
                                  </th>
                                ))}
                              </tr>
                            );
                          })}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                          {rows.map((row) => {
                            prepareRow(row);
                            return (
                              <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                  const val = cell.render("Cell").props.value;
                                  const head = cell.render("Cell").props.column
                                    .Header;

                                  return val !== 0 && head === "Delay count" ? (
                                    <td {...cell.getCellProps()}>
                                      <button
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop"
                                        className="btn"
                                        onClick={() =>
                                          addDataToModal(
                                            cell.render("Cell").props.cell.row
                                              .original.delay_data,
                                            cell.render("Cell").props.cell.row
                                              .original.industry_name,
                                            cell.render("Cell").props.cell.row
                                              .original.device_name
                                          )
                                        }
                                        {...cell.getCellProps()}
                                      >
                                        {cell.render("Cell")}
                                      </button>
                                    </td>
                                  ) : val === 0 && head === "Delay count" ? (
                                    <td {...cell.getCellProps()}>
                                      {cell.render("Cell")}
                                    </td>
                                  ) : head === "Offline count" ? (
                                    <td {...cell.getCellProps()}>
                                      <button
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop"
                                        className="btn"
                                        onClick={() =>
                                          addDataToModal(
                                            cell.render("Cell").props.cell.row
                                              .original.offline_data,
                                            cell.render("Cell").props.cell.row
                                              .original.industry_name,
                                            cell.render("Cell").props.cell.row
                                              .original.device_name
                                          )
                                        }
                                        {...cell.getCellProps()}
                                      >
                                        {cell.render("Cell")}
                                      </button>
                                    </td>
                                  ) : val === 0 && head === "Offline count" ? (
                                    <td {...cell.getCellProps()}>
                                      {cell.render("Cell")}
                                    </td>
                                  ) : val === "online" && head === "Status" ? (
                                    <td
                                      className="text-success"
                                      {...cell.getCellProps()}
                                    >
                                      {cell.render("Cell")}
                                    </td>
                                  ) : val === "offline" && head === "Status" ? (
                                    <td
                                      className="text-danger"
                                      {...cell.getCellProps()}
                                    >
                                      {cell.render("Cell")}
                                    </td>
                                  ) : val === "delay" && head === "Status" ? (
                                    <td
                                      className="text-warning"
                                      {...cell.getCellProps()}
                                    >
                                      {cell.render("Cell")}
                                    </td>
                                  ) : val === "inactive" &&
                                    head === "Status" ? (
                                    <td
                                      className="text-info"
                                      {...cell.getCellProps()}
                                    >
                                      {cell.render("Cell")}
                                    </td>
                                  ) : (
                                    <td {...cell.getCellProps()}>
                                      {cell.render("Cell")}
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default IndustrystatusReport;
