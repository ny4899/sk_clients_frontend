import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./filter.scss";
import Select from "react-select";
import { useGlobalContext } from "../../../context";
const Filter = ({
  industriesNames,
  allState,
  allCategories,
  setIndustriesData,
  setSelectedIndustriesId,
  setSelectedIndustriesName,
  setAllDevices,
  setErrorindustryData,
  setMessageindustryData,
}) => {
  const navigate = useNavigate();
  const [industryNamesFiltered, setIndustryNamesFiltered] =
    useState(industriesNames);
  const [allCategoriesFiltered, setAllCategoriesFiltered] =
    useState(allCategories);
  const selectedState = useRef(null);
  const selectedCategory = useRef(null);
  const selectedIndustry = useRef(null);

  const {
    setDeviceNameForGraph,
    setFilterSelectedIndustry,
    setFilterSelectedCategory,
  } = useGlobalContext();

  useEffect(() => {
    if (industriesNames) {
      setIndustryNamesFiltered(industriesNames);
    }
  }, [industriesNames]);

  useEffect(() => {
    if (allCategories) {
      setAllCategoriesFiltered(allCategories);
    }
  }, [allCategories]);

  const showIndustryNames = () => {
    const stateValue = selectedState.current.value;
    const categoryValue = selectedCategory.current.value;
    if (stateValue && categoryValue) {
      setIndustryNamesFiltered(
        industriesNames.filter(
          (item) =>
            item.industry_category === categoryValue &&
            item.state === stateValue
        )
      );
    } else if (stateValue) {
      const filterIndustries = industriesNames.filter(
        (item) => item.state === stateValue
      );
      setIndustryNamesFiltered(filterIndustries);
      const filterCategory = {};
      for (let i = 0; i < filterIndustries.length; i++) {
        const industryCategory = filterIndustries[i].industry_category;
        filterCategory[industryCategory]
          ? (filterCategory[industryCategory] += 1)
          : (filterCategory[industryCategory] = 1);
      }
      setAllCategoriesFiltered(filterCategory);
    } else if (categoryValue) {
      setIndustryNamesFiltered(
        industriesNames.filter(
          (item) => item.industry_category === categoryValue
        )
      );
    } else {
      setIndustryNamesFiltered(industriesNames);
    }
  };

  const handleSelectedIndustry = async () => {
    setErrorindustryData("");
    setMessageindustryData("Fetching data...");
    if (selectedIndustry.current.value) {
      const industryId = selectedIndustry.current.value.split(",")[0];
      const industryName = selectedIndustry.current.value.split(",")[1];
      try {
        navigate(`/${industryId}`);
        const result = await axios(`${window.apiURL}/industries/${industryId}`);
        setSelectedIndustriesId(industryId);
        setSelectedIndustriesName(industryName);
        setIndustriesData(result.data.data.industry);
        setAllDevices(result.data.data.industry.devices);
        setDeviceNameForGraph(result.data.data.industry.devices);
        setMessageindustryData("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const gnerateLebalAndValues = (obj) => {
    let result = [];
    result.push({ value: "", label: `Select all` });
    for (const key in obj) {
      result.push({ value: key, label: `${key}(${obj[key]})` });
    }
    return result;
  };

  return (
    <>
      <div className="p-2">
        <div className="row g-2">
          <div className="col-sm-4">
            {allState ? (
              <Select
                ref={selectedState}
                options={gnerateLebalAndValues(allState)}
                placeholder="Choose State"
                onChange={(e) => {
                  selectedCategory.current.value = "";
                  selectedState.current.value = e.value;
                  setFilterSelectedIndustry(e.value);
                  setFilterSelectedCategory(null);
                  showIndustryNames();
                }}
              />
            ) : (
              <select
                className="form-select"
                disabled
                defaultValue={""}
                aria-label="Default select example"
              >
                <option value="">Fetching...</option>
              </select>
            )}
          </div>
          <div className="col-sm-4">
            {allCategoriesFiltered ? (
              <Select
                ref={selectedCategory}
                options={gnerateLebalAndValues(allCategoriesFiltered)}
                placeholder="Choose Category"
                onChange={(e) => {
                  selectedCategory.current.value = e.value;
                  setFilterSelectedCategory(selectedCategory.current.value);
                  showIndustryNames();
                }}
              />
            ) : (
              <select
                className="form-select"
                disabled
                defaultValue={""}
                aria-label="Default select example"
              >
                <option value="">Fetching...</option>
              </select>
            )}
          </div>
          <div className="col-sm-4">
            {industryNamesFiltered ? (
              <Select
                ref={selectedIndustry}
                options={industryNamesFiltered.map(
                  ({ industry_name, industry_id }) => {
                    return {
                      value: `${industry_id},${industry_name}`,
                      label: industry_name,
                    };
                  }
                )}
                placeholder="Choose Industry"
                onChange={(e) => {
                  selectedIndustry.current.value = e.value;
                  handleSelectedIndustry();
                }}
              />
            ) : (
              <select
                className="form-select"
                disabled
                defaultValue={""}
                aria-label="Default select example"
              >
                <option value="">Fetching...</option>
              </select>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
