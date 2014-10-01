var api = require('beer'),
    cheerio = require('cheerio');

var Pkg = function(name) {
    this.url = 'http://registry.npmjs.org/' + name + '/latest';
    this.homepage = 'https://npmjs.org/package/' + name;
}

Pkg.prototype.fetchDetail = function(cb) {
    var self = this;
    api.get(this.url, null, function(err, result) {
        if (!err) {
            if (result.stat == 200) {
                self.details = result.body;
                self.downloads = 3;
            };
            cb();
        } else {
            console.log(err)
        }
    });
}

Pkg.prototype.fetchDownloads = function(cb) {
    var self = this;
    self.downloads = {};
    api.get(this.homepage, null, function(err, result) {
        if (!err) {
            if (result.stat == 200) {
                var $ = cheerio.load(result.body);
                var $downloads = $('table.downloads');
                $downloads.find('tr').each(function(index, item) {
                    var tr = $(this),
                        label = tr.find('td').eq(1).text(),
                        number = tr.find('td').eq(0).text();
                    label = label.substr(label.indexOf('last ') + 5);
                    self.downloads[label] = parseInt(number);
                });
            };
            cb();
        } else {
            console.log(err)
        }
    });
}

module.exports = Pkg;