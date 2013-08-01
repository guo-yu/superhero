//                                __                  
//    _______  ______  ___  _____/ /_  ___  _________ 
//   / ___/ / / / __ \/ _ \/ ___/ __ \/ _ \/ ___/ __ \
//  (__  ) /_/ / /_/ /  __/ /  / / / /  __/ /  / /_/ /
// /____/\__,_/ .___/\___/_/  /_/ /_/\___/_/   \____/ 
//           /_/                                      
// superhero is a api wrapper/spider of NPM

exports.user = require('./lib/user').user;
exports.pkg = require('./lib/pkg');

// fetch user info
exports.fetch = function(username, callback) {
    if (username && typeof(username) == 'string') {
        user.fetch(username,function(u){
            callback(u);
        });
    }
}

// vs users info
exports.vs = function(usernames, callback) {

}

// exports.fetch('turing', function(user) {
//     console.log(user.packages);
// });