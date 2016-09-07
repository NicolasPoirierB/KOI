
/** Card deck */
export class CardDeck {

	/**
	 * Creates a card deck from an array of cards.
	 * @param {Array} cardList - An array of cards.
	 */
	constructor(cardList) {
		this.cards = cardList;
		this.graveyard = [];
	}

	/**
	 * Rebuilds the deck by taking the cards in the graveyard and shuffling two times.
	 */
	_rebuild() {
		this.cards = this.graveyard;
		this.graveyard = [];
		this.suffle(2);
	}

	/**
	 * Shuffles the cards in the deck n times.
	 * @param {Number} n Number of times the cards will be shuffled.
	 */
	shuffle(n) {
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < this.cards.length; j++) {
				const k = Math.floor(Math.random() * this.cards.length);
				const temp = this.cards[j];
				this.cards[j] = this.cards[k];
				this.cards[k] = temp;
			}
		}
	}

	/**
	 * Draws a number of cards from the deck.
	 * @param {Number} n - The number of cards to draw.
	 * @return {Array} cards - An array of cards.
	 */
	draw(n) {
		const cards = [];

		for (var i = 0; i < n; i++) {
			if (this.cards.length === 0) {
				this._rebuild();
			}

			cards.push(this.cards.shift());
		}

		return cards;
	}
	
	/**
	 * Adds a card to the graveyard of this deck.
	 * 
	 * @param {Card} card - The card to be put in the graveyard for this deck.
	 * @return {CardDeck} this - Returns the CardDeck.
	 */
	addToGraveyard(card) {
		this.graveyard.push(card);
		return this;
	}
}
