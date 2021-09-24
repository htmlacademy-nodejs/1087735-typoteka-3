"use strict";

import { Cli } from "./cli/index.js";
import { DEFAULT_COMMAND, USER_ARGV_INDEX, ExitCode } from "./constants.js";

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

if (!userCommand || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

Cli[userCommand].run(userArguments.slice(1));
