import { existsSync } from 'node:fs';
import chalk from "chalk";

import generator from "../processor/generator/index.js";

export default (fileDescriptor) => {
    const path =`./${fileDescriptor}.yml`

    try{
        if (existsSync(path)) {
            generator(path)
        } else {
            console.log(
                chalk.red.bold(`Definitions file ${path} doesn't exists`)
            )
        }
    } catch(err) {
        console.error(err)
    }

}