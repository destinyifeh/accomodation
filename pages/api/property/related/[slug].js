import nc from "next-connect";
import Property from "../../../../models/properties";
import connectDb from "../../../../config/db";

connectDb();

const handler = nc().get(async (req, res) => {
  try {
    let property = await Property.findOne({ slug: req.query.slug });
    if (property) {
      const query = new RegExp(property.tag, "i");
      Property.find({
        slug: { $nin: property.slug },
        $or: [{ tag: query }],
      }).sort({ createdAt: -1 });

      res.status(200).send(property);
    } else {
      res.send("Related property not found");
    }
  } catch (err) {
    console.log(error.message);
    return res.status(500).json({ Error: " " + err.message });
  }
});

export default handler;
