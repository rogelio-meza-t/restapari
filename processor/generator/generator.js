import * as yaml from "../../utils/yaml.js"
import definitionsIterator from "./builder.js";
import {validRoot} from "./validator.js";


export default (file) => {
    const definitions= yaml.parseFile(file)

    if(validRoot(definitions)){
        definitionsIterator(definitions)
    }
    else{
        console.log("descriptions file is not well formed")
    }
}