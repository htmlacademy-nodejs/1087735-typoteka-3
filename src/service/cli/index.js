"use strict";

import { help } from "./help.js";
import { version } from "./version.js";
import { generate } from "./generate.js";
import { server } from "./server.js";

export const Cli = {
  [help.name]: help,
  [version.name]: version,
  [generate.name]: generate,
  [server.name]: server,
};
