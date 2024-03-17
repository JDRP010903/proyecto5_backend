const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    username: {
        type: String,
        required: [true, "El username es obligatorio"],
        unique: true,
    },

    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },

    lastname: {
        type: String,
        required: [true, "El apellido es obligatorio"],
    },

    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },

    email: {
        type: String,
        required: [true, "El correo es obligatorio"],
    },

    age: {
        type: String,
        required: [true, "La edad es obligatorio"],
    },

    image: {
        type: String,
        default:
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },

});

UserSchema.methods.toJSON = function () {
    const { __v, _id, ...rest } = this.toObject();
    rest.id = _id;
    return rest;
};

module.exports = model("user", UserSchema, "users");