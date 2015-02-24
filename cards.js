
cards = (function () {

    var module = {
        options: {
            spacing: 0.20,  // How much to show between cards, expressed as percentage of textureWidth
            radius: 400,    // This is the radius of the circle under the fan of cards and thus controls the overall curvature of the fan. Small values means higher curvature
            direction: "N"
        },

        // Play is called whenever a card in an hand is clicked.  If the hand is active
        // then playCard is called.
        play: function (card) {
            if (card.parents(".active-hand").length > 0) {
                console.log(card.attr("cid") + " played");
                this.playCard(card);
            }
        },

        // Remove a card from the hand.
        remove: function (card) {
            var hand = card.parent();
            card.remove();

            // New layout if card removed from a "fan".
            if (hand.hasClass("fan"))
                this.fan(hand);
        },

        fan: function (hand) {
            var options = $.extend({}, this.options);
            options = $.extend(options, readOptions(hand, 'fan'));
            fanCards(hand.find("img[cid]"), this, options);
        },

        cardSetTop: function (card, top) {
            card.style.top = top + "px";
        }
    };

    // The default is to remove the card from the hand.
    module.playCard = module.remove;

    // Parse the data-name attribute in HTML.
    function readOptions($elem, name) {
        var i, len, s, options, o = {};

        options = $elem.data(name);
        options = (options || '').replace(/\s/g, '').split(';');
        for (i = 0, len = options.length; i < len; i++) {
            s = options[i].split(':');
            o[s[0]] = Number(s[1]) || s[1];
        }
        return o;
    }

    function fanCards(cards, self, options) {
        var n = cards.length;
        if (n == 0) return;

        var width = cards[0].clientWidth;
        var height = cards[0].clientHeight;
        var box = {};
        var coords = calculateCoords(n, options.radius, width, height, options.direction, options.spacing, box);

        var hand = $(cards[0]).parent();
        hand.width(box.width);
        hand.height(box.height);

        var i = 0;
        coords.forEach(function (coord) {
            var card = cards[i++];
            card.style.left = coord.x + "px";
            card.style.top = coord.y + "px";
            card.onmouseover = function () { self.cardSetTop(card, coord.y - 10) };
            card.onmouseout = function () { self.cardSetTop(card, coord.y) };
            var rotationAngle = Math.round(coord.angle);
            var prefixes = ["Webkit", "Moz", "O", "ms"];
            prefixes.forEach(function (prefix) {
                card.style[prefix + "Transform"] = "rotate(" + rotationAngle + "deg)" + " translateZ(0)";
            });
        });

    }

    function calculateCoords(numCards, arcRadius, cardWidth, cardHeight, direction, cardSpacing, box) {
        // The separation between the cards, in terms of rotation around the circle's origin
        var anglePerCard = Math.radiansToDegrees(Math.atan(((cardWidth * cardSpacing) / arcRadius)));

        var angleOffset = ({ "N": 270, "S": 90, "E": 0, "W": 180 })[direction];

        var startAngle = angleOffset - 0.5 * anglePerCard * (numCards - 1);

        var coords = [];
        var i;
        var minX = 99999;
        var minY = 99999;
        var maxX = -minX;
        var maxY = -minY;
        for (i = 0; i < numCards; i++) {
            var degrees = startAngle + anglePerCard * i;

            var radians = Math.degreesToRadians(degrees);
            var x = cardWidth / 2 + Math.cos(radians) * arcRadius;
            var y = cardHeight / 2 + Math.sin(radians) * arcRadius;

            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);

            coords.push({ x: x, y: y, angle: degrees + 90 });
        }

        var rotatedDimensions = Math.getRotatedDimensions(coords[0].angle, cardWidth, cardHeight);

        var offsetX = 0;
        var offsetY = 0;

        if (direction === "N") {
            offsetX = (minX * -1);
            offsetX += ((rotatedDimensions[0] - cardWidth) / 2);

            offsetY = (minY * -1);
        }
        else if (direction === "S") {
            offsetX = (minX * -1);
            offsetX += ((rotatedDimensions[0] - cardWidth) / 2);

            offsetY = ((minY + (maxY - minY)) * -1);
        }
        else if (direction === "W") {
            offsetY = (minY * -1);
            offsetY += ((rotatedDimensions[1] - cardHeight) / 2);

            offsetX = (minX * -1);
            offsetX += (cardHeight - Math.rotatePointInBox(0, 0, 270, cardWidth, cardHeight)[1]);
        }
        else if (direction === "E") {
            offsetY = (minY * -1);
            offsetY += ((rotatedDimensions[1] - cardHeight) / 2);

            offsetX = (arcRadius) * -1;
            offsetX -= (cardHeight - Math.rotatePointInBox(0, 0, 270, cardWidth, cardHeight)[1]);
            //offsetX -= ?????;    // HELP! Needs to line up with yellow line!
        }

        coords.forEach(function (coord) {
            coord.x += offsetX;
            coord.x = Math.round(coord.x);

            coord.y += offsetY;
            coord.y = Math.round(coord.y);

            coord.angle = Math.round(coord.angle);
        });

        box.width = coords[numCards - 1].x + cardWidth;
        box.height = coords[numCards - 1].y + cardHeight;

        return coords;
    }

    return module;
} ());

// Math Additions
if(!Math.degreesToRadians)
{
    Math.degreesToRadians = function(degrees)
    {
        return degrees * (Math.PI/180);
    };
}

if(!Math.radiansToDegrees)
{
    Math.radiansToDegrees = function(radians)
    {
        return radians * (180/Math.PI);
    };
}

if(!Math.getRotatedDimensions)
{
    Math.getRotatedDimensions = function(angle_in_degrees, width, height)
    {
        var angle = angle_in_degrees * Math.PI / 180,
            sin   = Math.sin(angle),
            cos   = Math.cos(angle);
        var x1 = cos * width,
            y1 = sin * width;
        var x2 = -sin * height,
            y2 = cos * height;
        var x3 = cos * width - sin * height,
            y3 = sin * width + cos * height;
        var minX = Math.min(0, x1, x2, x3),
            maxX = Math.max(0, x1, x2, x3),
            minY = Math.min(0, y1, y2, y3),
            maxY = Math.max(0, y1, y2, y3);

        return [ Math.floor((maxX - minX)), Math.floor((maxY - minY)) ];
    };
}

if(!Math.rotatePointInBox)
{
    Math.rotatePointInBox = function(x, y, angle, width, height)
    {
        angle = Math.degreesToRadians(angle);

        var centerX = width / 2.0;
        var centerY = height / 2.0;
        var dx = x - centerX;
        var dy = y - centerY;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var a =  Math.atan2(dy, dx) + angle;
        var dx2 = Math.cos(a) * dist;
        var dy2 = Math.sin(a) * dist;

        return [ dx2 + centerX, dy2 + centerY ];
    };
}

// When the document is ready, then adjust the cards in a fan.
$(window).load(function() { cards.fan($(".fan")) });

// Call cards.play, when a card is clicked in an active hand.
$(".hand").on("click", "img[cid]", function () { cards.play($(this)) });
