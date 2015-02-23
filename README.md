# cardsJS
Showing playing cards that are scalable in a browser.

I'm using the [Vectorized Playing Cards 1.3](http://code.google.com/p/vectorized-playing-cards/) designed by Chris Aguilar, see the [readme file](images/readme.txt) for the details. The original SVGs are changed to *not* render in an A4 page, but to fit to size.

## Cards

Use an `<img cid='id'>` HTML tag; where *id* is the identifier of the card.  The id is composed of the rank and then thesuit of the card,
e.g. 'KS' is the [King of spades](https://rawgit.com/richardschneider/cardsJS/master/images/KS.svg). 
The suits are 'S', 'H', 'D' and 'C' for spades, hearts, diamonds and clubs. The rank '10' of a suit is either '10*x*' or 'T*x*'.

    The king of spades is rendered as <img cid='KS'/>.
    
## Hands

Cards can be grouped into a hand.  A hand is an `<ol class='hand'>` followed by list items with the `card` tag. When the mouse is over a `card` in an hand, the card is moved veritically/horizontally to indicate that it will be selected.

    <ol class="hand hhand-compact">
		<li><img cid="AS"></li>
		<li><img cid="KS"></li>
		<li><img cid="QS"></li>
		<li><img cid="JS"></li>
		<li><img cid="10S"></li>
		<li><img cid="9H"></li>
		<li><img cid="3H"></li>
	</ol>
	
# Hello world

```html
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="cards.css">
    <title>Hello CardsJS</title>
  </head>
  <body>
  <p>
    The king of spades is rendered as <img cid='KS'/>.
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
    

