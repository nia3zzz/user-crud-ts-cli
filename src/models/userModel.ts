import { Schema, Document, Model, model, Types } from "mongoose";

interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
  },

  {
    timestamps: true,
  }
);

const User: Model<IUser> = model("User", userSchema);

export { IUser, User };
