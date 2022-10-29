# restapari

_A lightweight tool to generate RESTful URLs from resources_.


## Index
1. [Installation](#installation)
2. [Usage](#usage)
	1. [Options](#options)
	2. [Commands](#commands)
3. [Descriptor file](#descriptor-file)
	1. [Samples](#samples)


## Installation<a name="installation"></a>
Clone the repository:

```
git clone https://github.com/rogelio-meza-t/restapari.git
```

Install the dependencies:

```
npm i
```

Install the package globally on your machine:

```
npm i -g
```

##  Usage<a name="usage"></a>
To generate a list of URL based on definitions file do:

Note: restapari must be executed from the same path the description file is located.

```
restapari gen [options] 
```

###  Options<a name="options"></a> 


```
-f, --file-descriptor      set the name of file descriptor
```

restapari use `descriptor.yml` as the default name for the descriptor file. However, the file name can be set using the flags `-f` or `--file-descriptor`.


Examples:

 - basic usage using default descriptor name: 

```
restapari gen
```

 - change the descriptor file name:

```
restapari gen --file-descriptor=definitions
```

Note: The `.yml` extension is not necessary



###  Commands <a name="commands"></a>

```
gen [options]   generates RESTful URL based on the YAML file descriptor
help [command]  display help for command
```

##  Descriptor file <a name="descriptor-file"></a>

Descriptor is a valid YAML file with the API definition, then restapari prints the URLs based on that file.The descriptor file is compose by an array of one or more definitions. There are two main definitions: namespaces and resources. 

Every definition has two required keys:
- **type** indicates if it is a namespace or a resource. The available values are `namespace` and `resource`
- **name** the name of the definition.

Also, there is a required key for resources only:
- **scope** indicates which actions are available in the resource. It is an array with a defined list:
  * **CRUD**: will print all possible routes for CRUD operations
  * **index**: for displaying the list of resource
  * **create**: the action for create a new resource
  * **show**: the action to get a specific resource details
  * **update**: the action for update a resource
  * **destroy**: to delete a specific resource

restapari allows nested definitions on namespaces and resources using the key `nested`. `nested` is an array of definitions and it can have as many as necessary nested definitions. 

**Note**: It's highly recommendable to finish a namespace with a nested `resource`, due to it will represent endpoint actions.  

### Samples <a name="samples"></a>

```
- type: namespace
  name: api
  nested:
  - type: resource
    name: users
    scope:
      - CRUD
- type: resource
  name: messages
  scope:
    - index
    - update
```

It will print 

```
GET	 /api/users
POST	 /api/users
GET	 /api/users/:id
PUT	 /api/users/:id
PATCH	 /api/users/:id
DELETE	 /api/users/:id
GET	 /messages
PUT	 /messages/:id
PATCH	 /messages/:id
```

one more advanced example

```
- type: namespace
  name: api
  nested:
    - type: resource
      name: users
      scope:
        - CRUD
      nested:
        - type: resource
          name: messages
          scope:
            - index
            - update
```

It will print

```
GET	 /api/users/:user_id/messages
PUT	 /api/users/:user_id/messages/:id
PATCH	 /api/users/:user_id/messages/:id
GET	 /api/users
POST	 /api/users
GET	 /api/users/:id
PUT	 /api/users/:id
PATCH	 /api/users/:id
DELETE	 /api/users/:id
```

