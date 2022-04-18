# Node - Express - Sequelize - Ts - API

Template for a basic Node-Express API with TypeScript using a SQL ORM to do a CRUD on DataBase (Sequelize) and testing by Jest.

---
## Requirements

For development, you will only need Node.js and a node global package, Npm, installed in your environement.

## Environment vars

This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|DB_HOST           | DataBase host                            | localhost      |
|DB_PASSWORD       | DataBase password                        | password       |
|DB_USERNAME       | DataBase username                        | username       |
|DB_PORT           | DataBase port                            | port           |
|DB_NAME           | DataBase name                            | name           |
|BCRYPT_SALT       | Salt for encrypt the password            | 10             |
|JWT_SECRET        | Text used to encrypt the password        | any unic text  |
|PORT              | Port for server                          | any unic text  |

# Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Linux

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

# Getting started

    $ git clone https://github.com/Ayneer/NODE-TS-SQL/tree/master
    $ cd NODE-TS-SQL
    $ npm install

## Running the project

    $ npm run start-dev

## Running test for the project

    $ npm run test

## Simple build for production

    $ npm build

## API Document endpoints
    
    swagger Spec Endpoint : http://localhost:[YOUR_LOCAL_PORT]/api-docs 

    swagger-ui  Endpoint : http://localhost:[YOUR_LOCAL_PORT]/docs