import nc from "next-connect";
import fs from "fs";
import cloudinary from "cloudinary";
import Property from "../../../models/properties";
import connectDb from "../../../config/db";
import upload from "../../../middlewares/multer";
import { uploadMethod } from "../../../middlewares/UploadMethod";
import { isProduction } from "../../../services/requesters";

connectDb();

const handler = nc()
  .delete(async (req, res) => {
    try {
      console.log(req.query.id, "id");
      let property = await Property.findOne({ _id: req.query.id });
      if (property) {
        property.remove();
        res.status(200).send("Property deleted");
      } else {
        res.send("Property not found");
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ Error: " " + error });
    }
  })

  .get(async (req, res) => {
    try {
      console.log(req.query.id, "id");
      let property = await Property.findOne({ _id: req.query.id });
      if (property) {
        res.status(200).send(property);
      } else {
        res.send("Property not found");
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ Error: " " + error });
    }
  })
  .use(upload.array("image"))
  .put(async (req, res) => {
    try {
      console.log(req.files, "update param");
      console.log(req.body, "update body");
      let property = await Property.findOne({ _id: req.query.id });
      if (isProduction && req.files && req.files.length > 0) {
        await cloudinary.api.delete_resources(property.image_id);
        const urls = [];
        const files = req.files;
        for (const file of files) {
          const { path } = file;
          const newPath = await uploadMethod(path);
          urls.push(newPath);
          fs.unlinkSync(path);
        }
        (property.title = req.body.title),
          (property.tag = req.body.tag),
          (property.detail = req.body.detail),
          (property.price = req.body.price),
          (property.address = req.body.address),
          (property.image = JSON.stringify(urls.map((url) => url.result))),
          (property.image_id = JSON.stringify(urls.map((url) => url.id))),
          property.save();
        console.log("Updated production");
        res.status(200).send(property);
      } else {
        (property.title = req.body.title),
          (property.detail = req.body.detail),
          (property.price = req.body.price),
          (property.address = req.body.address),
          (property.tag = req.body.tag),
          property.save();
        console.log(property, "propertys");
        console.log("Updated only text");
        res.status(200).send(property);
      }

      if (!isProduction && req.files && req.files.length > 0) {
        const images = [];
        const files = req.files;
        for (var i = 0; i < files.length; i++) {
          console.log("Files", files[i]);
          images.push("/uploads/" + files[i].filename);
        }
        console.log(images, "images ");
        (property.title = req.body.title),
          (property.detail = req.body.detail),
          (property.address = req.body.address),
          (property.price = req.body.price),
          (property.tag = req.body.tag),
          (property.image = JSON.stringify(images)),
          console.log(property, "Updated property");
        console.log("Updated local");
        property.save();
        res.status(200).send(property);
      } else {
        (property.title = req.body.title),
          (property.detail = req.body.detail),
          (property.price = req.body.price),
          (property.address = req.body.address),
          (property.tag = req.body.tag),
          property.save();
        console.log(property, "propertys");
        console.log("Updated only text");
        res.status(200).send(property);
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: +" " + error });
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
