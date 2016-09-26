# cardsJS

[![Travis build status](https://travis-ci.org/richardschneider/cardsJS.svg)](https://travis-ci.org/richardschneider/cardsJS)
[![npm version](https://badge.fury.io/js/cardsJS.svg)](https://badge.fury.io/js/cardsJS) 

Showing playing cards that are scalable in a browser is possible with cardJS.  See the [web site](http://richardschneider.github.io/cardsJS) for some examples and the [wiki](https://github.com/richardschneider/cardsJS/wiki) for documentation.

I'm using the [Vectorized Playing Cards 1.3](http://code.google.com/p/vectorized-playing-cards/) designed by Chris Aguilar, see the [readme file](cards/readme.txt) for the details. The original SVGs are changed to *not* render in an A4 page, but to fit to size.

The [change log](https://github.com/richardschneider/cardsJS/releases) is automatically produced with
the help of [semantic-release](https://github.com/semantic-release/semantic-release).

## Getting started

**cardsJS** is available for [Node.js](https://nodejs.org) and most modern browsers.  If you want to know if your currrent browser is compatible, run the [online test suite](https://unpkg.com/table-master-parser/test/index.html).

Install with [npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm)

    > npm install cardsJS --save


### Browser

Include the package from the [unpkg CDN](https://unpkg.com)

````html
<link rel="stylesheet" type="text/css" href="https://unpkg.com/cardsJS/dist/cards.min.css" />

<script src="https://unpkg.com/cardsJS/dist/cards.min.js" type="text/javascript"></script>
````

## Cards

Use the `<img class='card' src='cards/id.svg'>` HTML tag; where *id* is the identifier of the card.  The *id* is composed of the rank and then the suit of the card,
e.g. 'KS' is the [King of spades](https://rawgit.com/richardschneider/cardsJS/master/cards/KS.svg).
The suits are 'S', 'H', 'D' and 'C' for spades, hearts, diamonds and clubs. The rank '10' of a suit *x* is either '10*x*' or 'T*x*'.

    The king of spades is rendered as <img class='card' src='cards/KS.svg'>.

## Hands

Cards can be grouped into a hand.  A hand is a `<div class='hand'>` containing the card(s).
With an active hand, `<div class='hand active-hand'>`, moving the mouse over a `card` will move it veritically/horizontally
to indicate that the card will be selected.

    <div class="hand hhand-compact active-hand">
        <img class='card' src='cards/AS.svg'>
        <img class='card' src='cards/KS.svg'>
        <img class='card' src='cards/QS.svg'>
        <img class='card' src='cards/JS.svg'>
        <img class='card' src='cards/10S.svg'>
        <img class='card' src='cards/9H.svg'>
        <img class='card' src='cards/3H.svg'>
    </div>

A hand can also be declared with the `data-hand` attribute, see [Controlling the hand](https://github.com/richardschneider/cardsJS/wiki/Controlling-the-hand)
for more details. Also see [Controlling the fan](https://github.com/richardschneider/cardsJS/wiki/Controlling-the-fan)

    <div class="hand active-hand"
         data-hand="flow: horizontal; cards: AS,KS,QS,JS,10S,9H,3H">
    </div>

# Hello world

```html
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="cards.css">
    <title>Hello CardsJS</title>
  </head>
  <body>
  <p>
    The king of spades is rendered as <img class='card' src='cards/KS.svg'>.
  </p>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
  <script src="cards.js"></script>
  </body>
</html>
```

Run the [hello world](https://rawgit.com/richardschneider/cardsJS/master/hello.html) sample using [rawgit](http://rawgit.com).

# License
Copyright © 2015 Richard Schneider (makaretu@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


