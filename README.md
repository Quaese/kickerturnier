# Random Team Generator

This tool can be used to create random teams for events like tournaments. At the moment exist 10 teamnames and eight participants.

## Posibilities/Features

* see previously generated teams in *Archive* (from localStorage)
* if an user is logged in she/he will be able to generate random teams inside the section *Teams*
* login/logout
* user roles (Admin, User)

## Used technologies

### UI

* Angular 7 (with Angluar CLI 7.0.3)
* ngrx/store (Redux)
* LESS

### Server

* Node.js & expressjs for server implementation
* MongoDB
* mongoose
* JWT (JSON Web Token)

## Config (Server/MongoDB)

Use `backend/config/config.json` to configure database credentials and the jwt (json web token).

```
{
    "secret": "",

    "mongodb": {
        "mongoConnection": "mongodb://localhost:27017/",
        "host": "localhost",
        "port": "27017",
        "db": "userlogin",
        "user": "",
        "pw": ""
    }
}
```

## Build with special base href

`ng build --base-href /folder-name/ --prod`

More information about `ng build`: https://github.com/angular/angular-cli/wiki/build

## Unit tests

Tests follow later
