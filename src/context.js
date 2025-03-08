import { useContext, createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [deviceNameForGraph, setDeviceNameForGraph] = useState("");
  const [allDevices, setAllDevices] = useState(null);
  const [industriesData, setIndustriesData] = useState("");
  const [selectedIndustriesName, setSelectedIndustriesName] = useState("");
  const [messageindustryData, setMessageindustryData] =
    useState("Fetching data...");
  const [filterSelectedIndustry, setFilterSelectedIndustry] = useState(null);
  const [filterSelectedCategory, setFilterSelectedCategory] = useState(null);

  // User auth data
  // set from app.js
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [userIndustryId, setUserIndustryId] = useState("");
  const [userIndustryName, setUserIndustryName] = useState("");
  const [userType, setUserType] = useState("");
  const [userSubscribtion, setUserSubscribtion] = useState(null);
  const [userDashboardURL, setUserDashboardURL] = useState("/");

  // dashboard info container
  const [allIndustriesinfo, setAllIndustriesinfo] = useState(null);

  // dashboard map states
  const [mapMessage, setMapMessage] = useState("Loading...");
  const [markersData, setMarkersData] = useState([]);
  const [markers, setMarkers] = useState([]);

  return (
    <AppContext.Provider
      value={{
        allDevices,
        industriesData,
        deviceNameForGraph,
        selectedIndustriesName,
        messageindustryData,
        allIndustriesinfo,
        filterSelectedIndustry,
        filterSelectedCategory,
        setAllDevices,
        setIndustriesData,
        setDeviceNameForGraph,
        setSelectedIndustriesName,
        setMessageindustryData,
        setAllIndustriesinfo,
        setFilterSelectedIndustry,
        setFilterSelectedCategory,

        // map states
        mapMessage,
        markersData,
        markers,
        setMapMessage,
        setMarkersData,
        setMarkers,

        // auth data
        user,
        userType,
        username,
        userIndustryName,
        userIndustryId,
        userSubscribtion,
        userDashboardURL,
        setUser,
        setUserType,
        setUsername,
        setUserIndustryName,
        setUserIndustryId,
        setUserSubscribtion,
        setUserDashboardURL,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
