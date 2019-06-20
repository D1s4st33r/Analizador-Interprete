/**
 * Configuracion de las sintaxis 
 *  la configuracion esta realizada con expresiones regulares/comunes
 */
const types = require('./types').types;
const words = require('./reserved_words').word;
const chars = require('./reserved_words').chars;
const val = require('./types').re;

const syntax = {
	ini: [words.ini, '<'],
	def: [words.like,words.type, types.name,chars.fin],
	assig: [types.name, '-', '>', val,chars.fin],
	read: [types.name, '-', '>', words.read, chars.leftPar, types.texto ,chars.rightPar,chars.fin],
	show: [words.show, chars.leftPar, `${types.name}|${types.texto}`, chars.rightPar, chars.fin],
	if: [words.condition, chars.leftPar,`${val}|==|<=|>=|`, chars.rightPar, chars.leftKey, 'code', chars.rightKey],
	while: [words.bucleWhile, chars.leftPar, types.name, '<|>|>=|<=|==', `${types.name}|${types.num}`, chars.rightPar, chars.leftKey, 'code', chars.rightKey],
	for: [words.bucleFor, chars.leftPar, types.name, words.for,`${types.name}|${types.num}`, chars.rightPar, chars.leftKey, 'code', chars.rightKey],
	accion: [words.funcion, types.name, '-', '>', chars.leftPar,`${types.name}`, chars.rightPar, chars.leftKey, 'code', chars.rightKey],
	invoca: [types.name, chars.leftPar, val, chars.rightPar, chars.fin],
	retorna:[words.retorno,val,chars.fin],
	end: ['>', words.end],
};

module.exports = {
	syntax
}
