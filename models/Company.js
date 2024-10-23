import { Schema, model, models } from "mongoose";

const CompanySchema = new Schema(
  {
    name: String,
    manager: String,
    contact: String,
    address: String,
    description: String,
    media: String,
    price: {},
    active: Boolean,
  },
  { timestamps: true }
);

const Company = models.Company || model("Company", CompanySchema);
export default Company;
