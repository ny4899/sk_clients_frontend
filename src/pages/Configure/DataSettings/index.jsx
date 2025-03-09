import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { COLUMNS } from "./column";
import { IndeterminateCheckbox } from "../../../common/IndeterminateCheckbox";
import { PageWrapper, PageHeading } from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faRotate } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const DataSettings = () => {
  const [apiData, setApiData] = useState([]);
  const [tableMessage, setTableMessage] = useState("");
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    setTableMessage("Loading...");
    (async () => {
      try {
        const result = await axios(
          `${window.apiURL}/data_setting?numberOfDataSettings=20&searchStr=${searchStr}`
        );
        const data = result.data.data.dataSettings;

        data.forEach((item) => {
          if (!item.device_id) item.device_id = "---";
          if (!item.dataSetting_industry_name)
            item.dataSetting_industry_name = "---";
          if (!item.dataSetting_device_name)
            item.dataSetting_device_name = "---";
          if (!item.device_name) item.device_name = "---";
          if (!item.industry_pb_id) item.industry_pb_id = "---";
          if (!item.station_name) item.station_name = "---";
          if (!item.station_pb_id) item.station_pb_id = "---";
          if (!item.device_pb_id) item.device_pb_id = "---";
          if (!item.device_param_pb_id) item.device_param_pb_id = "---";
          if (!item.site_id) item.site_id = "---";
          if (!item.site_uid) item.site_uid = "---";
          if (!item.monitoring_id) item.monitoring_id = "---";
          if (!item.analyzer_id) item.analyzer_id = "---";
          if (!item.parameter_id) item.parameter_pb_id = "---";
          if (!item.unit_id) item.unit_id = "---";
          if (!item.sequence_number) item.sequence_number = "---";
          if (!item.Number_of_bytes) item.Number_of_bytes = "---";
          if (!item.holding_register_number)
            item.holding_register_number = "---";
          if (!item.starting_register) item.starting_register = "---";
          if (!item.function_value) item.function_value = "---";
          if (!item.min_std_value) item.min_std_value = "---";
          if (!item.max_std_value) item.max_std_value = "---";
          if (!item.multiplication_factor) item.multiplication_factor = "---";
          if (!item.conversion_type) item.conversion_type = "---";
          if (!item.constant_value_420) item.constant_value_420 = "---";
          if (!item.range_420) item.range_420 = "---";
          if (!item.to_pcb) item.to_pcb = "---";
          if (!item.byte_reading_order) item.byte_reading_order = "---";
          if (!item.min_vaild_value) item.min_vaild_value = "---";
          if (!item.max_valid_value) item.max_valid_value = "---";
          if (!item.z_data) item.z_data = "---";
          if (!item.status) item.status = "---";
          if (!item.parameter_status) item.parameter_status = "---";
          if (!item.device_status) item.device_status = "---";
          if (!item.client_status) item.client_status = "---";
          if (!item.to_cpcb) item.to_cpcb = "---";
          if (!item.two_way_communication) item.two_way_communication = "---";
        });
        if (data) {
          setTableMessage("");
          setApiData(data);
        }
      } catch (error) {
        setTableMessage(`Something went wrong: ${error.message}`);
      }
    })();
  }, [searchStr]);

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
        hiddenColumns: [
          "status",
          "parameter_status",
          "device_status",
          "client_status",
          "two_way_communication",
        ],
      },
    },
    useGlobalFilter,
    useSortBy
  );

  return (
    <PageWrapper>
      <div className="col-12">
        <div className="d-flex justify-content-between">
          <div>
            <PageHeading txt={"Data Setting"} />
          </div>
          <div className="d-flex">
            <Link to="/createNewDataSetting" className="btn btn-sm btn-primary">
              Create Data Setting
            </Link>
          </div>
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
                      <div className=" m-0">
                        <input
                          type="text"
                          value={searchStr}
                          placeholder="Search..."
                          className="form-control"
                          onChange={(e) => setSearchStr(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-sm me-2">
                        {" "}
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
  );
};

export default DataSettings;
