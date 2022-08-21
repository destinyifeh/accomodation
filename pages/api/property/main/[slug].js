import nc from "next-connect";
import Property from "../../../../models/properties";
import connectDB from "../../../../config/db";

connectDB();

const handler = nc().get(async (req, res) => {
  try {
    console.log(req.query.slug, "slug");

    let property = await Property.findOne({ slug: req.query.slug });
    if (property) {
      property.views++;
      property.save();
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
