import Company from "@/models/Company";
import dbConnect from "@/services/dbConnect";

export default async function companyHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newCompany = await Company.create(body);
        return res.status(200).json(newCompany);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "GET":
      try {
        let company = null;
        if (req.query.id) {
          company = await Company.findById(req.query.id);
        } else {
          company = await Company.find();
        }
        return res.status(200).json(company);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updateCompany = await Company.findByIdAndUpdate(
          body.id || body["_id"],
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updateCompany) {
          return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json(updateCompany);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "DELETE":
      try {
        const deletedCompany = await Company.findByIdAndDelete(req.query.id);
        if (!deletedCompany) {
          return res.status(404).json({ msg: "Company not found" });
        }
        return res.status(200).json({ msg: "Company deleted successfully" });
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(405).json({ msg: "Method Not Allowed" });
  }
}
