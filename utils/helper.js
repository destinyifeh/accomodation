import { toast } from "react-toastify";
export const today = () => {
  var date = new Date();
  return date;
};

export const currentTime = () => {
  return new Date().getTime();
};

export const currentOne = (date) => {
  return new Date(date).getTime();
};

export const loggedinTime = () => {
  return 600000 + new Date().getTime();
};

//upload image functions//

export const maxSelectFile = (e) => {
  let files = e.target.files; // create file object
  if (files.length > 3) {
    const msg = "Only 3 images can be uploaded at a time";
    toast.error("Only 3 images can be uploaded at a time");
    e.target.value = null; // discard selected file
    console.log(msg);
    return false;
  }
  return true;
};

export const checkMimeType = (e) => {
  //getting file object
  let files = e.target.files;
  //define message container
  let err = "";
  // list allow mime type
  const types = ["image/png", "image/jpg", "image/jpeg"];
  // loop access array
  for (var i = 0; i < files.length; i++) {
    // compare file type find doesn't matach
    //eslint-disable-next-line
    if (types.every((type) => files[i].type !== type)) {
      // create error message and assign to container
      err += files[i].type + " is not a supported format\n";
      toast.error(files[i].type + " is not a supported format\n");
    }
  }

  if (err !== "") {
    // if message not same old that mean has error
    e.target.value = null; // discard selected file
    console.log(err);
    return false;
  }
  return true;
};

export const checkFileSize = (e) => {
  let files = e.target.files;
  let size = 1000000; //1mb
  let err = "";
  for (var i = 0; i < files.length; i++) {
    if (files[i].size > size) {
      err += files[i].type + "is too large, please pick a smaller file\n";
      toast.error(files[i].type + "is too large, please pick a smaller file\n");
    }
  }
  if (err !== "") {
    e.target.value = null;
    console.log(err);
    return false;
  }

  return true;
};
