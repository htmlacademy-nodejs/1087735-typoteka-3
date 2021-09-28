import { help } from "./cli/help.js";

export const DEFAULT_COMMAND = help.name;
export const USER_ARGV_INDEX = 2;
export const ExitCode = {
  success: 0,
  error: 1,
};
export const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
};
