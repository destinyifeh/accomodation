import nc from "next-connect";
import fs from "fs";
import Property from "../../../models/properties";
import upload from "../../../middlewares/multer";
import { uploadMethod } from "../../../middlewares/UploadMethod";
import { isProduction } from "../../../services/requesters";
import connectDb from "../../../config/db";
connectDb();
const handler = nc()
  .use(upload.array("image"))
  .post(async (req, res) => {
    console.log(req.body, "bodies");
    console.log(req.files, "files body");
    //console.log(req.body.agent, "curr");
    try {
      if (isProduction) {
        const urls = [];
        const files = req.files;
        for (const file of files) {
          const { path } = file;
          const newPath = await uploadMethod(path);
          urls.push(newPath);
          fs.unlinkSync(path);
        }
        const newProperty = await Property.create({
          title: req.body.title,
          detail: req.body.detail,
          address: req.body.address,
          tag: req.body.tag,
          agent: req.body.agent,
          price: req.body.price,
          image: JSON.stringify(urls.map((url) => url.result)),
          image_id: JSON.stringify(urls.map((url) => url.id)),
        });
        console.log(newProperty, "new p");
        res.status(200).send(newProperty);
      } else {
        const images = [];
        const files = req.files;
        for (var i = 0; i < files.length; i++) {
          console.log("Files", files[i]);
          images.push("/uploads/" + files[i].filename);
        }
        console.log(images, "images ");
        const newProperty = await Property.create({
          title: req.body.title,
          detail: req.body.detail,
          address: req.body.address,
          price: req.body.price,
          tag: req.body.tag,
          agent: req.body.agent,
          image: JSON.stringify(images),
        });
        console.log(newProperty, "new property");
        res.status(200).send(newProperty);
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error" + " " + err);
    }
  })

  .get(async (req, res) => {
    try {
      let property = await Property.find({}).sort({ createdAt: -1 });
      console.log(property, "Properties");
      res.status(200).send(property);
    } catch (err) {
      console.log(err.message);
      res.status(500).json(" Server error" + " " + err);
    }
  });

// .post(async (req, res) => {
//     console.log(req.body, "bodies");
//     console.log(req.files, "files body");
//     try {
//  const images = [];
//     const files = req.files;
//     for (var i = 0; i < files.length; i++) {
//       console.log("Files", files[i]);
//       images.push("/uploads/" + files[i].filename);
//     }
//     console.log(images, "images ");
//     const newProperty = await Property.create({
//       title: req.body.title,
//       detail: req.body.detail,
//       address: req.body.address,
//       price: req.body.price,
//       image: JSON.stringify(images),
//     });
//     console.log(newProperty, "new p");
//     res.status(200).send(newProperty);

// } catch (err) {
//   console.log(err.message);
//   res.status(500).send("Server error" + " " + err);
// }
//   })

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
