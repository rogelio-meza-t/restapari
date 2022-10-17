import { readFileSync } from 'node:fs';
import YAML from "yaml"

const parseFile = (path) => {
    const file = readFileSync(path, 'utf8')
    return YAML.parse(file)
}

export {parseFile}