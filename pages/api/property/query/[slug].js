import nc from "next-connect";
import Property from "../../../../models/properties";
import connectDB from "../../../../config/db";

connectDB();

const handler = nc().get(async (req, res) => {
  try {
    console.log(req.query.slug, " Server query slug");

    let property = await Property.find({ tag: req.query.slug });
    if (property) {
      console.log(property, "query property");
      res.status(200).send(property);
    } else {
      res.send("Property not found");
    }
  } catch (err) {
    console.log(error.message);
    return res.status(500).json({ Error: " " + err.message });
  }
});

export default handler;
