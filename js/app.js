(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Card deck */
var CardDeck = exports.CardDeck = function () {

	/**
  * Creates a card deck from an array of cards.
  * @param {Array} cardList - An array of cards.
  */
	function CardDeck(cardList) {
		_classCallCheck(this, CardDeck);

		this.cards = cardList;
		this.graveyard = [];
	}

	/**
  * Rebuilds the deck by taking the cards in the graveyard and shuffling two times.
  */


	_createClass(CardDeck, [{
		key: "_rebuild",
		value: function _rebuild() {
			this.cards = this.graveyard;
			this.graveyard = [];
			this.suffle(2);
		}

		/**
   * Shuffles the cards in the deck n times.
   * @param {Number} n Number of times the cards will be shuffled.
   */

	}, {
		key: "shuffle",
		value: function shuffle(n) {
			for (var i = 0; i < n; i++) {
				for (var j = 0; j < this.cards.length; j++) {
					var k = Math.floor(Math.random() * this.cards.length);
					var temp = this.cards[j];
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

	}, {
		key: "draw",
		value: function draw(n) {
			var cards = [];

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

	}, {
		key: "addToGraveyard",
		value: function addToGraveyard(card) {
			this.graveyard.push(card);
			return this;
		}
	}]);

	return CardDeck;
}();

},{}],2:[function(require,module,exports){
'format es6';
'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _ns = require('ns');

var _ns2 = _interopRequireDefault(_ns);

var _CardDeck = require('./Cards/CardDeck');

var _CardDeck2 = _interopRequireDefault(_CardDeck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ns2.default.docReady.then(function () {});

},{"./Cards/CardDeck":1,"jquery":"jquery","ns":3}],3:[function(require,module,exports){
'format es6';
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Promise = require('Promise');

var _Promise2 = _interopRequireDefault(_Promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'koi';

try {
	require('source-map-' + 'support').install();
} catch (e) {}

var ns = window[name] = window[name] || {};

ns.window = (0, _jquery2.default)(window);

ns.getBody = function () {
	var body;
	return function () {
		return body = body || (0, _jquery2.default)('body');
	};
}();

window.requestAnimFrame = function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
		window.setTimeout(callback, 1000 / 60);
	};
}();

/**
 * generates unique id
 */
ns.getUniqueID = function () {
	var id = 0;
	return function () {
		return 'uid' + id++;
	};
}();

ns.docReady = function () {
	return new _Promise2.default(function (resolve, reject) {
		(0, _jquery2.default)(document).ready(function () {
			resolve();
		});
	});
}();

ns.docReady.then(function () {
	//console.log("ready");
});

exports.default = ns;

},{"Promise":"Promise","jquery":"jquery"}]},{},[2])


//# sourceMappingURL=app.js.map
