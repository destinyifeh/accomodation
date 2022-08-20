import Property from "../../../models/properties";
import connectDb from "../../../config/Db";
connectDb();
export default async function LatestProperty() {
  try {
    let properties = await Property.find({}).sort({ createdAt: -1 }).limit(1);
    console.log("This is it");
    console.log(properties, "latest properties");
    res.status(200).send(properties);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error" + " " + error);
  }
}
