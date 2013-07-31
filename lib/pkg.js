var api = require('beer');

var Pkg = function(name) {
    this.name = 'http://registry.npmjs.org/' + name + '/latest';
} 

Pkg.prototype.detail = function(cb) {
    var self = this;
    api.get(this.name,null,function(err,details){
        if (!err) {
            self.details = details;
            cb();
        } else {
            console.log(err)
        }
    });
}

module.exports = Pkg;