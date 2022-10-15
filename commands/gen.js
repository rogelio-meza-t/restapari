import { existsSync } from 'node:fs';

import chalk from "chalk";

export default () => {
    // TODO: 20221015 get filename from arguments
    //       if not present, set default name

    const path = "./definitions.yml"

    try{
        if (existsSync(path)) {
            //file exists
        } else {
            console.log(
                chalk.red.bold("Definitions file doesn't exists")
            )
        }
    } catch(err) {
        console.error(err)
    }

}