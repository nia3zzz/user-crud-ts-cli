import "dotenv/config";
import { Command } from "commander";
import Ajv from "ajv";

const ajv = new Ajv();
const cliProgram = new Command();
import "./commands/userCommands";

cliProgram
.name("user-crud-ts-cli")
.description("A CLI for managing users with CRUD operations.")
.version("1.0.0");

cliProgram.parse(process.argv);

export { cliProgram, ajv };
