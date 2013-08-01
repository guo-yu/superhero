// draw cards

var Canvas = require('canvas'),
    canvas = new Canvas(300, 60),
    ctx = canvas.getContext('2d'),
    Image = Canvas.Image,
    fs = require('fs'),
    request = require('request');

var Card = function(user) {
    this.user = user;
    this.bgs = {};
}

Card.prototype.draw = function(cb) {
    var self = this;

    var Logo = new Image;
        Logo.src = self.bgs.logo;

    var Avatar = new Image;
        Avatar.src = self.bgs.avatar;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 450, 60);
    ctx.drawImage(logo, 5, 5, logo.width, logo.height);
    ctx.font = '18px Impact';
    ctx.fillStyle = '#cc3638';
    ctx.fillText("Superhero", 58, 28);
    ctx.font = '18px Helvetica';
    ctx.fillStyle = '#000';
    ctx.fillText("@turing", 140, 28);
    ctx.font = '12px Helvetica';
    ctx.fillStyle = '#999';
    ctx.fillText('Packages: ' + self.user.packages.length, 58, 48)
    ctx.fillText('Packages2: ' + self.user.packages.length, 58, 48);

    fs.writeFile('./demo.png', canvas.toBuffer(), function(err) {
        if (!err) {
            cb(null)
        } else {
            cb(err)
        }
    });
}

Card.prototype.load = function(cb) {

    var self = this;
    async.waterfall([
        function(callback) {
        fs.readFile('./thumb/logo_44x50.jpg', function(err, bg) {
                if (!err) {
                    callback(null, bg)
                }
            }
        },
        function(bg, callback) {
            if (user.detail.gravatar) {
                request.get({
                    url: self.detail.gravatar,
                    encoding: null
                }, function(err, res, result) {
                    callback(null, bg, result)
                })
            }
        },
        function(logo, avatar, callback) {
            console.log('ok')
            self.bgs['logo'] = logo;
            self.bgs['avatar'] = avatar;
        }
        ]);
}

exports.create = function(user) {
    var card = new Card(user);
    card.load(function(){
        card.draw(function(err){
            console.log('done!!!')
        })
    })
}