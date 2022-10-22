# RESTapari

_A lightweight tool to generate RESTful URLs from resources_.



## Installation

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

##  Usage

To generate a list of URL based on definitions file do:

```
restapari [options] [command]
```


###  Options 


```
-h, --help      display help for command
```

###  Commands

```
gen [options]   generates RESTful URL based on the YAML file descriptor
help [command]  display help for command
```

##  Descriptor file

Descriptor is a valid YAML file with the API definition, then RESTapari prints the URLs based on that file.The descriptor file is compose by an array of one or more definitions. There are two main definitions: namespaces and resources. 

Every definition has two required keys:
- **type** indicates if it is a namespace or a resource. The available values are `namespace` and `resources`
- **name** the name of the definition.

Also, there is a required key for resources only:
- **scope** indicates which actions are available in the resource. It is an array with a defined list:
  * **CRUD**: will print all possible routes for CRUD operations
  * **index**: for displaying the list of resource
  * **create**: the action for create a new resource
  * **show**: the action to get a specific resource details
  * **update**: the action for update a resource
  * **destroy**: to delete a specific resource

RESTapari allows nested definitions on namespaces and resources using the key `nested`. `nested` is an array of definitions and it can have as many as necessary nested definitions. 

**Note**: It's highly recommendable to finish a namespace with a nested `resources`, due to it will represent endpoint actions.  

### Samples

```
- type: namespace
  name: api
  nested:
  - type: resources
    name: users
    scope:
      - CRUD
- type: resources
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
    - type: resources
      name: users
      scope:
        - CRUD
      nested:
        - type: resources
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

