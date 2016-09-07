
import * as LOCATIONS from '../Map/Locations';
import { WHITE_CARD_DECK, BLACK_CARD_DECK } from '../Cards/MainCardDecks';

const BASE_HP = 4;
const NUMBER_OF_CARDS_TO_HEAL = 3;
const HEAL_AMOUNT = 1;	

export class Player {

	constructor(options) {
		this.hero = options.hero;
		this.isLoyal = options.isLoyal;

		this.hp = BASE_HP;
		this.location = LOCATIONS.CASTLE;
		
		// The player's owned relics
		this.relics = [];

		// The player's cards
		this.hand = [];
	}

	/**
	 * Loops through the hand of the player. If a player has cards with the same value,
	 * he can discard them to heal himself.
	 * 
	 * @return {Boolean} playerWasHealed - Returns a boolean telling whether the player was healed or not.
	 */
	heal() {
		const count = 0;
		const cardsToRemove = [];
		let playerWasHealed = false;

		// Loop through each card in the hand, until it finds 
		// one that has the required number of duplicates to heal the player.
		for (let i = 0; i < this.hand; i++) {
			let _value;
			cardsToRemove.push(i);

			for (let j = 0; j < this.hand; j++) {
				if (j !== i && _value === this.hand[j].value) {
					count++;
					cardsToRemove.push(j);
				}

				if (count === NUMBER_OF_CARDS_TO_HEAL) {
					break;
				}
			}

			// If we don't have the required number of duplicates in the hand,
			// then we reset the counter and the cards to remove. Switch to the second card.
			if (count === NUMBER_OF_CARDS_TO_HEAL) {
				break;
			} else {
				count = 0;
				cardsToRemove = [];
			}
		}

		if (count < NUMBER_OF_CARDS_TO_HEAL) {
			console.warn('Le joueur ne possède pas 3 cartes indentiques dans sa main, il ne peut donc pas effectuer cette action.');
		} else {
			this.modifyHp(HEAL_AMOUNT);
			console.log('Vous avez perdu 3 cartes, mais avez regagné 1 HP.')
			console.log('Voici les cartes que vous avez jetées : ');
			console.table(cardsToRemove);

			cardsToRemove.forEach((card) => {
				this.hand = this.hand.splice(this.hand.indexOf(card), 1);
				WHITE_CARD_DECK.addToGraveyard(card);
			});

			playerWasHealed = true;
		}

		return playerWasHealed;
	}

	/**
	 * Changes the player location.
	 * 
	 * @param {Location} location - Location to which the player wants to move.
	 * @return {Boolean} playerHasMoved - Returns a boolean telling whether the player has moved or not.
	 */
	changeLocation(location) {
		let playerHasMoved = false;
		
		if (this.location === location) {
			console.warn("Un joueur ne peut pas se déplacer à un endroit ou il est déjà.")
		} else {
			this.location = location;
			playerHasMoved = true;
		}

		return playerHasMoved;
	}

	/**
	 * Modifies the HP of a player by a certain amount. This amount can be positive or negative.
	 * If the player's HP falls below 0, and he does not own the San Graal, he dies.
	 * 
	 * @param {Number} modifier - The amount by which the player's HP will be affected.
	 */
	modifyHp(modifier) {
		this.hp += modifier;

		if (this.hp <= 0) {
			console.warn(`Vous êtes au portes de la Mort, si vous possédez le chalice du Saint-Graal, vous pouvez y boire pour revenir à la vie avec ${BASE_HP}HP!`);

			if (this.relics.find(RELICS.GRAAL) !== undefined) {
				console.log("Vous trempez vos lèvres pâles et sèches dans le Saint-Graal, et ce qui devait être votre dernier souffle deviens une inspiration plus puissante que vous n'aillez jamais connue.");
				this.modifyHP(BASE_HP);
			} else {
				console.warn("Malheureusement, vous n'étiez pas porteur du grand Saint-Graal et vous laissez vos yeux se refermer en sachant très bien que vous ne les ouvrirez plus jamais.");
				this.die();
			}
		} 
	}

	/**
	 * Kills the player and removes it from the player list.
	 */
	die() {
		console.warn("Vous êtes maintenant mort. Les morts sont permis en terres de Camelot, mais il sont muets.")
		// TODO - dispatch l'info à Game que le joueur est mort et le retirer de la liste des joueurs.
	}

	/**
	 * Reveals the loyalty of a player.
	 * 
	 * @return {Boolean} this.isLoyal - Loyalty of a player (false === Félon)
	 */
	revealLoyalty() {
		return this.isLoyal;
	}
}