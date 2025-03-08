import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const EditButton = ({ cell }) => {
  return (
    <div className="d-flex ">
      <Link
        to={`/updateIndustry/${cell.row.original._id}`}
        title="Edit data settings"
        className="btn btn-sm btn-warning text-white"
      >
        <FontAwesomeIcon icon={faPen} />
      </Link>
      <Link
        to={`/deleteIndustry/${cell.row.original._id}+${cell.row.original.industry_name.split(" ").join("###")}`}
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
    Header: "Id",
    accessor: "_id",
  },
  {
    Header: "Name",
    accessor: "industry_name",
  },
  {
    Header: "Category",
    accessor: "industry_category",
  },
  {
    Header: "Industry",
    accessor: "industry_type",
  },
  {
    Header: "Exc. mail",
    accessor: "exceedance_notification_mail",
  },
  {
    Header: "As",
    accessor: "industry_as",
  },
  {
    Header: "Partner",
    accessor: "industry_partner",
  },
  {
    Header: "Date",
    accessor: "createdAt",
  },
  {
    Header: "Actions",
    accessor: "name",
    Cell: ({ cell }) => <EditButton cell={cell} />,
  },
];
