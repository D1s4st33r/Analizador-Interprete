/**
 * Configuracion de las palabras reservadas para el lenguaje "SIMPLE"
 *  la configuracion esta realizada con expresiones regulares-comunes
 */
const argv = require('./config/yargs'); // importo configuracion para resivir argumentos desde consola
const file = require('./src/file_manager');//importo objeto que maneja el archivo
const analyzer = require('./src/analyzer');
const performer = require('./src/performer');

const tokenizer = /((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyus]{1,6}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g;

file.read(__dirname+'\\code.txt');
console.log(file.getPath());
let contentArray = file.getContentArray();
let numLines = contentArray.length;
let numLine = 0;
let caso = {};
let tokens = [];
let lastToken = '';
let type = '';
let rWord = '';
let rChar = '';

while (numLine < numLines) {

	tokens = contentArray[numLine].toString().match(tokenizer);
	console.log(tokens);

	tokens.forEach(token => {
		let validate = token.match(new RegExp('\\s'));
		
		if (!validate && token != "") {

			if (rWord = analyzer.isRWord(token)) {
				lastToken = token;
				type = 'rword';
				performer.wordCase(rWord);
			}
			else if (rChar = analyzer.isRChar(token)) {
				lastToken = token;
				type = 'rchar';
				performer.isChar(rChar);
			}
			else if (analyzer.isVar(token)) {
				lastToken = token;
				type = 'var';
				performer.varCase(token, lastToken, numLine);
			}

			performer.validate(token, type, numLine);

			if (performer.status()) {
				// performer.eject();
			}
		}
	});
	
	numLine++;
}

//console.log(contentArray.join('').match(/((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyus]{1,6}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g));




