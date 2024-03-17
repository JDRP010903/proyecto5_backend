const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "La descripción es obligatoria"],
    },
    price: {
        type: Number,
        required: [true, "El precio es obligatorio"],
    },
    image1: {
        type: String,
        required: [true, "La imagen1 es obligatoria"],
    },
    image2: {
        type: String,
        required: [true, "La imagen2 es obligatoria"],
    },
    image3: {
        type: String,
        required: [true, "La imagen3 es obligatoria"],
    },

});

ProductSchema.methods.toJSON = function () {
    const { __v, _id, ...rest } = this.toObject();
    rest.id = _id;
    return rest;
};

module.exports = model("product", ProductSchema, "products");