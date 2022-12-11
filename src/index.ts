#! /usr/bin/env node

import colors from "colors";
import { program } from "commander";

program.option("-c, --city [name]", "Add city name");
program.parse();

const options = program.opts();

if (process.argv.slice(2).length === 0) {
  program.outputHelp(colors.red);
  process.exit();
}

console.log(options.city);
