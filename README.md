# cardsJS
Showing playing cards in a browser

I'm using the [Vectorized Playing Cards 1.3](http://code.google.com/p/vectorized-playing-cards/) designed by Chris Aguilar, see the [readme file](images/readme.txt) for the details. The original SVGs are changed to *not* render in an A4 page, but to fit to size.

# Cards

A new HTML tag, `card`, is defined in [cards.css](cards.css). It has the form `<card cid='id'>`, where *id* the identifier of the card.  The id is the rank and then suit of the card, e.g. 'KS' is the
[King of spades](https://rawgit.com/richardschneider/cardsJS/master/images/KS.svg).

    The king of spades is rendered as <card cid='KS'/>.
    
# Hands

Cards can be grouped into a hand.  A hand is an `<ol class='hand'>` followed by list items with the `card`. When the mouse is over a `card` in an hand, the card is moved veritically/horizontally to indicate that it will be selected.

    <ol class="hand hhand-compact">
		<li><card cid="AS"></li>
		<li><card cid="KS"></li>
		<li><card cid="QS"></li>
		<li><card cid="JS"></li>
		<li><card cid="10S"></li>
		<li><card cid="9H"></li>
		<li><card cid="3H"></li>
	</ol>
	
The following hand layouts are available:

* Horizontal hand `<ol class="hand hhand">`
* Horizontal hand compact `<ol class="hand hhand-compact">`
* Vertical hand compact `<ol class="hand vhand-compact">`
* Fan hand (pseudo 3D) `<ol class="hand fan">`


    

