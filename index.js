#! /usr/bin/env node
import {program} from "commander";

import gen from "./commands/gen.js";

program
    .command("gen")
    .description("generates RESTful URL based on the YAML file descriptor")
    .option("-f, --file-descriptor <fileDescriptor>", "descriptor file name in YAML format", "descriptor")
    .action((options, cmd)=>{
        gen(options.fileDescriptor)
    })

program.parse()