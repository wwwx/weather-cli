#! /usr/bin/env node
// const { program } = require("commander");
import { program } from "commander";

program.option("-c, --city [name]", "Add city name");
program.parse();

const options = program.opts();

if (process.argv.slice(2).length === 0) {
  program.outputHelp();
  process.exit();
}

// console.log(options.city);
