/**
 * Configuracion de las sintaxis 
 *  la configuracion esta realizada con expresiones regulares/comunes
 */
const types = require('./types').types;
const words = require('./reserved_words').word;
const chars = require('./reserved_words').chars;
const any = require('./types').any;

const syntax = {
	ini: [words.ini, '<'],
	def: [words.like,words.types, types.name,chars.fin],
	assig: [types.name, '-', '>', any,chars.fin],
	read: [types.name, '-', '>', words.read, chars.leftPar, types.texto ,chars.rightPar,chars.fin],
	show: [words.show, chars.leftPar, `${any}`, chars.rightPar, chars.fin],
	if: [words.condition, chars.leftPar,`${any}|==|<=|>=|`, chars.rightPar, chars.leftKey, 'code', chars.rightKey],
	while: [words.bucleWhile, chars.leftPar, types.name, '<|>|<=|>=', `${types.name}|${types.num}`, chars.rightPar, chars.leftKey, 'code', chars.rightKey],
	for: [words.bucleFor, chars.leftPar, types.name, words.for,`${types.name}|${types.num}`, chars.rightPar, chars.leftKey, 'code', chars.rightKey],
	accion: [words.funcion, types.name, '-', '>', chars.leftPar,`${types.name}`, chars.rightPar, chars.leftKey, 'code', chars.rightKey],
	invoca: [types.name, chars.leftPar, any, chars.rightPar, chars.fin],
	retorna:[words.retorno,any,chars.fin],
	end: [words.end, '>'],
};

module.exports = syntax;
