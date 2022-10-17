import * as yaml from "../../utils/yaml.js"

const stack = [];

const buildScope = (scopeObject) => {
    const {name, scope, resources} = scopeObject;
    stack.push(name)


    if(scope && Object.hasOwn(scope, "name")){
        buildScope(scope);
    }

    if(resources){
        buildResources(resources)
    }

    stack.pop()

}

const buildResources = (resources) => {
    const path = stack.join("/")
    console.log(`GET\t ${path}/${resources}`)
    console.log(`GET\t ${path}/${resources}/new`)
    console.log(`POST\t ${path}/${resources}`)
    console.log(`GET\t ${path}/${resources}/:id`)
    console.log(`PUT\t ${path}/${resources}/:id`)
    console.log(`PATCH\t ${path}/${resources}/:id`)
    console.log(`DELETE\t ${path}/${resources}/:id`)
}

export default (file) => {
    const {endpoints} = yaml.parseFile(file)
    if(Array.isArray(endpoints)){
        const n = endpoints.length;

        for(let i=0; i<n; i++){
            const endpoint = endpoints[i];
            buildScope(endpoint.scope)
        }
    }
    else{
        console.log("descriptions file is not well formed")
    }
}