/**
 * Configuracion de la clase yargs para recibir argumentos desde la consola
 */
const argv = require('yargs')
	.options({
		file: {
			alias: 'f', //alias del parametro
			desc: 'Ruta del archivo',
			demand:true // es requerido
		}
	}).argv;

module.exports = {
	argv
}