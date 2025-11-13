import { JSONSchemaType } from "ajv";

interface ICreateUser {
  name: string;
  email: string;
  phoneNumber: string;
}

interface IGetUser {
  limit?: number;
  skip?: number;
}

interface IGetUserById {
  _id: string;
}

interface IUpdateUser {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

interface IDeleteUser {
  _id?: string;
  email?: string;
  phoneNumber?: string;
}

const createUserSchema: JSONSchemaType<ICreateUser> = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 3,
      maxLength: 30,
      nullable: false,
    },

    email: {
      type: "string",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      nullable: false,
    },

    phoneNumber: {
      type: "string",
      minLength: 14,
      maxLength: 14,
      nullable: false,
    },
  },
  required: ["name", "email", "phoneNumber"],
  additionalProperties: false,
};

const getUserSchema: JSONSchemaType<IGetUser> = {
  type: "object",
  properties: {
    limit: {
      type: "integer",
      minimum: 10,
      maximum: 100,
      nullable: true,
      default: 10,
    },

    skip: {
      type: "integer",
      nullable: true,
      default: 0,
    },
    additionalProperties: false,
  },
};

const getUserByIdSchema: JSONSchemaType<IGetUserById> = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      minLength: 24,
      maxLength: 24,
      nullable: false,
    },
  },
  required: ["_id"],
  additionalProperties: false,
};

const updateUserSchema: JSONSchemaType<IUpdateUser> = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      minLength: 24,
      maxLength: 24,
      nullable: false,
    },

    name: {
      type: "string",
      minLength: 3,
      maxLength: 30,
      nullable: false,
    },

    email: {
      type: "string",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      nullable: false,
    },

    phoneNumber: {
      type: "string",
      minLength: 14,
      maxLength: 14,
      nullable: false,
    },
  },
  required: ["_id", "name", "email", "phoneNumber"],
  additionalProperties: false,
};

const deleteUserSchema: JSONSchemaType<IDeleteUser> = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      minLength: 24,
      maxLength: 24,
      nullable: true,
    },

    email: {
      type: "string",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      nullable: true,
    },

    phoneNumber: {
      type: "string",
      minLength: 14,
      maxLength: 14,
      nullable: true,
    },
  },
  oneOf: [
    { required: ["_id"] },
    { required: ["email"] },
    { required: ["phoneNumber"] },
  ],
  additionalProperties: false,
};

export {
  ICreateUser,
  IGetUser,
  IGetUserById,
  IUpdateUser,
  IDeleteUser,
  createUserSchema,
  getUserSchema,
  getUserByIdSchema,
  updateUserSchema,
  deleteUserSchema,
};
