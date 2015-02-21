# cardsJS
Showing playing cards in a browser

I'm using the [Vectorized Playing Cards 1.3](http://code.google.com/p/vectorized-playing-cards/) designed by Chris Aguilar, see the [readme file](images/readme.txt) for the details. The original SVGs are changed to *not* render in an A4 page, but to fit to size.

# <card>

A new HTML tag, `card`, is defined in [](cards.css), that has the form `<card cid='*id*'>`, where *id* the identifier of the card.  The id is the rank and then suit of the card, e.g. 'KS' is the
[King of spades](https://rawgit.com/richardschneider/cardsJS/master/images/KS.svg).

    The king of spades is rendered as <card cid='KS'/>.
    

