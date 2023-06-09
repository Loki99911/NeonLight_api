const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { nanoid } = require("nanoid");

const { HttpError } = require("../helpers");

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});


const { PORDUCT_IMG_PARAMS } = require("../models/product");

const multerConfigCover = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const avatarName = `${req.user._id}_cover`;
    return {
      folder: "svitlo/assets/covers",
      allowed_formats: PORDUCT_IMG_PARAMS.acceptableFileTypes,
      public_id: avatarName,
      transformation: [
        {
          height: PORDUCT_IMG_PARAMS.dimensions.height,

          // width: PORDUCT_IMG_PARAMS.dimensions.width,

          crop: "fill",
        },
      ],
      bytes: PORDUCT_IMG_PARAMS.maxFileSize,
    };
  },
});

const multerConfiRecipe = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const { _id } = req.user;
    const imgID = nanoid(5);
    const recipeName = `${_id}_${imgID}_recipe`;
    return {
      folder: "soyummy/assets/own_recipes_photos",
      allowed_formats: PORDUCT_IMG_PARAMS.acceptableFileTypes,
      public_id: recipeName,
      transformation: [
        {
          height: PORDUCT_IMG_PARAMS.dimensions.height,
          // width: PORDUCT_IMG_PARAMS.dimensions.width,
          crop: "fill",
        },
      ],
    };
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(
      HttpError(
        415,
        "Unsupported image format. Choose file with extention jpeg or png"
      )
    );
  }
}

const uploadCloudCover = multer({
  storage: multerConfigCover,
  fileFilter,
});

const uploadCloudRecipe = multer({
  storage: multerConfiRecipe,
  fileFilter,
});

// const ingredientsParser = (req, res, next) => {
//   const { ingredients } = req.body;
//   try {
//     const parsedData = JSON.parse(ingredients);
//     req.body.ingredients = parsedData;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  uploadCloudCover: uploadCloudCover.single("picture"),
  uploadCloudRecipe: uploadCloudRecipe.single("picture"),
  // ingredientsParser: ingredientsParser,
};
