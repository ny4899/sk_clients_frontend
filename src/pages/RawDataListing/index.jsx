import React, { useMemo, useState, useEffect, useRef } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { COLUMNS } from "./column";
import { IndeterminateCheckbox } from "../../common/IndeterminateCheckbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faRotate } from "@fortawesome/free-solid-svg-icons";
import { PageWrapper, PageHeading } from "../../components";
import axios from "axios";
// custom hook
import { formatTableDate } from "../../components/customHooks/useFormatTableDate";
import NoData from "../../components/NoData";

const RawDataListing = () => {
  const [apiData, setApiData] = useState([]);
  const [refresh, setRefresh] = useState("");
  const [tableMessage, setTableMessage] = useState("");
  const [tableErrorMessage, setTableErrorMessage] = useState("");
  const [searchStr, setSearchStr] = useState("");

  const [numberOfData, setNumberOfData] = useState(100);

  const refNumberOfData = useRef(null);

  const handleDataQuantity = () => {
    setNumberOfData(refNumberOfData.current.value);
  };

  const fetchData = async (globalFilter = "") => {
    console.log(searchStr)
    if (
      searchStr.length > 3
    ) {
      try {
        setTableErrorMessage("");
        setTableMessage("Loading...");
        const result = await axios(
          `${
            window.apiURL
          }/rawdata/by_device/${numberOfData}?searchStr=${globalFilter.trim()}`
        );
        const data = result.data.data.raw_data;
        data.forEach((item) => {
          if (!item.data_string) item.data_string = "---";
          if (!item.created_at) {
            item.created_at = "---";
          } else {
            item.created_at = formatTableDate(item.created_at);
          }
        });
        if (data.length > 0) {
          setTableMessage("");
          setApiData(data);
        } else {
          setTableMessage("No Data");
        }
      } catch (error) {
        setTableMessage("");
        setTableErrorMessage(`Something went wrong: ${error.message}`);
      }
    }else{
      try {
        setTableErrorMessage("");
        setTableMessage("Loading...");
        const result = await axios(
          `${
            window.apiURL
          }/rawdata/${numberOfData}`
        );
        const data = result.data.data.raw_data;
        data.forEach((item) => {
          if (!item.data_string) item.data_string = "---";
          if (!item.created_at) {
            item.created_at = "---";
          } else {
            item.created_at = formatTableDate(item.created_at);
          }
        });
        if (data.length > 0) {
          setTableMessage("");
          setApiData(data);
        } else {
          setTableMessage("No Data");
        }
      } catch (error) {
        setTableMessage("");
        setTableErrorMessage(`Something went wrong: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [numberOfData, refresh]);

  const columns = useMemo(() => COLUMNS, []);

  const data = useMemo(() => apiData, [apiData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ["_id"],
      },
    },
    useGlobalFilter,
    useSortBy
  );

  useEffect(() => {
    fetchData(searchStr);
  }, [searchStr, refresh]);

  return (
    <PageWrapper>
      <div className="col-12">
        <div className="d-flex justify-content-between">
          <PageHeading txt={"Raw data listing"} />
        </div>
      </div>
      <div className="col-12">
        <div className="data__wrapper p-3">
          <div className="row g-3 ">
            <div className="col-12">
              <div className="row g-0">
                <div className="col-12 ">
                  <div className="d-flex justify-content-between">
                    <div style={{ maxWidth: "350px" }}>
                      <div className="m-0">
                        <input
                          type="text"
                          value={searchStr}
                          placeholder="Type full name"
                          className="form-control"
                          onChange={(e) => setSearchStr(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="d-flex">
                      <div>
                        <select
                          ref={refNumberOfData}
                          className="form-select d-inline"
                          aria-label="Default select example"
                          defaultValue={100}
                          onChange={() => handleDataQuantity()}
                        >
                          <option value={100}>100</option>
                          <option value={500}>500</option>
                          <option value={1000}>1000</option>
                          <option value={5000}>5000</option>
                          <option value={20000}>20000</option>
                          <option value={100000}>100000</option>
                        </select>
                      </div>
                      {/* <div>
                        <button
                          className="btn btn-sm mx-2"
                          onClick={() => setRefresh(`${Date.now()}`)}
                        >
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
                                MS-Excel
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item" type="button">
                                MS-Word
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
                      </div> */}
                    </div>
                  </div>
                </div>
                {/* <div className="col-12">
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
                </div> */}
              </div>
            </div>
            <div className="col-12">
              <div>
                <div className="table__container">
                  {tableMessage === "No Data" ? (
                    <NoData dataMessage={"No data with this Modem Id"} />
                  ) : tableMessage ? (
                    <h5 className="text-center py-4">{tableMessage}</h5>
                  ) : tableErrorMessage ? (
                    <h6 className="text-center py-4 text-danger">
                      {tableErrorMessage}
                    </h6>
                  ) : (
                    <table {...getTableProps()}>
                      <thead>
                        {headerGroups.map((headerGroup) => (
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
                        ))}
                      </thead>
                      <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                          prepareRow(row);
                          return (
                            <tr {...row.getRowProps()}>
                              {row.cells.map((cell, i) => {
                                return (
                                  <td
                                    {...cell.getCellProps({
                                      style: {
                                        minWidth: cell.column.minWidth,
                                        width: cell.column.width,
                                      },
                                    })}
                                  >
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
  );
};

export default RawDataListing;
