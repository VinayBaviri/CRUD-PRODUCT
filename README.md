# Demo Node Project

A Node.js project built on express framework.

[![Project Version](https://img.shields.io/badge/Project%20Version-1.0.0-brightgreen)](https://gl20200905.karkinos.in/edge-node-layer/edge-node/-/tree/master) [![Node Version](https://img.shields.io/badge/Node%20Version-14.17.3-brightgreen)](https://nodejs.org/download/release/v14.17.3/)  [![NPM Version](https://img.shields.io/badge/NPM%20Version-6.14.13-brightgreen)](https://nodejs.org/download/release/v14.17.3/)


# Getting Started
To get started, need to install Node version [14.17.3](https://nodejs.org/download/release/v14.17.3/ "14.17.3").
Look into the "scripts" of the `package.json` file located in the project root directory and choose your environment command to run.

Supported commands :

```sh
 npm start
```

# Note

Make sure you have local mongo-server running with the default port. If cloud mongo url is available, please change it in the `environments/.env.dev` file.


# Available end points

- `GET ` -  `<url>/` - Initial route
- `POST` - `<url>/auth/signup` - Profile signup
- `POST` - `<url>/auth/login` - Profile login
- `POST` - `<url>/user/` - Save User
- `GET`  - `<url>/user/` - Get All ( only for admin )
- `GET ` - `<url>/user/:userId` - Get one User

# postman collection

Added postman collection to quickly test all the above end points. Please find it out in the root dir with name `postman-collection.json`.