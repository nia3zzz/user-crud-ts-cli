import { cliProgram, ajv } from "..";
import {
  ICreateUser,
  createUserSchema,
  IGetUser,
  getUserSchema,
  IGetUserById,
  getUserByIdSchema,
  IUpdateUser,
  updateUserSchema,
  IDeleteUser,
  deleteUserSchema,
} from "../validator/userValidators";
import { IUser, User } from "../models/userModel";
import connectDB from "../db/dbConn";

cliProgram
  .command("create-user")
  .description("Create a new user with required data.")
  .argument("<name>", "Name of the user.")
  .argument("<email>", "Email of the user.")
  .argument("<phoneNumber>", "Phone number of the user.")
  .action(async (name, email, phoneNumber) => {
    const rawData: ICreateUser = { name, email, phoneNumber };

    const validate = ajv.compile(createUserSchema);
    const valid = validate(rawData);
    if (!valid) {
      console.log(validate.errors);
      process.exit(0);
    }

    await connectDB();

    const existingUserByEmail: IUser | null = await User.findOne({
      email: rawData.email,
    });
    if (existingUserByEmail) {
      console.log("User with this email already exists.");
      process.exit(0);
    }

    const existingUserByPhone: IUser | null = await User.findOne({
      phoneNumber: rawData.phoneNumber,
    });
    if (existingUserByPhone) {
      console.log("User with this phone number already exists.");
      process.exit(0);
    }

    const createdUser: IUser = await User.create({
      name: rawData.name,
      email: rawData.email,
      phoneNumber: rawData.phoneNumber,
    });

    console.log("User created successfully, _id:", createdUser._id.toString());
    process.exit(0);
  });

cliProgram
  .command("get-user")
  .description("Get users with optional pagination.")
  .option("--limit <number>", "Number of users to retreieve.", "10")
  .option("--skip <number>", "Number of users to skip.", "0")
  .action(async (options) => {
    const rawData: IGetUser = {
      limit: parseInt(options.limit),
      skip: parseInt(options.skip),
    };
    const validate = ajv.compile(getUserSchema);
    const valid = validate(rawData);
    if (!valid) {
      console.log(validate.errors);
      process.exit(0);
    }

    await connectDB();

    const users: IUser[] = await User.find()
      .limit(options.limit ?? 10)
      .skip(options.skip ?? 0);

    console.log("Retrieved users:", users);
    process.exit(0);
  });

cliProgram
  .command("get-userById")
  .description("Get a user by their id.")
  .argument("<_id>", "ID of the user.")
  .action(async (_id) => {
    const rawData: IGetUserById = { _id };

    const validate = ajv.compile(getUserByIdSchema);
    const valid = validate(rawData);
    if (!valid) {
      console.log(validate.errors);
      process.exit(0);
    }

    await connectDB();

    const user: IUser | null = await User.findById(rawData._id);
    if (!user) {
      console.log("User not found with the provided id.");
      process.exit(0);
    }

    console.log("Retrieved user:", user);
    process.exit(0);
  });

cliProgram
  .command("update-user")
  .description("Update a user's data by their id.")
  .argument("<_id>", "ID of the user.")
  .argument("<name>", "Name of the user.")
  .argument("<email>", "Email of the user.")
  .argument("<phoneNumber>", "Phone number of the user.")
  .action(async (_id, name, email, phoneNumber) => {
    const rawData: IUpdateUser = { _id, name, email, phoneNumber };

    const validate = ajv.compile(updateUserSchema);
    const valid = validate(rawData);
    if (!valid) {
      console.log(validate.errors);
      process.exit(0);
    }

    await connectDB();

    const checkUserExists: IUser | null = await User.findById(rawData._id);
    if (!checkUserExists) {
      console.log("User not found with the provided id.");
      process.exit(0);
    }

    const updatedUser: IUser | null = await User.findByIdAndUpdate(
      rawData._id,
      rawData
    );
    if (!updatedUser) {
      console.log("Failed to update user.");
      process.exit(0);
    }

    console.log(
      "User updated successfully, _id:",
      checkUserExists._id.toString()
    );
    process.exit(0);
  });

cliProgram
  .command("delete-user")
  .description("Delete a user by their id.")
  .argument("<_id>", "ID of the user.")
  .action(async (_id) => {
    const rawData: IDeleteUser = { _id };

    const validate = ajv.compile(deleteUserSchema);
    const valid = validate(rawData);
    if (!valid) {
      console.log(validate.errors);
      process.exit(0);
    }

    await connectDB();

    const user: IUser | null = await User.findById(rawData._id);
    if (!user) {
      console.log("User not found with the provided id.");
      process.exit(0);
    }

    await User.findByIdAndDelete(rawData._id);
    console.log("User deleted successfully, _id:", user._id.toString());
    process.exit(0);
  });
