
const namespaceStack = []
const resourcesStack = []

const definitionsIterator = (definitions) => {
    const n = definitions.length;

    for(let i=0; i<n; i++){
        const {type} = definitions[i];
        definitionFactory[type](definitions[i])
    }
}

const definitionFactory = {
    namespace: (definition) => {
        namespaceBuilder(definition)
    },
    resources: (definition) => {
        resourcesBuilder(definition)
    }
}

const namespaceBuilder = (definition) => {
    const {name, nested} = definition
    namespaceStack.push(name)

    // namespace context always is an array
    definitionsIterator(nested)

    namespaceStack.pop()
}

const resourcesBuilder = (definition) => {
    const {name, scope, nested} = definition
    resourcesStack.push(name)

    if(nested && Array.isArray(nested)){
        definitionsIterator(nested)
    }
    if(scope){
        resourcesPrinter(name)
    }

    resourcesStack.pop()
}

const resourcesPrinter = (name) => {
    const path = namespaceStack.join("/")
    const parentResources = parentResourceBuilder()

    console.log(`GET\t /${path}${parentResources}${name}`)
    console.log(`GET\t /${path}${parentResources}${name}/new`)
    console.log(`POST\t /${path}${parentResources}${name}`)
    console.log(`GET\t /${path}${parentResources}${name}/:id`)
    console.log(`PUT\t /${path}${parentResources}${name}/:id`)
    console.log(`PATCH\t /${path}${parentResources}${name}/:id`)
    console.log(`DELETE\t /${path}${parentResources}${name}/:id`)
}

const parentResourceBuilder = () => {
    const n = resourcesStack.length - 1
    const resources = resourcesStack.slice(0,-1)

    return resources.map(r => `/${r}/:${r}_id/`).join("/")
}

export default definitionsIterator