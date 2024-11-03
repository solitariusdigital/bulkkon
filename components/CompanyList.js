import { useRouter } from "next/router";
import classes from "./CompanyList.module.scss";
import Image from "next/legacy/image";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Tooltip from "@mui/material/Tooltip";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  getSingleCompanyApi,
  updateCompanyApi,
  deleteCompanyApi,
} from "@/services/api";

export default function CompanyList({ companyData }) {
  const router = useRouter();

  const updateCompany = async (id, type) => {
    let confirmationMessage = "مطمئنی؟";
    let confirm = window.confirm(confirmationMessage);
    if (confirm) {
      let companyData = await getSingleCompanyApi(id);
      switch (type) {
        case "show":
          companyData.active = true;
          break;
        case "hide":
          companyData.active = false;
          break;
      }
      await updateCompanyApi(companyData);
      router.replace(router.asPath);
    }
  };

  const deleteCompany = async (index) => {
    let confirmationMessage = "حذف مطمئنی؟";
    let confirm = window.confirm(confirmationMessage);
    if (confirm) {
      await deleteCompanyApi(companyData[index]["_id"]);
      router.replace(router.asPath);
    }
  };

  return (
    <div className={classes.container}>
      {companyData.map((comp, index) => (
        <div key={index} className={classes.card}>
          <div className={classes.control}>
            <Tooltip title="Delete">
              <DeleteOutlineIcon
                className="icon"
                sx={{ color: "#d40d12" }}
                onClick={() => deleteCompany(index)}
              />
            </Tooltip>
            {comp.active ? (
              <Tooltip title="Hide">
                <VerifiedUserIcon
                  className="icon"
                  sx={{ color: "#57a361" }}
                  onClick={() => updateCompany(comp["_id"], "hide")}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Show">
                <VisibilityOffIcon
                  className="icon"
                  sx={{ color: "#d40d12" }}
                  onClick={() => updateCompany(comp["_id"], "show")}
                />
              </Tooltip>
            )}
          </div>
          <div className={classes.row}>
            <div className={classes.logo}>
              <Image
                src={comp.media}
                layout="fill"
                objectFit="contain"
                alt="logo"
                as="image"
              />
            </div>
            <h3>{comp.name}</h3>
          </div>
          <div className={classes.row}>
            <p
              className={classes.phone}
              onClick={() =>
                window.open(`tel:+98${comp.contact.substring(1)}`, "_self")
              }
            >
              {comp.contact}
            </p>
            <h4>مدیر فروش: {comp.manager}</h4>
          </div>
          <div className={classes.details}>
            <p className={classes.address}>آدرس: {comp.address}</p>
            <p>{comp.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
