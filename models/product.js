const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { mongooseHandleError } = require("../helpers");

const phoneValidation = /^[\(]\d{3}[\)]\s\d{3}[\-]\d{4}$/;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for product"],
  },
  email: {
    type: String,
    required: [true, "Set email for product"],
  },
  phone: {
    type: String,
    match: phoneValidation,
    required: [true, "Set phone for product"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

productSchema.post("save", mongooseHandleError);

const schemaJoi = Joi.object({
  name: Joi.string()
    .messages({ "any.required": "missing field - name" })
    .required(),
  email: Joi.string()
    .messages({ "any.required": "missing field - email" })
    .required(),
  phone: Joi.string()
    .messages({ "any.required": "missing field - phone" })
    .pattern(phoneValidation)
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchemaJoi = Joi.object({
  favorite: Joi.boolean()
    .messages({ "any.required": "missing field - favorite" })
    .required(),
});

const Product = model("product", productSchema);

module.exports = { Product, schemaJoi, updateFavoriteSchemaJoi };
