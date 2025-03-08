import { Link } from "react-router-dom";

export const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Industry name",
    accessor: "industry_name",
    Cell: ({ cell }) =>{
      return <Link to={`/${cell.row.original.industry_id}`} >{cell.row.values.industry_name}</Link>}
  },
  {
    Header: "Device name",
    accessor: "device_name",
  },
  {
    Header: "Device category",
    accessor: "device_category",
  },
  {
    Header: "Status",
    accessor: "industry_status",
  },
  {
    Header: "Last data recived",
    accessor: "last_data_recived",
  },
  {
    Header: "Address",
    accessor: "address",
  },
  {
    Header: "City",
    accessor: "city",
  },
  {
    Header: "State",
    accessor: "state",
  },
  {
    Header: "Pincode",
    accessor: "pincode",
  },
  {
    Header: "Latitude",
    accessor: "latitude",
  },
  {
    Header: "Longitude",
    accessor: "longitude",
  },
  {
    Header: "Ganga basin",
    accessor: "ganga_basin",
  },
  {
    Header: "Offline count",
    accessor: "offline_count",
  },
  {
    Header: "Delay count",
    accessor: "delay_count",
  },
];
