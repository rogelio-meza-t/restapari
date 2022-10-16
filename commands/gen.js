import { existsSync } from 'node:fs';
import chalk from "chalk";

export default (fileDescriptor) => {
    const path =`./${fileDescriptor}.yml`

    try{
        if (existsSync(path)) {
            //file exists
        } else {
            console.log(
                chalk.red.bold(`Definitions file ${path} doesn't exists`)
            )
        }
    } catch(err) {
        console.error(err)
    }

}