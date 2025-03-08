import React, { useMemo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { COLUMNS } from "./column";
import GlobalFilter from "../../../common/GlobalFilter";
import { IndeterminateCheckbox } from "../../../common/IndeterminateCheckbox";
import { PageWrapper, PageHeading } from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faRotate } from "@fortawesome/free-solid-svg-icons";
import { DownloadTableExcel } from "react-export-table-to-excel";
import axios from "axios";

const Industry = () => {
  const [apiData, setApiData] = useState([]);
  const [tableMessage, setTableMessage] = useState("");

  const tableRef = useRef(null);

  useEffect(() => {
    setTableMessage("Loading...");
    (async () => {
      try {
        const result = await axios(`${window.apiURL}/industries`);
        const data = result.data.data.industries;
        data.forEach((item) => {
          if (!item._id) item._id = "---";
          if (!item.industry_name) item.industry_name = "---";
          if (!item.industry_category) item.industry_category = "---";
          if (!item.industry_type) item.industry_type = "---";
          if (!item.exceedance_notification_mail)
            item.exceedance_notification_mail = "---";
          if (!item.industry_as) item.industry_as = "---";
          if (!item.industry_partner) item.industry_partner = "---";
          if (!item.createdAt) item.createdAt = "---";
        });
        if (result) {
          setTableMessage("");
          setApiData(result.data.data.industries);
        }
      } catch (error) {
        setTableMessage(`Something went wrong: ${error.message}`);
      }
    })();
  }, []);

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
        hiddenColumns: ["_id"],
      },
    },
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  return (
    <PageWrapper>
      <div className="col-12">
        <div className="d-flex justify-content-between">
          <div>
            <PageHeading txt={"Industry"} />
          </div>
          <div className="d-flex">
            <Link to="/CreateNewIndustry" className="btn btn-sm btn-primary">
              Create New
            </Link>
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
                    <div style={{ maxWidth: "350px" }}>
                      <div className=" m-0">
                        <GlobalFilter
                          filter={globalFilter}
                          setFilter={setGlobalFilter}
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
                                {" "}
                                <DownloadTableExcel
                                  filename="Industries"
                                  sheet="users"
                                  currentTableRef={tableRef.current}
                                >
                                  Export excel
                                </DownloadTableExcel>
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
                    <table {...getTableProps()} ref={tableRef}>
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
                              {row.cells.map((cell) => {
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

export default Industry;
