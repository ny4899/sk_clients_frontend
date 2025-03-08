import React, { useMemo, useState, useEffect } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import ReactPaginate from "react-paginate";
import { COLUMNS } from "./column";
import { IndeterminateCheckbox } from "./../../common/IndeterminateCheckbox";
import { PageWrapper, PageHeading } from "../../components";
import axios from "axios";
import NoData from "../../components/NoData";

const ApiLogTable = ({ board, page, setTotalPage }) => {
  const [apiData, setApiData] = useState([]);
  const [tableMessage, setTableMessage] = useState("first");
  const [tableErrorMessage, setTableErrorMessage] = useState("");
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    if (
      (searchStr.length > 3 || searchStr.length === 0) &&
      (tableMessage !== "first" || searchStr.length !== 0)
    ) {
      setTableErrorMessage("");
      setTableMessage("Loading...");
      (async () => {
        try {
          const result = await axios(
            `${window.apiURL}/pcb_logs/by_device?numberOfLogs=20&searchStr=${searchStr}&board=${board}&pageNumber=${page}`
          );
          const data = result.data.data.logs;
          setTotalPage(Math.ceil(result.data.count / 20));

          data.forEach((item) => {
            if (!item.industry_name) item.industry_name = "---";
            if (!item.device_name) item.device_name = "---";
            if (!item.data) item.data = "---";
            if (!item.board) item.board = "---";
            if (!item.status) item.status = "---";
            if (!item.message) item.message = "---";

            if (!item.createdAt) {
              item.createdAt = "---";
            } else {
              const d = new Date(item.createdAt);
              item.createdAt = `${
                String(d.getDate()).length < 2
                  ? "0" + String(d.getDate())
                  : String(d.getDate())
              }/${
                String(d.getMonth() + 1).length < 2
                  ? "0" + String(d.getMonth() + 1)
                  : String(d.getMonth() + 1)
              }/${
                String(d.getFullYear()).length < 2
                  ? "0" + String(d.getFullYear())
                  : String(d.getFullYear())
              } ${
                String(d.getHours()).length < 2
                  ? "0" + String(d.getHours())
                  : String(d.getHours())
              }:${
                String(d.getMinutes()).length < 2
                  ? "0" + String(d.getMinutes())
                  : String(d.getMinutes())
              }:${
                String(d.getSeconds()).length < 2
                  ? "0" + String(d.getSeconds())
                  : String(d.getSeconds())
              }`;
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
          setTableMessage(`Something went wrong: ${error.message}`);
        }
      })();
    }
  }, [searchStr, page]);

  const columns = useMemo(() => COLUMNS, []);

  const data = useMemo(() => apiData, [apiData]);
  // const filteredDataArr = [];

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
        hiddenColumns: [],
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
                    placeholder="Type modem id"
                    className="form-control"
                    onChange={(e) => setSearchStr(e.target.value)}
                  />
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
            {tableMessage === "first" ? (
              <NoData dataMessage={"Search by Modem Id to get Data"} />
            ) : tableMessage === "No Data" ? (
              <NoData dataMessage={tableMessage} />
            ) : tableMessage ? (
              <h5 className="text-center py-5">{tableMessage}</h5>
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
    </>
  );
};

const ApiLog = ({ board }) => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  return (
    <PageWrapper>
      <PageHeading txt={`${board} API Logs`} />
      <div className="col-12">
        <div className="data__wrapper p-3 shadow-sm">
          <div className="row g-3 ">
            <ApiLogTable
              board={board}
              page={page}
              setTotalPage={setTotalPage}
            />
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

export default ApiLog;
