//                                __                  
//    _______  ______  ___  _____/ /_  ___  _________ 
//   / ___/ / / / __ \/ _ \/ ___/ __ \/ _ \/ ___/ __ \
//  (__  ) /_/ / /_/ /  __/ /  / / / /  __/ /  / /_/ /
// /____/\__,_/ .___/\___/_/  /_/ /_/\___/_/   \____/ 
//           /_/                                      
// superhero is a api wrapper/spider of NPM

var api = require('beer'),
    cheerio = require('cheerio'),
    User = require('./lib/user'),
    Pkg = require('./lib/pkg');

exports.fetch = function(username, callback) {
    if (username && typeof(username) == 'string') {
        api.get('https://npmjs.org/~' + username, null, function(err, result) {
            if (!err) {
                if (result.body) {
                    var user = new User(username,result.body);
                    if (user.username != '404') {
                        user.meta();
                        user.pkgs(function(user){
                            callback(user);
                        });
                    } else {
                        callback(user);                        
                    }
                }
            } else {
                console.log(err);
            }
        });
    }
}

exports.vs = function(usernames, callback) {

}

// exports.fetch('turing', function(user) {
//     console.log(user);
// });