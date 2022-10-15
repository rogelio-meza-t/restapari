#! /usr/bin/env node
import {program} from "commander";

import gen from "./commands/gen.js";

program
    .command("gen")
    .description("generates RESTful URL based on the YAML file descriptor")
    .action(gen)

program.parse()