#! /usr/bin/env node
const { program } = require('commander')

const gen = require('./commands/gen')

program
    .command("gen")
    .description("generates RESTful URL based on the YAML file descriptor")
    .action(gen)

program.parse()