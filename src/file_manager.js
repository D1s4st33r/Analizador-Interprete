/**
 * Configuracion del manejador de archivos
 */
const fs = require('fs');

const manager = {
	path: '', 
	content: '', //guarda todo el contenido en un String
	lines:[], // recibe un arreglo de todas las lineas del archivo
	read: (path) => {
		this.path = path;
		this.content = fs.readFileSync(path, 'utf8', 'string');
		this.lines = this.content.split(/\r\n|\r|\n|\t/);
	},
	getContentArray: () => this.lines,
	getContent: () => this.content,
	getPath: ()=> this.path
}

module.exports = {
	manager
};