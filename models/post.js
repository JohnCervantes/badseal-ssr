import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const user = new mongoose.Schema({
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true, match: /.+\@.+\..+/ },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: Number, required: false, match: /^$|^\d{10}$/},
  isAdmin: { type: Boolean, required: true },
  registerDate: { type: String, required: true },
  token: { type: String, required: false },
});

user.set("toJSON", {
  transform: (document, returnedObject) => {
    // // change _id to id
    // returnedObject.id = returnedObject._id.toString()
    // delete returnedObject._id
    // delete returnedObject.__v

    // the passwordHash should not be revealed
    delete returnedObject.password;
  },
});

user.plugin(uniqueValidator);

export default mongoose.models.user || mongoose.model("user", user);
