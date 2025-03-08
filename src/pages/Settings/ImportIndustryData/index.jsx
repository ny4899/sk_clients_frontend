import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import Select from "react-select";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ImportIndustryData() {
  const [csvFile, SetCsvFile] = useState(null);
  const [allDeviceAndIndustryNames, setAllDeviceAndIndustryNames] =
    useState(null);
  const [selectDeviceInputMessage, setSelectDeviceInputMessage] =
    useState("Loading...");

  const [allParameters, setAllParameters] = useState(null);
  const [
    selectedIndustryParameterMessage,
    setSelectedIndustryParameterMessage,
  ] = useState("");

  const [selectedDevice, setSelectedDevice] = useState("");
  const [fileMessage, setFileMessage] = useState("");

  const refSelectedDevice = useRef();

  useEffect(() => {
    const timeId = setTimeout(() => {
      if (fileMessage) {
        setFileMessage("");
      }
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [fileMessage]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios(`${window.apiURL}/device/get_all_devices_data`);
        setAllDeviceAndIndustryNames(res.data.data.devices);
      } catch (error) {
        setSelectDeviceInputMessage(`Somthing went wrong ${error.message}`);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if ((allDeviceAndIndustryNames, selectedDevice)) {
      setSelectedIndustryParameterMessage("Loading...");
      async function fetchData() {
        try {
          const res = await axios(
            `${window.apiURL}/data_setting/${selectedDevice}`
          );
          setSelectedIndustryParameterMessage("");
          setAllParameters(
            res.data.parameters.map((item, i) => ({
              parameter: item,
              value: i + 1,
            }))
          );
        } catch (error) {
          setAllParameters(null);
          setSelectedIndustryParameterMessage(
            `Somthing went wrong ${error.message}`
          );
        }
      }
      fetchData();
    }
  }, [allDeviceAndIndustryNames, selectedDevice]);

  const handleUploadFile = (e) => {
    e.preventDefault();
    if (csvFile) {
      console.log(csvFile);
      const parameters = allParameters
        .map(({ parameter, value }) => `${parameter}:${value}`)
        .join(",");

      const url = `${window.apiURL}/rawdata/csv-update`;
      axios
        .post(`${url}/${parameters}/${selectedDevice}`, csvFile, {
          headers: {
            ContentType: "multipart/form-data",
          },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      setFileMessage("*** select a file first ***");
    }
  };
  return (
    <div className="container-fluid px-3 py-4">
      <div className="row g-3">
        <div className="col-12">
          <div className="data__wrapper p-1 p-sm-3 shadow-sm">
            <div
              className="mx-auto"
              style={{
                width: "100%",
              }}
            >
              <form>
                <fieldset>
                  <legend style={{ backgroundColor: "lavender" }}>
                    Upload industry data
                  </legend>
                  <div className="row g-3">
                    {/* ================*/}
                    <div className="col-12">
                      {allDeviceAndIndustryNames ? (
                        <Select
                          ref={refSelectedDevice}
                          className="mt-2"
                          placeholder="Select industry & device"
                          options={allDeviceAndIndustryNames.map(
                            ({ device_name, industry_name }) => ({
                              value: device_name,
                              label: `${industry_name} (${device_name})`,
                            })
                          )}
                          onChange={(e) => {
                            refSelectedDevice.current.value = e.value;
                            setSelectedDevice(e.value);
                          }}
                        />
                      ) : (
                        <select
                          defaultValue={"loading"}
                          className="form-select"
                        >
                          <option disabled value="loading">
                            Loading...
                          </option>
                        </select>
                      )}
                    </div>
                  </div>
                  {selectedDevice && allParameters ? (
                    <div className="row py-4 g-2">
                      {allParameters ? (
                        allParameters.map((data) => {
                          const customKey = nanoid();
                          return (
                            <div key={customKey} className="col-12 col-lg-8">
                              <div className="row g-2">
                                <label
                                  htmlFor={String(customKey)}
                                  className="col-4 col-form-label"
                                >
                                  {data.parameter}:
                                </label>
                                <div className="col-6">
                                  <input
                                    defaultValue={data.value}
                                    type="number"
                                    className="form-control"
                                    id={String(customKey)}
                                    onChange={(e) => {
                                      setAllParameters(
                                        allParameters.map((item) => {
                                          if (
                                            item.parameter !== data.parameter
                                          ) {
                                            return item;
                                          } else {
                                            return {
                                              ...item,
                                              value: Number(e.target.value),
                                            };
                                          }
                                        })
                                      );
                                    }}
                                  />
                                </div>
                                <div className="col-2">
                                  <button
                                    onClick={() => {
                                      setAllParameters(
                                        allParameters.filter(
                                          (item) =>
                                            item.parameter !== data.parameter
                                        )
                                      );
                                    }}
                                    type="button"
                                    className="btn btn-danger w-100"
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <></>
                      )}
                      <div className="col-12 col-lg-8">
                        <div className="py-2">
                          <p className="text-danger m-0">{fileMessage}</p>
                          <label
                            htmlFor="fileUpload"
                            className="col-form-label"
                          >
                            <span className="pe-2">Select file:</span>
                          </label>
                          <input
                            id="fileUpload"
                            type="file"
                            name="file"
                            onChange={(e) => {
                              SetCsvFile(e.target.files[0]);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-lg-8">
                        <div>
                          <button
                            className="btn btn-success w-100"
                            onClick={handleUploadFile}
                          >
                            <h6 className="text-white">upload data</h6>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h5 className="text-center">
                        {selectedIndustryParameterMessage}
                      </h5>
                    </div>
                  )}
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ImportIndustryData;
