/**
 * Configuracion del analizador de codigo, se encaragara de buscar errores de acuerdo a la configuracion de las relglas
 *  las reglas del analizador se importaran del dierectorio ./config/rules
 */

const chars = require('../config/rules/reserved_words').chars;
const words = require('../config/rules/reserved_words').word;
const types = require('../config/rules/types').types;

const analyzer = {

	//funcion para validar si un token que es paralabra reservada
	isRWord : (element) => {
		for (const key in words) {
			let regEx = new RegExp(words[key]);
			if (element.match(regEx)) {
				return key;
			}
		}
		return "";
	},

	//funcion para validar si un token que es caracter  reservado
	isRChar : (element) => {
		for (const key in chars) {
			let regEx = new RegExp(chars[key]);
			if (element.match(regEx)) {
				return key;
			}
		}
		return "";
	},

	isVar: (element) => {
		let regEx = new RegExp(types.name);
		if (element.match(regEx)) {
			return true;
		}
		return false;
	}
};


module.exports = {
	analyzer
};
