import $ from 'jquery';
import * as EVIL_ACTIONS from './Actions/Evil';
import * as GOOD_ACTIONS from './Actions/Good';
import * as LOCATIONS from '../Map/Locations';
import { BLACK_CARD_DECK } from '../Cards/MainCardDecks';

const MAX_GOOD_ACTIONS = 2;
const HP_PENALTY = -1;
const MAX_CARDS_IN_HAND = 12;

export class Turn {

	constructor(player) {
		this.player = player;
		
		this.evilPlayed = false;
		this.goodPlayed = true;

		this.nbGoodActions = 0;
		this.lastGoodAction = undefined;
		this.hasUsedHeroPower = false;

		// The player has been warned that a second good side action will cost him 1HP
		this.hasBeenWarned = false;

		this.buttons = $('[data-action-button]');
		this.activateButtons();
	}

	canDoAction(isEvil) {
		if (this.nbGoodActions === MAX_GOOD_ACTIONS) {
			console.warn("Vous avez fait le maximum d'actions héroiques ce tour-ci. Vous devez passer votre tour!");
			return false;
		}

		if (!isEvil && !this.evilPlayed) {
			// Evil side must play first
			console.warn("Le mal doit jouer avant vous. Sélectionnez une action du mal avant de jouer une action héroique!");
			return false;
		} else if (isEvil && this.evilPlayed) {
			// Only one evil action per turn
			console.warn("Le mal a déjà joué! Sélectionnez une action héroique pour compléter votre tour!");
			return false;
		} else if (!isEvil && this.goodPlayed && this.nGoodActions < MAX_GOOD_ACTIONS && this.hasBeenWarned === false) {
			// The player already executed a good action. If he only made one, we warn him that doing another
			// will cost him 1HP. A player can do a good action that condemns him to suicide.
			console.warn("Vous avez déjà effectué votre action héroique. Vous pouvez en jouer une, et une seule autre ce tour-ci en vous enlevant 1 HP.")
			this.hasBeenWarned = true;
			return false;
		}

		return true;
	}

	buttonHandler(e) {
		// Can't do another action until this one is over.
		this.desactivateButtons();

		const button = $(e.target);
		const isEvil = button.data('evil') === true;

		if (this.canDoAction(isEvil)) {
			const action = button.data('action');

			// Executes the action. Action occurs before the player's HP are modified to permit the case of an heroic suicide
			const actionWasCompleted = this.actionHandler(action);

			// If the action was not completed, reactivate the buttons and begin anew.
			if (!actionWasCompleted) {
				this.activateButtons();
				return;
			}

			if (isEvil) {
				this.evilPlayed = true;
			} else {
				this.goodPlayed = true;

				if (this.nbGoodActions < MAX_GOOD_ACTIONS) {
					this.nbGoodActions++;
				}

				// If this is the second good action of this player in this turn,
				// remove 1 HP.
				if (this.hasBeenWarned){
					console.warn(`Vous avez choisi de perdre un point de vie pour faire une deuxième action ce tour-ci, attention il vous restera ${this.player.HP - 1} points de vie seulement!`);
					this.player.modifyHP(HP_PENALTY);
				}
			}
		}

		this.activateButtons();
	}

	activateButtons() {
		this.buttons.on('click.koi.turn', e => this.buttonHandler(e));
	}

	deactivateButtons() {
		this.buttons.off('click.koi.turn');
	}

	actionHandler(action) {
		if (this.lastGoodAction === action) {
			console.warn('Un jouer ne peut effectuer deux fois la même action dans son tour.');
			return false;
		}

		switch (action) {
			case EVIL_ACTIONS.DRAW:
				BLACK_CARD_DECK.draw().applyEffect();
				break;
			case EVIL_ACTIONS.SIEGE:
				LOCATIONS.CASTLE.modifySiege(1);
				break;
			case EVIL_ACTIONS.SACRIFICE:
				this.player.modifyHP(HP_PENALTY);
				break;
			case GOOD_ACTIONS.DRAW:
				if (this.player.hand.length < MAX_CARDS_IN_HAND) {
					this.player.draw();
				} else {
					console.warn(`Un joueur ne peut posséder plus de ${MAX_CARDS_IN_HAND} cartes dans sa main.`);
					return false;
				}
				break;
			case GOOD_ACTIONS.CHANGE_LOCATION:
				// TODO : Prompt player to know where he wants to move
				return this.player.changeLocation(LOCATIONS.CASTLE);
			case GOOD_ACTIONS.FIGHT:
				// TODO : Prompt player to know which cards to use in which context.
			case GOOD_ACTIONS.HEAL:
				return this.player.heal();
			case GOOD_ACTIONS.ACCUSE:
				if (this.player.location !== LOCATIONS.CASTLE && (LOCATIONS.CASTLE.nSiegeEngines >= 6 || LOCATIONS.CASTLE.nSwords >= 6)) {
					console.warn('Un joueur doit être au Château pour accuser un autre joueur. De plus, il doit y avoir au moins 6 engins de sièges aux abords de Camelot, ou 6 épées, peu importe leur couleur, avant que les suspicions puissent être assez grandes pour ébranler la Table Ronde');
					return false;
				}

				// TODO : Prompt player to know which other player he wants to accuse.
				break;
			case GOOD_ACTIONS.HERO_POWER:
				if (!this.hasUsedHeroPower) this.hasUsedHeroPower = true;
				
				// Hero power doesn't count as an action, therefore we make it seem like
				// the action was not completed.
				return false;
			default:
				return false;
		}

		return true;
	}
}
