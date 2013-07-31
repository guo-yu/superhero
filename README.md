# superhero ![npm](https://badge.fury.io/js/superhero.png)
=========

superhero is a api wrapper/spider of NPM

## How to install

````
$ npm install o3o
````

## Sample code

````javascript
var superhero = require('superhero');

// fetch user info
superhero.fetch('turing',function(err,result){
    console.log(result.stat)
    console.log(result.user)
    console.log(result.packages)
});

// vs two users
superhero.vs(['turing','jacksontian'],function(err,result){
    console.log(result.winner)
    console.log(result.stats)
});
````

## API

### superhero.fetch(username,callback) 
    - `username` [String] username of NPM, e.g: `turing`
    - `callback` [Object] callback with user info
        - `stat` [String] ok or error
        - `user` [Object]
            - `gravatar` [String]
            - `fullname` [String]
            - `email` [String]
            - `github` [String]
            - `twitter` [String]
            - `homepage` [String]
            - `appnet` [String]
            - `irc` [String]
        - `packages`: [Array] packages belong to the user, only fetch latest version of every package
            - `downloads` [Object]
                - `lastDay`: [Number]
                - `lastWeek`: [Number]
                - `lastMonth`: [Number]
            - `name`
            - `description`
            - `main`
            - ... same as `package.json`

### superhero.vs([username1,username2],callback)
     - `usernames` [Array] usernames of NPM, e.g: `'turing','jacksontian'` add as much as you like.
     - `callback` [Object] 
        - `winner` [String] : show which one is superhero
        - `stats` [Object]
            - `packages` [Object]
                - `username1` [Number]
                - `username1` [Number]
                - ...
            - `downloads` [Object]
                - `username1` [Number]
                - `username1` [Number]
                - ...

## Run unit-test (Mocha)

````
$ git clone https://github.com/turingou/superhero.git
$ cd superhero
$ npm install 
$ npm test
````