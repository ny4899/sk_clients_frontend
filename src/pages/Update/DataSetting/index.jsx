import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FormLegend from "../../../components/IndustryDashboard/FormLegend";

const UpdateDataSetting = () => {
  const { dataSetting_id, parameter_id } = useParams();
  const [industryName, setIndustryName] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [parameters, setParameters] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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

  const getDeviceData = async () => {
    try {
      const res = await axios(
        `${window.apiURL}/data_setting/${dataSetting_id}/${parameter_id}`
      );
      if (res.status === 200) {
        const {
          Number_of_bytes,
          byte_reading_order,
          client_status,
          constant_subtraction_420,
          constant_value_420,
          conversion_type,
          device_name,
          device_status,
          function_value,
          holding_register_number,
          industry_name,
          instrument,
          max_std_value,
          max_valid_value,
          min_std_value,
          min_vaild_value,
          multiplication_factor,
          parameter_custom_name,
          parameter_name,
          parameter_status,
          range_420,
          sequence_number,
          starting_register,
          industry_pb_id,
          station_name,
          station_pb_id,
          device_pb_id,
          device_param_pb_id,
          site_id,
          site_uid,
          monitoring_id,
          analyzer_id,
          parameter_pb_id,
          unit_id,
          key,
          status,
          to_cpcb,
          to_pcb,
          two_way_communication,
          z_data,
        } = res.data.data.parameter;

        refInstrument.current.value = instrument;
        refParameter.current.value = parameter_name;
        refParameterName.current.value = parameter_custom_name;
        refIndustryPBID.current.value = industry_pb_id;
        refStationName.current.value = station_name;
        refStationPBID.current.value = station_pb_id;
        refDevicePBID.current.value = device_pb_id;
        refDeviceParamPBID.current.value = device_param_pb_id;
        refSiteId.current.value = site_id;
        refSiteUid.current.value = site_uid;
        refMonitoringId.current.value = monitoring_id;
        refAnalyzerId.current.value = analyzer_id;
        refParameterId.current.value = parameter_pb_id;
        refUnitId.current.value = unit_id;
        refKey.current.value = key || "";
        refSequenceNumber.current.value = sequence_number;
        refNumberOfBytes.current.value = Number_of_bytes;
        refHoldingRegisterNumber.current.value = holding_register_number;
        refStartingRegister.current.value = starting_register;
        refFunctionValue.current.value = function_value;
        refMinStdValue.current.value = min_std_value;
        refMaxStdValue.current.value = max_std_value;
        refMultiplicationFactor.current.value = multiplication_factor;
        refConversionType.current.value = conversion_type;
        refConstantValue420.current.value = constant_value_420;
        refRange420.current.value = range_420;
        refConstantSubtraction420.current.value = constant_subtraction_420;
        refToPCB.current.value = to_pcb;
        refByteReadingOrder.current.value = byte_reading_order;
        refMinValidValue.current.value = min_vaild_value;
        refMaxValidValue.current.value = max_valid_value;
        refZData.current.value = Number(z_data);
        refStatus.current.value = status === "true" ? true : false;
        refParameterStatus.current.value =
          parameter_status === "true" ? true : false;
        refDeviceStatus.current.value = device_status === "true" ? true : false;
        refClientStatus.current.value = client_status === "true" ? true : false;
        refToCPCB.current.value = to_cpcb === "true" ? true : false;
        refToWayCommunication.current.value =
          two_way_communication === "true" ? true : false;
        setIndustryName(industry_name || "Not available");
        setDeviceName(device_name || "Not available");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (parameters) {
      getDeviceData();
    }
  }, [parameters]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("processing...");
    try {
      const dataObj = {
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
      const res = await axios.patch(
        `${window.apiURL}/data_setting/update/${dataSetting_id}/${parameter_id}`,
        dataObj
      );
      if (res.status === 201) {
        setError("");
        setMessage("Data setting updated successfully!");
      }
    } catch (error) {
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
                  overflowX: "scroll",
                }}
              >
                <div className="d-flex">
                  <p className="me-3">
                    Industry:{" "}
                    <span className="fw-bold text-primary">{industryName}</span>
                  </p>
                  <p className="me-3">
                    Device:{" "}
                    <span className="fw-bold text-primary">{deviceName}</span>
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <fieldset>
                    <FormLegend msg={"Update Data Setting"} />
                    <div className="row g-3">
                      <div className="col-9 col-sm-10 col-xl-11">
                        <label
                          htmlFor="selectInstrument"
                          className="col-form-label"
                        >
                          Select instrument:
                        </label>
                        <select
                          id="selectInstrument"
                          defaultValue={""}
                          className="form-select"
                          ref={refInstrument}
                        >
                          <option value="">Select instrument</option>
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
                        <label
                          htmlFor="selectParameter"
                          className="col-form-label"
                        >
                          Select parameter:
                        </label>
                        <select
                          id="selectParameter"
                          defaultValue={""}
                          className="form-select"
                          ref={refParameter}
                        >
                          <option value="">Select parameter</option>
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
                        <label
                          htmlFor="parameterName"
                          className="col-form-label"
                        >
                          Parameter name:
                        </label>
                        <input
                          id="parameterName"
                          ref={refParameterName}
                          type="text"
                          className="form-control"
                          placeholder="Parameter name *"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label
                          htmlFor="industryPBID"
                          className="col-form-label"
                        >
                          Industry Id:
                        </label>
                        <input
                          id="industryPBID"
                          ref={refIndustryPBID}
                          type="text"
                          className="form-control"
                          placeholder="Industry id *"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label htmlFor="stationName" className="col-form-label">
                          Station name:
                        </label>
                        <input
                          id="stationName"
                          ref={refStationName}
                          type="text"
                          className="form-control"
                          placeholder="Station name *"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label htmlFor="stationId" className="col-form-label">
                          Station Id:
                        </label>
                        <input
                          id="stationId"
                          ref={refStationPBID}
                          type="text"
                          className="form-control"
                          placeholder="Station id *"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label htmlFor="devicePBID" className="col-form-label">
                          Device Id:
                        </label>
                        <input
                          id="devicePBID"
                          ref={refDevicePBID}
                          type="text"
                          className="form-control"
                          placeholder="Device Id *"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label
                          htmlFor="deviceParamPBID"
                          className="col-form-label"
                        >
                          Device Param Id:
                        </label>
                        <input
                          id="deviceParamPBID"
                          ref={refDeviceParamPBID}
                          type="text"
                          className="form-control"
                          placeholder="Device param id"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label htmlFor="siteId" className="col-form-label">
                          Site Id :
                        </label>
                        <input
                          id="siteId"
                          ref={refSiteId}
                          type="text"
                          className="form-control"
                          placeholder="Site Id"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label htmlFor="siteUid" className="col-form-label">
                          Site Uid :
                        </label>
                        <input
                          id="siteUid"
                          ref={refSiteUid}
                          type="text"
                          className="form-control"
                          placeholder="Site Uid"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label
                          htmlFor="monitoringId"
                          className="col-form-label"
                        >
                          Monitoring Id:
                        </label>
                        <input
                          id="monitoringId"
                          ref={refMonitoringId}
                          type="text"
                          className="form-control"
                          placeholder="Monitoring Id"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label htmlFor="analyzerId" className="col-form-label">
                          Analyzer Id:
                        </label>
                        <input
                          id="analyzerId"
                          ref={refAnalyzerId}
                          type="text"
                          className="form-control"
                          placeholder="Analyzer Id"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label htmlFor="parameterId" className="col-form-label">
                          Parameter Id:
                        </label>
                        <input
                          id="parameterId"
                          ref={refParameterId}
                          type="text"
                          className="form-control"
                          placeholder="Parameter Id"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label htmlFor="unitId" className="col-form-label">
                          Unit Id:
                        </label>
                        <input
                          id="unitId"
                          ref={refUnitId}
                          type="text"
                          className="form-control"
                          placeholder="Unit Id"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label htmlFor="Key" className="col-form-label">
                          API key:
                        </label>
                        <input
                          id="Key"
                          ref={refKey}
                          type="text"
                          className="form-control"
                          placeholder="API key"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label htmlFor="stationName" className="col-form-label">
                          Sequence number:
                        </label>
                        <input
                          ref={refSequenceNumber}
                          required
                          type="text"
                          className="form-control"
                          placeholder="Sequence number *"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label
                          htmlFor="numberOfBytes"
                          className="col-form-label"
                        >
                          Number of bytes:
                        </label>
                        <input
                          ref={refNumberOfBytes}
                          type="text"
                          className="form-control"
                          placeholder="Number of bytes *"
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <label
                          htmlFor="holdingRegisterNumber"
                          className="col-form-label"
                        >
                          Holding register number:
                        </label>
                        <input
                          id="holdingRegisterNumber"
                          ref={refHoldingRegisterNumber}
                          type="text"
                          className="form-control"
                          placeholder="Holding register number *"
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <label
                          htmlFor="startingRegister"
                          className="col-form-label"
                        >
                          Starting Register:
                        </label>
                        <input
                          id=""
                          ref={refStartingRegister}
                          required
                          type="text"
                          className="form-control"
                          placeholder="Starting Register *"
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <label
                          htmlFor="functionValue"
                          className="col-form-label"
                        >
                          Function value:
                        </label>
                        <input
                          id="functionValue"
                          ref={refFunctionValue}
                          type="text"
                          className="form-control"
                          placeholder="Function value *"
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <label htmlFor="minStdValue" className="col-form-label">
                          Min std value:
                        </label>
                        <input
                          id="minStdValue"
                          ref={refMinStdValue}
                          required
                          step="any"
                          type="text"
                          className="form-control"
                          placeholder="Min std value *"
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <label htmlFor="maxStdValue" className="col-form-label">
                          Max std value:
                        </label>
                        <input
                          id="maxStdValue"
                          ref={refMaxStdValue}
                          required
                          step="any"
                          type="text"
                          className="form-control"
                          placeholder="Max std value *"
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <label
                          htmlFor="multiplicationFactor"
                          className="col-form-label"
                        >
                          Multiplication factor:
                        </label>
                        <input
                          id="multiplicationFactor"
                          ref={refMultiplicationFactor}
                          required
                          step="any"
                          type="text"
                          className="form-control"
                          placeholder="Multiplication factor *"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label
                          htmlFor="conversionType"
                          className="col-form-label"
                        >
                          Select conversion type:
                        </label>
                        <select
                          id="conversionType"
                          defaultValue={""}
                          className="form-select"
                          ref={refConversionType}
                        >
                          <option value="">Select conversion type</option>
                          <option value="Decimal">Decimal</option>
                          <option value="NM">NM</option>
                          <option value="Float">Float</option>
                          <option value="4-20 mA">4-20 mA</option>
                          <option value="Decimal to Hexa">
                            Decimal to Hexa
                          </option>
                        </select>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label
                          htmlFor="constantValue420"
                          className="col-form-label"
                        >
                          Constant Value 4-20:
                        </label>
                        <input
                          id="constantValue420"
                          ref={refConstantValue420}
                          type="text"
                          className="form-control"
                          placeholder="Constant Value 4-20 *"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label htmlFor="range420" className="col-form-label">
                          Range 4-20:
                        </label>
                        <input
                          id="range420"
                          ref={refRange420}
                          type="text"
                          className="form-control"
                          placeholder="Range 4-20 *"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label
                          htmlFor="constantSubtraction420"
                          className="col-form-label"
                        >
                          Constant Subtraction 4-20:
                        </label>
                        <input
                          id="constantSubtraction420"
                          ref={refConstantSubtraction420}
                          type="text"
                          className="form-control"
                          placeholder="Constant Subtraction 4-20 *"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label htmlFor="toPCB" className="col-form-label">
                          Select PCB:
                        </label>
                        <select
                          id="toPCB"
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
                        <label
                          htmlFor="byteReadingOrder"
                          className="col-form-label"
                        >
                          Byte reading order:
                        </label>
                        <input
                          id="byteReadingOrder"
                          ref={refByteReadingOrder}
                          type="text"
                          className="form-control"
                          placeholder="Byte reading order *"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label
                          htmlFor="minValidValue"
                          className="col-form-label"
                        >
                          Min vaild value:
                        </label>
                        <input
                          id="minValidValue"
                          ref={refMinValidValue}
                          required
                          type="text"
                          className="form-control"
                          placeholder="Min vaild value *"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label
                          htmlFor="maxValidValue"
                          className="col-form-label"
                        >
                          Max valid value:
                        </label>
                        <input
                          id="maxValidValue"
                          ref={refMaxValidValue}
                          required
                          type="text"
                          className="form-control"
                          placeholder="Max valid value *"
                        ></input>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label htmlFor="zData" className="col-form-label">
                          Select Z data:
                        </label>
                        <select
                          id="zData"
                          defaultValue=""
                          className="form-select"
                          ref={refZData}
                        >
                          <option value="">Select Z data</option>
                          <option value={0}>0</option>
                          <option value={1}>1</option>
                        </select>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label htmlFor="status" className="col-form-label">
                          Select Status:
                        </label>
                        <select
                          id="status"
                          defaultValue=""
                          className="form-select"
                          ref={refStatus}
                        >
                          <option value="">Select Status</option>
                          <option value={true}>Active</option>
                          <option value={false}>Inactive</option>
                        </select>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label
                          htmlFor="parameterStatus"
                          className="col-form-label"
                        >
                          Select Parameter Status:
                        </label>
                        <select
                          id="parameterStatus"
                          defaultValue=""
                          className="form-select"
                          ref={refParameterStatus}
                        >
                          <option value="">Select Parameter Status</option>
                          <option value={true}>Active</option>
                          <option value={false}>Inactive</option>
                        </select>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label
                          htmlFor="deviceStatus"
                          className="col-form-label"
                        >
                          Select Device Status:
                        </label>

                        <select
                          id="deviceStatus"
                          defaultValue=""
                          className="form-select"
                          ref={refDeviceStatus}
                        >
                          <option value="">Select Device Status</option>
                          <option value={true}>Active</option>
                          <option value={false}>Inactive</option>
                        </select>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label
                          htmlFor="clientStatus"
                          className="col-form-label"
                        >
                          Select Client Status:
                        </label>
                        <select
                          id="clientStatus"
                          defaultValue=""
                          className="form-select"
                          ref={refClientStatus}
                        >
                          <option value="">Select Client Status</option>
                          <option value={true}>Active</option>
                          <option value={false}>Inactive</option>
                        </select>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label htmlFor="toCPCB" className="col-form-label">
                          Select To CPCB:
                        </label>
                        <select
                          id="toCPCB"
                          defaultValue=""
                          className="form-select"
                          ref={refToCPCB}
                        >
                          <option value="">Select To CPCB</option>
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </select>
                      </div>

                      <div className="col-9 col-sm-10 col-xl-11">
                        <label
                          htmlFor="toWayCommunication"
                          className="col-form-label"
                        >
                          Select Tow way communication:
                        </label>
                        <select
                          id="toWayCommunication"
                          defaultValue=""
                          className="form-select"
                          ref={refToWayCommunication}
                        >
                          <option value="">Select Tow way communication</option>
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
                          <button type="submit" className="btn btn-success">
                            Upadte
                          </button>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateDataSetting;
