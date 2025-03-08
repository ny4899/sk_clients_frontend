import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import { LoginForm, Loading, Navbar } from "./components";
import {
  Dashboard,
  IndustryDashBoard,
  Stations,
  Licenses,
  Devices,
  Consumables,
  Parameters,
  Partners,
  Location,
  Industry,
  People,
  Maintenance,
  Calibration,
  RawDataListing,
  Audit,
  CloseIndustry,
  ImportIndustryData,
  CameraConfig,
  DataSettings,
  CPCBlog,
  HRPCBlog,
  DLPCBLog,
  PBPCBLog,
  RSPCBLog,
  MPCBLog,
  GMDALog,
  APCBLog,
  BPCBLog,
  JHPCBLog,
  OfflineAlerts,
  DelayAlerts,
  ExceededParameterAlerts,
  DeceedParameterAlerts,
  IndustrystatusReport,
  IndustrystatusReportCpcb,
  IndustrystatusReportSpcb,
  CreateNewConsumable,
  CreateNewStation,
  CreateNewLicense,
  CreateNewDevice,
  CreateNewParameter,
  CreateNewPartner,
  CreateNewUser,
  CreateNewIndustry,
  CreateNewLocation,
  CreateNewCamera,
  CreateNewDataSetting,
  UpdateIndustry,
  UpdateUser,
  UpdateParameter,
  UpdatePartner,
  UpdateDevice,
  UpdateCamera,
  UpdateDataSetting,
  DeleteIndustry,
  DeleteUser,
  DeleteParameter,
  DeleteDevice,
  DeleteCamera,
  DeleteDataSetting,
  AssignedStations,
  RequestedAssets,
  EditProfile,
  ChangePassword,
  Nopage,
} from "./pages";
import Graph from "./components/Dashboard/ContentContainer/Graph";
import Map from "./components/Dashboard/ContentContainer/Map";

import IndustryGraph from "./components/IndustryDashboard/ContentContainer/IndustryGraph";
import IndustryMap from "./components/IndustryDashboard/ContentContainer/IndustryMap";
import IndustryCamera from "./components/IndustryDashboard/ContentContainer/industryCamera";

import AdminRoute from "./components/ProtectedRoutes/AdminRoute";
import ServiceEngineerRoute from "./components/ProtectedRoutes/ServiceEngineerRoute";
import ClientRoute from "./components/ProtectedRoutes/clientRoute";
import { useGlobalContext } from "./context";
import PartnerRoute from "./components/ProtectedRoutes/PartnerRoute";

