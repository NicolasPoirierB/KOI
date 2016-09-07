
/** Card */
export class Card {
	
	/** 
	 * Creates a card. 
	 * @param options {Object} - The options for a card : img, description, value, specialEffect.
	 */
	constructor(options) {

		this.img = options.img;
		this.description = options.description;

		// Valeur utilisée de plusieurs façons (carte de combat, lancelot, etc)
		// Si c'est une carte sans valeur (carte spéciale) sa valeur est de -1;
		this.value = options.value || -1;

		// String
		this.specialEffect = options.specialEffect || false;
	}

	/**
	 * Apply the effect of that card.
	 */
	applyEffect() {
		
	}

}
