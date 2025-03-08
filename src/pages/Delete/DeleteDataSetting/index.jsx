import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormLegend from "../../../components/IndustryDashboard/FormLegend";

const DeleteDataSetting = () => {
  const { dataSetting_data, parameter_id } = useParams();
  const allData = dataSetting_data.split("+");
  const industry_name = allData[0];
  const device_name = allData[1];
  const dataSetting_id = allData[2];

  const navigate = useNavigate();

  const [message, setMessage] = useState(
    `Are you sure you want to delete industry: ${industry_name}(${device_name})`
  );
  const [messageBg, setMessageBg] = useState("danger");

  useEffect(() => {
    const timeId = setTimeout(() => {}, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, []);

  const handleDeleteConfirm = async (e) => {
    e.preventDefault();
    setMessage("processing...");
    setMessageBg("info");
    try {
      const res = await axios.patch(
        `${window.apiURL}/data_setting/delete/${dataSetting_id}/${parameter_id}`
      );
      if (res.status === 201) {
        setMessage("Deleted successfully!");
        setMessageBg("success");
        navigate(-1);
      }
    } catch (error) {
      setMessage(`Something went wrong! ${error.message}`);
      setMessageBg("danger");
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
                <form>
                  <fieldset>
                    <FormLegend msg={" Delete New"} />
                    <div className="row g-3">
                      {/* ================*/}
                      <div className="col-12">
                        <div
                          className={`alert alert-${messageBg}`}
                          role="alert"
                        >
                          {message}
                        </div>
                      </div>
                      {/* ================*/}

                      <div className="col-12">
                        <span className="d-block text-end">
                          this action can't be undo
                        </span>
                        <div className="d-flex justify-content-end py-2">
                          <button
                            className="btn btn-danger"
                            onClick={(e) => handleDeleteConfirm(e)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      {/* ================*/}
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

export default DeleteDataSetting;
