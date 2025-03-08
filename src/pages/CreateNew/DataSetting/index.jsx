import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import FormLegend from "../../../components/IndustryDashboard/FormLegend";

const CreateNewDataSetting = () => {
  const [industryNames, setIndustryNames] = useState("");
  const [deviceNames, setDeviceNames] = useState("");
  const [parameters, setParameters] = useState("");
  const [selectedIndustryId, setSelectedIndustryId] = useState("");
  const [selectedIndustryName, setSelectedIndustryName] = useState("");
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [selectedDeviceName, setSelectedDeviceName] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formView, setformView] = useState("d-none");
  const [deviceFormView, setDeviceFormView] = useState("d-none");

  const refSelectedIndustry = useRef(null);
  const refSelectedDevice = useRef(null);

  const refInstrument = useRef(null);
  const refParameter = useRef(null);
  const refParameterName = useRef(null);
  const refIndustryPBID = useRef(null);
  const refStationName = useRef(null);
  const refStationPBID = useRef(null);
  const refDevicePBID = useRef(null);
  const refDeviceParamPBID = useRef(null);
  const refSiteId = useRef(null);
  const refSiteUid = useRef(null);
  const refMonitoringId = useRef(null);
  const refAnalyzerId = useRef(null);
  const refParameterId = useRef(null);
  const refUnitId = useRef(null);
  const refKey = useRef(null);
  const refSequenceNumber = useRef(null);
  const refNumberOfBytes = useRef(null);
  const refHoldingRegisterNumber = useRef(null);
  const refStartingRegister = useRef(null);
  const refFunctionValue = useRef(null);
  const refMinStdValue = useRef(null);
  const refMaxStdValue = useRef(null);
  const refMultiplicationFactor = useRef(null);
  const refConversionType = useRef(null);
  const refConstantValue420 = useRef(null);
  const refRange420 = useRef(null);
  const refConstantSubtraction420 = useRef(null);
  const refToPCB = useRef(null);
  const refByteReadingOrder = useRef(null);
  const refMinValidValue = useRef(null);
  const refMaxValidValue = useRef(null);
  const refZData = useRef(null);
  const refStatus = useRef(null);
  const refParameterStatus = useRef(null);
  const refDeviceStatus = useRef(null);
  const refClientStatus = useRef(null);
  const refToCPCB = useRef(null);
  const refToWayCommunication = useRef(null);

  useEffect(() => {
    const timeId = setTimeout(() => {
      if (message || error) {
        setMessage("");
        setError("");
      }
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [message, error]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios(`${window.apiURL}/parameters`);
        setParameters(res.data.data.parameters);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios(`${window.apiURL}/industry_names`);
        setIndustryNames(res.data.data.industry_names);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedIndustryId) {
      async function fetchData() {
        try {
          const res = await axios(
            `${window.apiURL}/device/${selectedIndustryId}`
          );
          setDeviceNames(res.data.data.devices);
        } catch (error) {
          console.log(error.message);
        }
      }
      fetchData();
    }
  }, [selectedIndustryId]);

  const handleSelectedIndustry = () => {
    const [id, name] = refSelectedIndustry.current.value.split(",");
    setSelectedIndustryId(id);
    setSelectedIndustryName(name.trim());
    setDeviceFormView("d-block");
    setSelectedDeviceId("");
  };

  const handleSelectedDevice = () => {
    const [id, name] = refSelectedDevice.current.value.split(",");
    setSelectedDeviceId(id);
    setSelectedDeviceName(name.trim());
    setformView("d-block");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("processing...");
    try {
      const dataObj = {
        industry_id: selectedIndustryId,
        industry_name: selectedIndustryName,
        device_id: selectedDeviceId,
        device_name: selectedDeviceName,
        instrument: refInstrument.current.value,
        parameter_name: refParameter.current.value,
        parameter_custom_name: refParameterName.current.value,
        industry_pb_id: refIndustryPBID.current.value,
        station_name: refStationName.current.value,
        station_pb_id: refStationPBID.current.value,
        device_pb_id: refDevicePBID.current.value,
        device_param_pb_id: refDeviceParamPBID.current.value,
        site_id: refSiteId.current.value,
        site_uid: refSiteUid.current.value,
        monitoring_id: refMonitoringId.current.value,
        analyzer_id: refAnalyzerId.current.value,
        parameter_pb_id: refParameterId.current.value,
        unit_id: refUnitId.current.value,
        key: refKey.current.value,
        sequence_number: refSequenceNumber.current.value,
        Number_of_bytes: refNumberOfBytes.current.value,
        holding_register_number: refHoldingRegisterNumber.current.value,
        starting_register: refStartingRegister.current.value,
        function_value: refFunctionValue.current.value,
        min_std_value: refMinStdValue.current.value,
        max_std_value: refMaxStdValue.current.value,
        multiplication_factor: refMultiplicationFactor.current.value,
        conversion_type: refConversionType.current.value,
        constant_value_420: refConstantValue420.current.value,
        range_420: refRange420.current.value,
        constant_subtraction_420: refConstantSubtraction420.current.value,
        to_pcb: refToPCB.current.value,
        byte_reading_order: refByteReadingOrder.current.value,
        min_vaild_value: refMinValidValue.current.value,
        max_valid_value: refMaxValidValue.current.value,
        z_data: refZData.current.value,
        status: refStatus.current.value,
        parameter_status: refParameterStatus.current.value,
        device_status: refDeviceStatus.current.value,
        client_status: refClientStatus.current.value,
        to_cpcb: refToCPCB.current.value,
        two_way_communication: refToWayCommunication.current.value,
      };
      const res = await axios.post(`${window.apiURL}/data_setting`, dataObj);
      if (res.status === 201) {
        setError("");
        setMessage("Data setting created successfully!");
      }
    } catch (error) {
      console.log(error);
      setMessage("");
      if (error.response.data.message) {
        setError(`${error.response.data.message}!`);
      } else {
        setError(`${error.message}!`);
      }
    }
  };
  return (
    <>
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
                    <FormLegend msg={"Select industry"} />
                    <div className="row g-3">
                      {/* ================*/}
                      <div className="col-9 col-sm-10 col-xl-11">
                        {industryNames ? (
                          <Select
                            ref={refSelectedIndustry}
                            className="mb-3"
                            placeholder="Select industry"
                            options={industryNames.map(
                              ({ _id, industry_name }) => ({
                                value: `${_id},${industry_name}`,
                                label: industry_name,
                              })
                            )}
                            onChange={(e) => {
                              refSelectedIndustry.current.value = e.value;
                              handleSelectedIndustry();
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
                      {/* ================*/}
                    </div>
                  </fieldset>
                </form>

                {selectedIndustryId ? (
                  <form className={`mt-3 ${deviceFormView}`}>
                    <fieldset>
                      <FormLegend msg={"Select Device"} />
                      <div className="row g-3">
                        <div className="col-9 col-sm-10 col-xl-11">
                          {deviceNames ? (
                            <Select
                              ref={refSelectedDevice}
                              className="mb-3"
                              placeholder="Select Device"
                              options={deviceNames.map(
                                ({ _id, device_name }) => ({
                                  value: `${_id},${device_name}`,
                                  label: device_name,
                                })
                              )}
                              onChange={(e) => {
                                refSelectedDevice.current.value = e.value;
                                handleSelectedDevice();
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
                    </fieldset>
                  </form>
                ) : (
                  <></>
                )}

                {selectedIndustryId && selectedDeviceId ? (
                  <form onSubmit={handleSubmit} className={`mt-3 ${formView}`}>
                    <fieldset>
                      <FormLegend msg={"Add Data Setting"} />
                      <div className="row g-3">
                        <div className="col-9 col-sm-10 col-xl-11">
                          <select
                            required
                            defaultValue={""}
                            className="form-select"
                            ref={refInstrument}
                          >
                            <option disabled value="">
                              Select instrument *
                            </option>
                            <option value="(NM)">NM</option>
                            <option value="Effluent Monitoring System(001)">
                              Effluent Monitoring System(001)
                            </option>
                            <option value="Online Effluent Monitoring System(002)">
                              Online Effluent Monitoring System(002)
                            </option>
                            <option value="Dust Monitoring System(003)">
                              Dust Monitoring System(003)
                            </option>
                            <option value="Electromagnetic Flow Meter(004)">
                              Electromagnetic Flow Meter(004)
                            </option>
                            <option value="Online Monitoring System(005)">
                              Online Monitoring System(005)
                            </option>
                            <option value="Online Monitoring System(006)">
                              Online Monitoring System(006)
                            </option>
                            <option value="Online Monitoring System(020)">
                              Online Monitoring System(020)
                            </option>
                            <option value="Envirozone Equipments (051)">
                              Envirozone Equipments (051)
                            </option>
                          </select>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <select
                            required
                            defaultValue={""}
                            className="form-select"
                            ref={refParameter}
                          >
                            <option disabled value="">
                              Select parameter *
                            </option>
                            {parameters ? (
                              parameters.map((item) => {
                                return (
                                  <option
                                    key={item._id}
                                    value={`${item.parameter_name}+${item.parameter_unit}`}
                                  >
                                    {item.parameter_name}
                                  </option>
                                );
                              })
                            ) : (
                              <option disabled value="loading">
                                Loading...
                              </option>
                            )}
                          </select>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            required
                            ref={refParameterName}
                            type="text"
                            className="form-control"
                            placeholder="Parameter name *"
                          ></input>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refIndustryPBID}
                            type="text"
                            className="form-control"
                            placeholder="Industry Id"
                          ></input>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            required
                            ref={refStationName}
                            type="text"
                            className="form-control"
                            placeholder="Station name"
                          ></input>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            required
                            ref={refStationPBID}
                            type="text"
                            className="form-control"
                            placeholder="Station Id"
                          ></input>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refDevicePBID}
                            type="text"
                            className="form-control"
                            placeholder="Device Id"
                          ></input>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refDeviceParamPBID}
                            type="text"
                            className="form-control"
                            placeholder="Device Param Id"
                          ></input>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refSiteId}
                            type="text"
                            className="form-control"
                            placeholder="Site Id"
                          ></input>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refSiteUid}
                            type="text"
                            className="form-control"
                            placeholder="Site Uid"
                          ></input>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refMonitoringId}
                            type="text"
                            className="form-control"
                            placeholder="Monitoring Id"
                          ></input>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refAnalyzerId}
                            type="text"
                            className="form-control"
                            placeholder="Analyzer Id"
                          ></input>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refParameterId}
                            type="text"
                            className="form-control"
                            placeholder="Parameter Id"
                          ></input>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refUnitId}
                            type="text"
                            className="form-control"
                            placeholder="Unit Id"
                          ></input>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refKey}
                            type="text"
                            className="form-control"
                            placeholder="API Key"
                          ></input>
                        </div>


                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refSequenceNumber}
                            required
                            type="text"
                            className="form-control"
                            placeholder="Sequence number *"
                          ></input>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refNumberOfBytes}
                            type="text"
                            className="form-control"
                            placeholder="Number of bytes *"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refHoldingRegisterNumber}
                            type="text"
                            className="form-control"
                            placeholder="Holding register number *"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refStartingRegister}
                            required
                            type="text"
                            className="form-control"
                            placeholder="Starting Register *"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refFunctionValue}
                            type="text"
                            className="form-control"
                            placeholder="Function value *"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refMinStdValue}
                            required
                            step="any"
                            type="text"
                            className="form-control"
                            placeholder="Min std value *"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refMaxStdValue}
                            required
                            step="any"
                            type="text"
                            className="form-control"
                            placeholder="Max std value *"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refMultiplicationFactor}
                            required
                            step="any"
                            type="text"
                            className="form-control"
                            placeholder="Multiplication factor *"
                          ></input>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <select
                            defaultValue={""}
                            className="form-select"
                            ref={refConversionType}
                          >
                            <option value="">Select conversion type</option>
                            <option value='no-change'>no change</option>
                            <option value="NM">NM</option>
                            <option value="Decimal">Decimal</option>
                            <option value="Float">Float</option>
                            <option value="4-20 mA">4-20 mA</option>
                            <option value="Decimal to Hexa">
                              Decimal to Hexa
                            </option>
                          </select>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refConstantValue420}
                            type="text"
                            className="form-control"
                            placeholder="Constant Value 4-20 *"
                          ></input>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refRange420}
                            type="text"
                            className="form-control"
                            placeholder="Range 4-20 *"
                          ></input>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refConstantSubtraction420}
                            type="text"
                            className="form-control"
                            placeholder="Constant Subtraction 4-20 *"
                          ></input>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <select
                            defaultValue={""}
                            className="form-select"
                            ref={refToPCB}
                          >
                            <option value="">Select PCB</option>
                            <option value="DL">DL</option>
                            <option value="HR">HR</option>
                            <option value="PB">PB</option>
                            <option value="MAH">MAH</option>
                            <option value="RJ">RJ</option>
                            <option value="AP">AP</option>
                            <option value="MP">MP</option>
                            <option value="BH">BH</option>
                            <option value="JH">JH</option>
                          </select>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refByteReadingOrder}
                            type="text"
                            className="form-control"
                            placeholder="Byte reading order *"
                          ></input>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refMinValidValue}
                            required
                            type="text"
                            className="form-control"
                            placeholder="Min vaild value *"
                          ></input>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refMaxValidValue}
                            required
                            type="text"
                            className="form-control"
                            placeholder="Max valid value *"
                          ></input>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <select
                            defaultValue={1}
                            className="form-select"
                            ref={refZData}
                          >
                            <option value={1}>Select Z data</option>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                          </select>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <select
                            defaultValue={true}
                            className="form-select"
                            ref={refStatus}
                          >
                            <option value={true}>Select Status</option>
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                          </select>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <select
                            defaultValue={true}
                            className="form-select"
                            ref={refParameterStatus}
                          >
                            <option value={true}>
                              Select Parameter Status
                            </option>
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                          </select>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <select
                            defaultValue={true}
                            className="form-select"
                            ref={refDeviceStatus}
                          >
                            <option value={true}>Select Device Status</option>
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                          </select>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <select
                            defaultValue={true}
                            className="form-select"
                            ref={refClientStatus}
                          >
                            <option value={true}>Select Client Status</option>
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                          </select>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <select
                            defaultValue={false}
                            className="form-select"
                            ref={refToCPCB}
                          >
                            <option value={false}>Select To CPCB</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </select>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <select
                            defaultValue={true}
                            className="form-select"
                            ref={refToWayCommunication}
                          >
                            <option value={true}>
                              Select Tow way communication
                            </option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </select>
                        </div>

                        {message && (
                          <div className="col-9 col-sm-10 col-xl-11">
                            <div
                              className="alert alert-success px-2"
                              role="alert"
                            >
                              {message}
                            </div>
                          </div>
                        )}
                        {error && (
                          <div className="col-9 col-sm-10 col-xl-11">
                            <div className="alert alert-danger" role="alert">
                              {error}
                            </div>
                          </div>
                        )}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <div className="d-flex justify-content-end py-2">
                            <button
                              className="btn btn-secondary me-3"
                              onClick={() => {
                                setformView("d-none");
                                setSelectedIndustryId("");
                                refSelectedIndustry.current.value = "";
                              }}
                            >
                              Cancel
                            </button>
                            <button type="submit" className="btn btn-success">
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewDataSetting;