function App() {
  const navigate = useNavigate();
  const refUserName = useRef();
  const refPassword = useRef();
  const [loading, setLoading] = useState(true);
  const [fetchingData, setFetchingData] = useState("");

  const [error, setError] = useState("");

  const {
    user,
    userType,
    industriesToAccess,
    setUser,
    setUserType,
    setUsername,
    setUserIndustryName,
    setUserIndustryId,
    setUserSubscribtion,
    setUserDashboardURL,
  } = useGlobalContext();

  const handleSubmit = async function (e) {
    setFetchingData("Fetching data...");
    e.preventDefault();
    try {
      const data = await axios.post(`${window.apiURL}/users/login`, {
        username: refUserName.current.value,
        password: refPassword.current.value,
      });

      if (data.status === 200 && data.data.status === "success") {
        setUser(data.data);
        setUsername(data.data.username);
        setUserIndustryName(data.data.industry);
        setUserIndustryId(data.data.industry_id);
        setUserType(data.data.usertype);
        setFetchingData("");
        setLoading(false);
        setUserSubscribtion(data.data.subscribtions);

        localStorage.setItem("username", data.data.username);
        localStorage.setItem("password", data.data.passwordStr);

        if (data.data.usertype === "client") {
          navigate(`/${data.data.industry_id}`);
          setUserDashboardURL(`/${data.data.industry_id}`);
          window.location.reload();
        } else {
          navigate(`/`);
        }
        // else if (data.data.usertype === "serviceengineer") {
        //   navigate(`/rawDataListing`);
        // }
      } else if (data.status === 200 && data.data.status === "failed") {
        throw new Error(data.data.msg);
      }
      if (!data.data) {
        setLoading(false);
        throw new Error("Username or password not matched!");
      }
    } catch (error) {
      setFetchingData("");
      setError(error.message);
    }
  };

  useEffect(() => {
    (async function () {
      if (
        localStorage.getItem("username") &&
        localStorage.getItem("password")
      ) {
        try {
          const data = await axios.post(`${window.apiURL}/users/login`, {
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password"),
          });
          if (data.status === 200 && data.data.status === "success") {
            setUser(data.data);
            setUsername(data.data.username);
            setUserIndustryName(data.data.industry);
            setUserIndustryId(data.data.industry_id);
            setUserType(data.data.usertype);
            setFetchingData("");
            setLoading(false);
            setUserSubscribtion(data.data.subscribtions);

            // Have to remove this six line
            localStorage.removeItem("token");
            localStorage.removeItem("industryName");
            localStorage.removeItem("industryId");
            localStorage.removeItem("userType");
            localStorage.removeItem("user");
            localStorage.removeItem("userName");

            if (data.data.usertype === "client") {
              navigate(`/${data.data.industry_id}`);
              setUserDashboardURL(`/${data.data.industry_id}`);
            }
            // else if (data.data.usertype === "serviceengineer") {
            //   navigate(`/rawDataListing`);
            // }
          }
          if (!data.data) {
            setLoading(false);
            setUser("");
            localStorage.removeItem("username");
            localStorage.removeItem("password");
          }
        } catch (error) {
          setLoading(false);
          setUser("");
          localStorage.removeItem("username");
          localStorage.removeItem("password");
        }
      } else {
        setLoading(false);
        setUser("");
      }
    })();
  }, []);

  const refmaincontainer = useRef(null);
  const toggleClass = () => {
    let element = refmaincontainer.current;
    const withConatinerFull = "main__wrapper container__full";
    const withOutConatinerFull = "main__wrapper";

    if (element.className === withConatinerFull) {
      element.className = withOutConatinerFull;
    } else if (element.className === withOutConatinerFull) {
      element.className = withConatinerFull;
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <LoginForm
        handleSubmit={handleSubmit}
        refUserName={refUserName}
        refPassword={refPassword}
        error={error}
        setError={setError}
        fetchingData={fetchingData}
      />
    );
  }

  return (
    <div className="site__warpper">
      <Navbar toggleClass={toggleClass} setUser={setUser} />
      <div ref={refmaincontainer} className="main__wrapper">
        <Routes>
          <Route
            element={
              <PartnerRoute userType={userType}>
                <Dashboard />
              </PartnerRoute>
            }
          >
            <Route index element={<Graph />} />
            <Route path="map" element={<Map />} />
          </Route>
          <Route
            element={
              <ClientRoute
                userType={userType}
                industriesToAccess={industriesToAccess}
              >
                <IndustryDashBoard />
              </ClientRoute>
            }
          >
            <Route path="/:industry_name" element={<IndustryGraph />} />
            <Route path="/map/:industry_name" element={<IndustryMap />} />
            <Route path="/camera/:industry_name" element={<IndustryCamera />} />
          </Route>
          <Route path="/licenses" element={<Licenses />} />
          <Route path="/stations" element={<Stations />} />
          <Route path="consumables" element={<Consumables />} />
          <Route
            path="parameters"
            element={
              <AdminRoute userType={userType}>
                <Parameters />
              </AdminRoute>
            }
          />
          <Route
            path="partners"
            element={
              <AdminRoute userType={userType}>
                <Partners />
              </AdminRoute>
            }
          />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="calibration" element={<Calibration />} />
          <Route
            path="rawDataListing"
            element={
              <ServiceEngineerRoute userType={userType}>
                <RawDataListing />
              </ServiceEngineerRoute>
            }
          />
          {/* create new  */}
          <Route path="createNewStation" element={<CreateNewStation />} />
          <Route path="createNewLicense" element={<CreateNewLicense />} />
          <Route path="createNewDevice" element={<CreateNewDevice />} />
          <Route path="createNewConsumable" element={<CreateNewConsumable />} />
          <Route path="createNewParameter" element={<CreateNewParameter />} />
          <Route path="createNewPartner" element={<CreateNewPartner />} />
          <Route path="createNewUser" element={<CreateNewUser />} />
          <Route path="createNewIndustry" element={<CreateNewIndustry />} />
          <Route path="createNewLocation" element={<CreateNewLocation />} />
          <Route path="createNewCamera" element={<CreateNewCamera />} />
          <Route
            path="createNewDataSetting"
            element={<CreateNewDataSetting />}
          />

          {/* Update  */}
          <Route
            path="updateIndustry/:industry_id"
            element={<UpdateIndustry />}
          />
          <Route path="updateUser" element={<UpdateUser />} />
          <Route path="updateParameter" element={<UpdateParameter />} />
          <Route path="updatePartner" element={<UpdatePartner />} />
          <Route
            path="updateDevice/:industry_id/:device_id"
            element={<UpdateDevice />}
          />
          <Route path="updateCamera" element={<UpdateCamera />} />
          <Route
            path="updatedatasetting/:dataSetting_id/:parameter_id"
            element={<UpdateDataSetting />}
          />

          {/* delete  */}
          <Route
            path="deleteIndustry/:industry_data"
            element={<DeleteIndustry />}
          />
          <Route path="deleteUser" element={<DeleteUser />} />
          <Route path="deleteParameter" element={<DeleteParameter />} />
          <Route
            path="deleteDevice/:industry_id/:device_data"
            element={<DeleteDevice />}
          />
          <Route path="deleteCamera" element={<DeleteCamera />} />
          <Route
            path="deletedatasetting/:dataSetting_data/:parameter_id"
            element={<DeleteDataSetting />}
          />
          {/* Admin  */}
          <Route path="assignedStations" element={<AssignedStations />} />
          <Route path="requestedAssets" element={<RequestedAssets />} />
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="changePassword" element={<ChangePassword />} />
          {/* configure  */}
          <Route path="people" element={<People />} />
          <Route path="industry" element={<Industry />} />
          <Route path="devices" element={<Devices />} />
          <Route path="location" element={<Location />} />
          <Route path="cameraconfig" element={<CameraConfig />} />
          <Route path="datasettings" element={<DataSettings />} />
          {/* settings  */}
          <Route path="audit" element={<Audit />} />
          <Route path="closeIndustry" element={<CloseIndustry />} />
          <Route path="importIndustryData" element={<ImportIndustryData />} />
          {/* reports  */}
          <Route path="cpcblog" element={<CPCBlog />} />
          <Route path="hrpcblog" element={<HRPCBlog />} />
          <Route path="dlpcblog" element={<DLPCBLog />} />
          <Route path="pbpcblog" element={<PBPCBLog />} />
          <Route path="rspcblog" element={<RSPCBLog />} />
          <Route path="mpcblog" element={<MPCBLog />} />
          <Route path="gmdalog" element={<GMDALog />} />
          <Route path="apcblog" element={<APCBLog />} />
          <Route path="bpcblog" element={<BPCBLog />} />
          <Route path="jhpcblog" element={<JHPCBLog />} />
          <Route path="offlineAlerts" element={<OfflineAlerts />} />
          <Route path="delayAlerts" element={<DelayAlerts />} />
          <Route
            path="exceededParameterAlerts"
            element={<ExceededParameterAlerts />}
          />
          <Route
            path="deceedParameterAlerts"
            element={<DeceedParameterAlerts />}
          />
          <Route
            path="industrystatus-report"
            element={<IndustrystatusReport />}
          />
          <Route
            path="industrystatus-report-cpcb"
            element={<IndustrystatusReportCpcb />}
          />
          <Route
            path="industrystatus-report-spcb"
            element={<IndustrystatusReportSpcb />}
          />

          <Route path="*" element={<Nopage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
