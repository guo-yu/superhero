var cheerio = require('cheerio'),
    api = require('beer'),
    Pkg = require('./pkg'),
    async = require('async');

var User = function(username, html) {
    var $ = cheerio.load(html),
        profile = $('#profile');
    this.packages = [];
    this.detail = {};
    this.username = profile.find('h1').text().indexOf('Not Found') == -1 ? username : '404';
    this.html = html;
}

User.prototype.meta = function() {
    var self = this;
    var $ = cheerio.load(self.html),
        profile = $('#profile'),
        meta = profile.find('.metadata tr');
    self.detail['gravatar'] = profile.find('img.avatar-large').attr('src');
    meta.each(function(index, item) {
        self.detail[$(this).find('th').text()] = $(this).find('td').text();
    });
};

User.prototype.pkgs = function(callback) {
    var self = this;
    var fetchDetail = function(item,cb) {
        var pkg = new Pkg(item.name);
        pkg.detail(function(){
            item['details'] = pkg.details;
            cb();
        });
    };
    api.get('https://npmjs.org/browse/author/' + self.username, null, function(err, result) {
        if (!err) {
            if (result.body) {
                var $ = cheerio.load(result.body),
                    pkgs = $('#package');
                pkgs.find('div.row').each(function(index, item) {
                    var url = $(this).find('a').attr('href');
                    self.packages.push({
                        name: url.substr(url.lastIndexOf('/') + 1)
                    });
                });
                // fetch packages details
                async.each(self.packages,fetchDetail,function(err){
                    if (!err) {
                        callback(self);
                    }
                })
            }
        }
    });
}

module.exports = User;