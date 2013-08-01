var cheerio = require('cheerio'),
    api = require('beer'),
    Pkg = require('./pkg'),
    async = require('async');

var User = function(username, html) {
    if (html && typeof(html) == 'string') {
        var $ = cheerio.load(html),
            profile = $('#profile');
        this.packages = [];
        this.detail = {};
        this.username = profile.find('h1').text().indexOf('Not Found') == -1 ? username : '404';
        this.html = html;
    }
}

User.prototype.fetchMeta = function() {
    var self = this;
    var $ = cheerio.load(self.html),
        profile = $('#profile'),
        meta = profile.find('.metadata tr'),
        avatar = profile.find('img.avatar-large').attr('src');
    self.detail['gravatar'] = avatar.substr(0,avatar.lastIndexOf('?s='));
    meta.each(function(index, item) {
        self.detail[$(this).find('th').text()] = $(this).find('td').text();
    });
};

User.prototype.fetchPkgs = function(callback) {
    var self = this;
    var fetchDetail = function(item, cb) {
        var pkg = new Pkg(item.name);
        async.waterfall([
            function(callback) {
                pkg.fetchDetail(function() {
                    item['details'] = pkg.details;
                    callback(null);
                });
            },
            function(callback) {
                pkg.fetchDownloads(function() {
                    item['downloads'] = pkg.downloads;
                    cb();
                });
            }
        ]);
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
                async.each(self.packages, fetchDetail, function(err) {
                    if (!err) {
                        callback(self);
                    }
                })
            }
        }
    });
}

exports.user = User;

exports.fetch = function(username,callback) {
    api.get('https://npmjs.org/~' + username, null, function(err, result) {
        if (!err) {
            if (result.body) {
                var user = new User(username, result.body);
                if (user.username != '404') {
                    user.fetchMeta();
                    user.fetchPkgs(function(user) {
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