import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const EditButton = ({ cell }) => {
  return (
    <div className="d-flex ">
      <Link
        to={`/updatedatasetting/${cell.row.original.dataSetting_id}/${cell.row.original.parameter_id}`}
        title="Edit data settings"
        className="btn btn-sm btn-warning text-white"
      >
        <FontAwesomeIcon icon={faPen} />
      </Link>
      <Link
        to={`/deletedatasetting/${cell.row.original.dataSetting_industry_name}+${cell.row.original.dataSetting_device_name}+${cell.row.original.dataSetting_id}/${cell.row.original.parameter_id}`}
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
    Header: "Industry name",
    accessor: "dataSetting_industry_name",
  },
  {
    Header: "Device name",
    accessor: "dataSetting_device_name",
  },
  {
    Header: "Industry Id",
    accessor: "industry_pb_id",
  },
  {
    Header: "Station Name",
    accessor: "station_name",
  },
  {
    Header: "Station Id",
    accessor: "station_pb_id",
  },
  {
    Header: "Device Id",
    accessor: "device_pb_id",
  },
  {
    Header: "Device Param Id",
    accessor: "device_param_pb_id",
  },
  {
    Header: "Site Id",
    accessor: "site_id",
  },
  {
    Header: "Site Uid",
    accessor: "site_uid",
  },
  {
    Header: "Monitoring Id",
    accessor: "monitoring_id",
  },
  {
    Header: "Analyzer Id",
    accessor: "analyzer_id",
  },
  {
    Header: "Parameter Id",
    accessor: "parameter_pb_id",
  },
  {
    Header: "Unit Id",
    accessor: "unit_id",
  },
  {
    Header: "Instrument name",
    accessor: "instrument",
  },
  {
    Header: "Parameter name",
    accessor: "parameter_name",
  },
  {
    Header: "Parameter unit",
    accessor: "parameter_unit",
  },
  {
    Header: "Parameter custom name",
    accessor: "parameter_custom_name",
  },
  {
    Header: "Sequence no.",
    accessor: "sequence_number",
  },
  {
    Header: "Number of bytes",
    accessor: "Number_of_bytes",
  },
  {
    Header: "Holding register no.",
    accessor: "holding_register_number",
  },
  {
    Header: "Starting register",
    accessor: "starting_register",
  },
  {
    Header: "Function value",
    accessor: "function_value",
  },
  {
    Header: "Min std",
    accessor: "min_std_value",
  },
  {
    Header: "Max std",
    accessor: "max_std_value",
  },
  {
    Header: "Multiplication factor",
    accessor: "multiplication_factor",
  },
  {
    Header: "Conversion type",
    accessor: "conversion_type",
  },
  {
    Header: "Constant value 4-20",
    accessor: "constant_value_420",
  },
  {
    Header: "Range 4-20",
    accessor: "range_420",
  },
  {
    Header: "To pcb",
    accessor: "to_pcb",
  },
  {
    Header: "Byte reading order",
    accessor: "byte_reading_order",
  },
  {
    Header: "Min vaild value",
    accessor: "min_vaild_value",
  },
  {
    Header: "Max valid value",
    accessor: "max_valid_value",
  },
  {
    Header: "Z data",
    accessor: "z_data",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Parameter status",
    accessor: "parameter_status",
  },
  {
    Header: "Device status",
    accessor: "device_status",
  },
  {
    Header: "Client status",
    accessor: "client_status",
  },
  {
    Header: "To cpcb",
    accessor: "to_cpcb",
  },
  {
    Header: "Two way communication",
    accessor: "two_way_communication",
  },
  {
    Header: "Actions",
    accessor: "name",
    Cell: ({ cell }) => <EditButton cell={cell} />,
  },
];
