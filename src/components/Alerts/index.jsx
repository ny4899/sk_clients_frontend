import React, { useMemo, useState, useEffect } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import ReactPaginate from 'react-paginate';
import { COLUMNS } from "./column";
import { IndeterminateCheckbox } from "../../common/IndeterminateCheckbox";
import { PageWrapper, PageHeading } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faRotate } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useGlobalContext } from "./../../context";
import { getDateFromMilisec } from "../customHooks/useGetDateFromMilisec";

const AlertTable = ({ alertType, page, setTotalPage }) => {
  const [apiData, setApiData] = useState([]);
  const [tableMessage, setTableMessage] = useState("");
  const [searchStr, setSearchStr] = useState("");

  const { username, userType } = useGlobalContext();

  const {
    userDashboardURL
  } = useGlobalContext();

  useEffect(() => {
    setTableMessage("Loading...");
    (async () => {
      try {
        const result = await axios(
          `${window.apiURL}/alerts?industry_partner=${
            userType === "partner" ? username : ""
          }&industry_id=${userDashboardURL.slice(1)}&alert_type=${alertType}&numberOfAlerts=20&searchStr=${searchStr}&pageNumber=${page}`
        );
        const data = result.data.alerts;
        setTotalPage(Math.ceil(result.data.count / 20))

        data.forEach((item) => {
          if (!item._id) item._id = "---";
          if (!item.alert_type) item.alert_type = "---";
          if (!item.body) item.body = "---";
          if (!item.createdAt) {
            item.createdAt = "---";
          } else {
            item.createdAt = getDateFromMilisec(item.createdAt);
          }
          if (!item.device_name) item.device_name = "---";
          if (!item.industry_name) item.industry_name = "---";
          if (!item.parameter_name) item.parameter_name = "---";
          if (!item.station_name) item.station_name = "---";
        });
        if (data) {
          setTableMessage("");
          setApiData(data);
        }
      } catch (error) {
        setTableMessage(`Something went wrong: ${error.message}`);
      }
    })();
  }, [searchStr, page]);

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
          "_id",
        ],
      },
    },
    useGlobalFilter,
    useSortBy
  );

  return (
    <>
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
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const Alerts = ({ alertType, heading }) => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0)

  const handlePageClick = (event) => {
    setPage(event.selected + 1)
  };

  return (
    <PageWrapper>
      <div className="col-12">
        <div className="d-flex justify-content-between">
          <div>
            <PageHeading txt={heading} />
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="data__wrapper p-3">
          <div className="row g-3 ">
            <AlertTable alertType={alertType} page={page} setTotalPage={setTotalPage} />
            <div className="col-12">
              <div className="d-flex justify-content-end">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={8}
                  pageCount={totalPage}
                  previousLabel="< previous"
                  renderOnZeroPageCount={null}
                  marginPagesDisplayed={2}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Alerts;
