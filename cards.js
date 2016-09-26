/*jslint vars: true, plusplus: true, -W003 */
/*globals window, document, define, exports, module, require */

var cardsScript = document.currentScript;

(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (root is window)
        root.cards = factory(root.jQuery);
    }
}(this, function ($) {
    'use strict';

    var module = {
        options: {
            spacing: 0.20,  // How much to show between cards, expressed as percentage of textureWidth
            radius: 400,    // This is the radius of the circle under the fan of cards and thus controls the overall curvature of the fan. Small values means higher curvature
            flow: 'horizontal', // The layout direction (horizontal or vertical)
            fanDirection: "N",
            imagesUrl: 'cards/' // The base URL for the card images, should end with a '/'.
        },

        // Gets the ID of the card, e.g. "KS" for the king of spades.
        cid: function (card) {
            var s = card.attr('src');
            return s.substring(s.length - 6, s.length - 4);
        },

        // Play is called whenever a card in an hand is clicked.  If the hand is active
        // then playCard is called.
        play: function (card) {
            if (card.parents(".active-hand").length > 0) {
                this.playCard(card);
            }
        },

        // Remove a card from the hand.
        remove: function (card) {
            var hand = card.parent();
            card.remove();

            // New layout if card removed from a "fan".
            if (hand.hasClass("fan")) {
                this.fan(hand);
            }
        },

        fan: function (hand, cfg) {
            var options = $.extend({}, this.options),
                cards;

            options = $.extend(options, readOptions(hand, 'fan'));
            if (cfg) {
                options = $.extend(options, cfg);
            }
            hand.data("fan", 'radius: ' + options.radius + '; spacing: ' + options.spacing);
            addCardImages(hand, options.cards);

            cards = hand.find("img.card");
            if (cards.length === 0) {
                return;
            }
            if (options.width) {
                cards.width(options.width);
            }
            fanCards(cards, this, options);
        },

        hand: function ($hand, cfg) {
            var options = $.extend({}, this.options),
                cards,
                width,
                height;
            options = $.extend(options, readOptions($hand, 'hand'));
            if (cfg) {
                options = $.extend(options, cfg);
            }
            $hand.data("hand", 'flow: ' + options.direction + ';');
            $hand.removeClass('hhand fan hhand vhand vhand-compact hhand-compact');
            if (options.flow === 'vertical' && options.spacing >= 1.0) {
                $hand.addClass('vhand');
            } else if (options.flow === 'horizontal' && options.spacing >= 1.0) {
                $hand.addClass('hhand');
            } else if (options.flow === 'vertical') {
                $hand.addClass('vhand-compact');
            } else {
                $hand.addClass('hhand-compact');
            }

            addCardImages($hand, options.cards);

            cards = $hand.find('img.card');
            if (cards.length === 0) {
                return;
            }
            if (options.width) {
                cards.width(options.width);
            }
            width = options.width || cards[0].clientWidth || 70; // hack: for a hidden hand
            height = cards[0].clientHeight || Math.floor(width * 1.4); // hack: for a hidden hand
            if (options.flow === 'vertical' && options.spacing < 1.0) {
                cards.slice(1).css('margin-top', -height * (1.0 - options.spacing));
                cards.slice(1).css('margin-left', 0);
            } else if (options.flow === 'horizontal' && options.spacing < 1.0) {
                cards.slice(1).css('margin-left', -width * (1.0 - options.spacing));
                cards.slice(1).css('margin-top', 0);
            }
        },

        cardSetTop: function (card, top) {
            card.style.top = top + "px";
        },

        cardNames: function (cards) {
            var i,
                name,
                names = [];
            if (typeof cards === 'string') {
                cards = cards.split(' ');
            }
            // Normalise the card names.
            for (i = 0; i < cards.length; ++i) {
                if (cards[i]) {
                    name = cards[i].toString().toUpperCase();
                    names.push(name);
                }
            }

            return names;
        }
    };

    // The default is to remove the card from the hand.
    module.playCard = module.remove;

    function addCardImages(hand, cards) {
        var i,
            src;
        if (!cards) {
            return;
        }
        cards = module.cardNames(cards);
        hand.empty();
        for (i = 0; i < cards.length; ++i) {
            src = "src='" + module.options.imagesUrl + cards[i] + '.svg' + "'";
            hand.append("<img class='card' " + src + ">");
        }
    }

    // Parse the data-name attribute in HTML.
    function readOptions($elem, name) {
        var v, i, len, s, options, o = {};

        options = $elem.data(name);
        options = (options || '').replace(/\s/g, '').split(';');
        for (i = 0, len = options.length; i < len; i++) {
            s = options[i].split(':');
            v = s[1];
            if (v && v.indexOf(',') >= 0) {
                o[s[0]] = v.split(',');
            } else {
                o[s[0]] = Number(v) || v;
            }
        }
        return o;
    }

    function fanCards(cards, self, options) {
        var n = cards.length;
        if (n === 0) {
            return;
        }

        var width = options.width || cards[0].clientWidth || 90; // hack: for a hidden hand
        var height = cards[0].clientHeight || Math.floor(width * 1.4); // hack: for a hidden hand
        var box = {};
        var coords = calculateCoords(n, options.radius, width, height, options.fanDirection, options.spacing, box);

        var hand = $(cards[0]).parent();
        hand.width(box.width);
        hand.height(box.height);

        var i = 0;
        coords.forEach(function (coord) {
            var card = cards[i++];
            card.style.left = coord.x + "px";
            card.style.top = coord.y + "px";
            card.onmouseover = function () {
                self.cardSetTop(card, coord.y - 10);
            };
            card.onmouseout = function () {
                self.cardSetTop(card, coord.y);
            };
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
        } else if (direction === "S") {
            offsetX = (minX * -1);
            offsetX += ((rotatedDimensions[0] - cardWidth) / 2);

            offsetY = ((minY + (maxY - minY)) * -1);
        } else if (direction === "W") {
            offsetY = (minY * -1);
            offsetY += ((rotatedDimensions[1] - cardHeight) / 2);

            offsetX = (minX * -1);
            offsetX += (cardHeight - Math.rotatePointInBox(0, 0, 270, cardWidth, cardHeight)[1]);
        } else if (direction === "E") {
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

    // If loaded directly from a script, the do the jquery shuffle.
    $(window).on('load', function () {
        // Adjust the cards in a fan, except ones using KO.
        $(".fan:not([data-bind])").each(function () {
            module.fan($(this));
        });

        // Process any data-hand attributes
        $(".hand[data-hand]").each(function () {
            module.hand($(this));
        });

        // Call cards.play, when a card is clicked in an active hand.
        $(".hand").on("click", "img.card", function () {
            module.play($(this));
        });
    });

    // Default imagesUrl to a subfolder of the script source.
    if (cardsScript && cardsScript.src) {
        var path = cardsScript.src.substring(0, cardsScript.src.lastIndexOf('/')) + '/cards/';
        module.options.imagesUrl = path;
    }

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return module;
}));

// Math Additions
if (!Math.degreesToRadians) {
    Math.degreesToRadians = function (degrees) {
        return degrees * (Math.PI / 180);
    };
}

if (!Math.radiansToDegrees) {
    Math.radiansToDegrees = function (radians) {
        return radians * (180 / Math.PI);
    };
}

if (!Math.getRotatedDimensions) {
    Math.getRotatedDimensions = function (angle_in_degrees, width, height) {
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

if (!Math.rotatePointInBox) {
    Math.rotatePointInBox = function (x, y, angle, width, height) {
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
