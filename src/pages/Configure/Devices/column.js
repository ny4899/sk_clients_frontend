import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const EditButton = ({ cell }) => {
  return (
    <div className="d-flex">
      <Link
        to={`/updateDevice/${cell.row.original.indutry_id}/${cell.row.original.device_id}`}
        title="Edit data settings"
        className="btn btn-sm btn-warning text-white"
      >
        <FontAwesomeIcon icon={faPen} />
      </Link>
      <Link
        to={`/deleteDevice/${cell.row.original.indutry_id}/${cell.row.original.device_id}+${cell.row.original.device_name}`}
        title="Edit data settings"
        className="btn btn-sm btn-danger ms-2"
      >
        <FontAwesomeIcon icon={faTrash} />
      </Link>
    </div>
  );
};

export const COLUMNS = [
  {
    Header: "Industry id",
    accessor: "indutry_id",
  },
  {
    Header: "Device id",
    accessor: "device_id",
  },
  {
    Header: "Industry name",
    accessor: "industry_name",
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
    Header: "Device supplier",
    accessor: "device_supplier",
  },
  {
    Header: "Device manufacturer",
    accessor: "device_manufacturer",
  },
  {
    Header: "Device model no.",
    accessor: "device_model_number",
  },
  {
    Header: "Actions",
    Cell: ({ cell }) => <EditButton cell={cell} />,
  },
];
