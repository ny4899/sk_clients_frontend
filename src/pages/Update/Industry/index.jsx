import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import FormLegend from "../../../components/IndustryDashboard/FormLegend";
import { nanoid } from "nanoid";

const UpdateIndustry = () => {
  const { industry_id } = useParams();
  const navigate = useNavigate();
  const [formMessage, setFormMessage] = useState("");

  const [inputMessage, setInputMessage] = useState("Loading...");

  const [categoryList, setCategoryList] = useState("");
  const [typeList, setTypeList] = useState("");
  const [partnerList, setPartnerList] = useState("");

  const [message, setMessage] = useState("");
  const [addCategoryMessage, setAddCategoryMessage] = useState("");
  const [addTypeMessage, setAddTypeMessage] = useState("");
  const [addPartnerMessage, setAddPartnerMessage] = useState("");

  const [error, setError] = useState("");
  const [addCategoryError, setAddCategoryError] = useState("");
  const [addTypeError, setAddTypeError] = useState("");
  const [addPartnerError, setAddPartnerError] = useState("");

  const refName = useRef(null);
  const refCategory = useRef(null);
  const refIndustry = useRef(null);
  const refENM = useRef(null);
  const refShowToCPCB = useRef(null);
  const refShowToSPCB = useRef(null);
  const refIndustryAs = useRef(null);
  const refPartner = useRef(null);

  const refAddCategory = useRef(null);
  const refAddType = useRef(null);
  const refAddPartner = useRef(null);

  useEffect(() => {
    const timeId = setTimeout(() => {
      if (message || error) {
        setMessage("");
        setError("");
      }
      if (addCategoryMessage || addCategoryError) {
        setAddCategoryMessage("");
        setAddCategoryError("");
      }
      if (addTypeMessage || addTypeError) {
        setAddTypeMessage("");
        setAddTypeError("");
      }
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [
    message,
    addTypeMessage,
    addCategoryMessage,
    error,
    addTypeError,
    addCategoryError,
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios(`${window.apiURL}/industry_categories`);
        setCategoryList(res.data.data.industry_categories);
      } catch (error) {
        setInputMessage(`Somthing went wrong ${error.message}`);
      }
    }
    fetchData();
  }, [addCategoryMessage]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios(`${window.apiURL}/industry_types`);
        setTypeList(res.data.data.industry_types);
      } catch (error) {
        setInputMessage(`Somthing went wrong ${error.message}`);
      }
    }
    fetchData();
  }, [addTypeMessage]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios(`${window.apiURL}/partner`);
        setPartnerList(res.data.data.partners);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, [addPartnerMessage]);

  const getAllIndustries = async () => {
    try {
      const res = await axios(`${window.apiURL}/industries/${industry_id}`);

      if (res.status === 200) {
        const {
          industry_name,
          industry_category,
          industry_type,
          exceedance_notification_mail,
          show_to_CPCB,
          show_to_PCB,
          industry_as,
          industry_partner,
        } = res.data.data.industry;

        refName.current.value = industry_name;
        refCategory.current.value = industry_category;
        refIndustry.current.value = industry_type;
        refENM.current.value = exceedance_notification_mail;
        refShowToCPCB.current.value = show_to_CPCB;
        refShowToSPCB.current.value = show_to_PCB;
        refIndustryAs.current.value = industry_as;
        refPartner.current.value = industry_partner;
      } else {
        setFormMessage(`Unable to fetch: try again!`);
      }
    } catch (error) {
      console.log(error);
      setFormMessage(`Something went wrong: ${error.message}`);
    }
  };

  useEffect(() => {
    if (partnerList) {
      getAllIndustries();
    }
  }, [partnerList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("processing!");
    try {
      const dataObj = {
        industry_name: refName.current.value,
        industry_category: refCategory.current.value,
        industry_type: refIndustry.current.value,
        exceedance_notification_mail: refENM.current.value,
        show_to_CPCB: refShowToCPCB.current.value,
        show_to_PCB: refShowToSPCB.current.value,
        industry_as: refIndustryAs.current.value,
        industry_partner: refPartner.current.value,
      };
      const res = await axios.patch(
        `${window.apiURL}/industries/${industry_id}`,
        dataObj
      );
      if (res.status === 201) {
        setMessage("Updated successfully!");
      }
    } catch (error) {
      setMessage("");
      setError(`Something went wrong! ${error.message}`);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setAddCategoryMessage("Processing...");
    try {
      const dataObj = {
        category_name: refAddCategory.current.value,
      };

      const res = await axios.post(
        `${window.apiURL}/industry_categories`,
        dataObj
      );
      if (res.status === 201) {
        setAddCategoryMessage("Category Added successfully");
        refAddCategory.current.value = "";
      }
    } catch (error) {
      if (error.response.data.message.includes("E11000")) {
        setAddCategoryMessage("");
        setAddCategoryError(`Category already exist!`);
      } else {
        setAddCategoryMessage("");
        setAddCategoryError(`Something went wrong! ${error.message}`);
      }
    }
  };

  const handleAddType = async (e) => {
    e.preventDefault();
    setAddTypeMessage("Processing...");
    try {
      const dataObj = {
        type_name: refAddType.current.value,
      };

      const res = await axios.post(`${window.apiURL}/industry_types`, dataObj);
      if (res.status === 201) {
        setAddTypeMessage("Type Added successfully");
        refAddType.current.value = "";
      }
    } catch (error) {
      if (error.response.data.message.includes("E11000")) {
        setAddTypeMessage("");
        setAddTypeError(`Type already exist!`);
      } else {
        setAddTypeMessage("");
        setAddTypeError(`Something went wrong! ${error.message}`);
      }
    }
  };

  const handleAddPartner = async (e) => {
    e.preventDefault();
    setAddPartnerMessage("Processing...");
    try {
      const dataObj = {
        partner_name: refAddPartner.current.value,
      };
      const res = await axios.post(`${window.apiURL}/partner`, dataObj);
      if (res.status === 201) {
        setAddPartnerMessage("Type Added successfully");
        refAddPartner.current.value = "";
      }
    } catch (error) {
      if (error.response.data.message.includes("E11000")) {
        setAddPartnerMessage("");
        setAddPartnerError(`Type already exist!`);
      } else {
        setAddPartnerMessage("");
        setAddPartnerError(`Something went wrong! ${error.message}`);
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
                {!formMessage ? (
                  <form onSubmit={handleSubmit} className={`mt-3`}>
                    <fieldset>
                      <FormLegend msg={"Update Industry"} />
                      <div className="row gx-3 gy-2">
                        {/* ================================== */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="name" className="col-form-label">
                            Name:
                          </label>
                          <input
                            id="name"
                            ref={refName}
                            required
                            type="text"
                            className="form-control"
                            placeholder="Name *"
                          ></input>
                        </div>

                        {/* col-10  */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label
                            htmlFor="selectCategory"
                            className="col-form-label"
                          >
                            select category:
                          </label>
                          <select
                            id="selectCategory"
                            defaultValue={"DEFAULT_Industry"}
                            className="form-select"
                            ref={refCategory}
                          >
                            <option disabled value="DEFAULT_Industry">
                              Select Category
                            </option>
                            {categoryList ? (
                              categoryList.map((name) => {
                                return (
                                  <option
                                    key={name._id}
                                    value={name.category_name}
                                  >
                                    {name.category_name}
                                  </option>
                                );
                              })
                            ) : (
                              <option disabled value="loading">
                                {inputMessage}
                              </option>
                            )}
                          </select>
                        </div>

                        {/* col-2 */}
                        <div className="col-3 col-sm-2 col-xl-1 d-flex align-items-end ">
                          <button
                            type="button"
                            className="btn btn-secondary d-inline-block"
                            data-bs-toggle="modal"
                            data-bs-target="#categoryModalContainer"
                          >
                            New
                          </button>
                        </div>

                        {/* col-10  */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label
                            htmlFor="selectType"
                            className="col-form-label"
                          >
                            Select Type:
                          </label>
                          <select
                            id="selectType"
                            defaultValue={""}
                            className="form-select"
                            ref={refIndustry}
                          >
                            <option disabled value="">
                              Select Type
                            </option>
                            {typeList ? (
                              typeList.map((name) => {
                                return (
                                  <option key={name._id} value={name.type_name}>
                                    {name.type_name}
                                  </option>
                                );
                              })
                            ) : (
                              <option disabled value="loading">
                                {inputMessage}
                              </option>
                            )}
                          </select>
                        </div>

                        {/* col-2 */}
                        <div className="col-3 col-sm-2 col-xl-1 d-flex align-items-end ">
                          <button
                            type="button"
                            className="btn btn-secondary d-inline-block"
                            data-bs-toggle="modal"
                            data-bs-target="#typeModalContainer"
                          >
                            New
                          </button>
                        </div>

                        {/* col-10  */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="enm" className="col-form-label">
                            Exceedance Notification mail:
                          </label>
                          <select
                            id="enm"
                            defaultValue={""}
                            className="form-select"
                            ref={refENM}
                          >
                            <option disabled value="">
                              Exceedance Notification mail
                            </option>
                            <option value={true}>Yes</option>
                            <option value={false}>no</option>
                          </select>
                        </div>

                        {/* col-10  */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="toCPCB" className="col-form-label">
                            Show Industry to CPCB:
                          </label>
                          <select
                            required
                            id="toCPCB"
                            defaultValue={""}
                            className="form-select"
                            ref={refShowToCPCB}
                          >
                            <option disabled value="">
                              Show Industry to CPCB?
                            </option>
                            <option value={true}>Yes</option>
                            <option value={false}>no</option>
                          </select>
                        </div>

                        {/* col-10  */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="toSPCB" className="col-form-label">
                            Show Industry to SPCB:
                          </label>
                          <select
                            required
                            id="toSPCB"
                            defaultValue={""}
                            className="form-select"
                            ref={refShowToSPCB}
                          >
                            <option disabled value="">
                              Show Industry to CPCB?
                            </option>
                            <option value={true}>Yes</option>
                            <option value={false}>no</option>
                          </select>
                        </div>

                        {/* col-10  */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label
                            htmlFor="selectOption"
                            className="col-form-label"
                          >
                            Select Option:
                          </label>
                          <select
                            id="selectOption"
                            defaultValue={""}
                            className="form-select"
                            ref={refIndustryAs}
                          >
                            <option disabled value="">
                              Select Option
                            </option>
                            <option value="client">client</option>
                            <option value="partner">partner</option>
                          </select>
                        </div>

                        {/* col-10  */}
                        {/* <div className="col-9 col-sm-10 col-xl-11">
                          <label
                            htmlFor="selectPartner"
                            className="col-form-label"
                          >
                            Select Partner:
                          </label>
                          <select
                            id="selectPartner"
                            defaultValue={""}
                            className="form-select"
                            ref={refPartner}
                          >
                            <option disabled value="">
                              Select Partner
                            </option>
                            <option value="envirozone">Envirozone</option>
                            <option value="ingeo">Ingeo</option>
                            <option value="hitech enviro solutions">
                              Hitech Enviro Solutions
                            </option>
                          </select>
                        </div> */}
                        {/* col-10  */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label
                            htmlFor="selectPartner"
                            className="col-form-label"
                          >
                            select Partners:
                          </label>
                          <select
                            id="selectPartner"
                            defaultValue={""}
                            className="form-select"
                            ref={refPartner}
                          >
                            <option disabled value="">
                              Select Partners
                            </option>
                            {partnerList ? (
                              partnerList.map(({ partner_name }) => {
                                return (
                                  <option key={nanoid()} value={partner_name}>
                                    {partner_name}
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
                        
                        {/* col-2 */}
                        <div className="col-3 col-sm-2 col-xl-1">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-toggle="modal"
                            data-bs-target="#partnerModalContainer"
                          >
                            New
                          </button>
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
                              onClick={() => navigate(-1)}
                              className="btn btn-secondary me-2"
                            >
                              Back
                            </button>
                            <button type="submit" className="btn btn-success">
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                ) : (
                  <h6 className="text-center my-4">{formMessage}</h6>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal create category  */}

      <div
        className="modal fade"
        id="categoryModalContainer"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleAddCategory}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Category
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-light">
              <div className="row gy-1">
                {addCategoryError ? (
                  <div className="col-12">
                    <div className="alert alert-danger py-2" role="alert">
                      {addCategoryError}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {addCategoryMessage ? (
                  <div className="col-12">
                    <div className="alert alert-success py-2" role="alert">
                      {addCategoryMessage}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Category name *"
                    ref={refAddCategory}
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary btn-sm">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* modal create type  */}

      <div
        className="modal fade"
        id="typeModalContainer"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleAddType}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Type
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-light">
              <div className="row gy-1">
                {addTypeError ? (
                  <div className="col-12">
                    <div className="alert alert-danger py-2" role="alert">
                      {addTypeError}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {addTypeMessage ? (
                  <div className="col-12">
                    <div className="alert alert-success py-2" role="alert">
                      {addTypeMessage}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Type name *"
                    required
                    ref={refAddType}
                  ></input>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary btn-sm">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* modal create partner  */}

      <div
        className="modal fade"
        id="partnerModalContainer"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleAddPartner}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Partner
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-light">
              <div className="row gy-1">
                {addPartnerError ? (
                  <div className="col-12">
                    <div className="alert alert-danger py-2" role="alert">
                      {addPartnerError}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {addPartnerMessage ? (
                  <div className="col-12">
                    <div className="alert alert-success py-2" role="alert">
                      {addPartnerMessage}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Partner name *"
                    required
                    ref={refAddPartner}
                  ></input>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary btn-sm">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateIndustry;
