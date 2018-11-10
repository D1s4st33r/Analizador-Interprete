/**
 * Clase que se encargara de interpretar y ejecutar el codigo ya analizado
 */

const syntax = require('../config/rules/syntax').syntax;


let iniIsFirst= false;			 //bandera para la estructura general, palabra reservada ini
let termiIsLast = false;		    //bandera para la estrucura general, palabra reservada 
let errores = [];				// array que almacena los errores en un objeto individual
let first = true;				//bandera, determina que es la primera linea con codigo
let listVar = [];				//array que almacena las variables en forma de objeto
let varsToMake = [];
let parOpen = [];			  //array de banderas para verificar el cerrado correcto de parentesis
let keyOpen = [];			  //array de banderas para verificar el cerrado correcto de llaves	
let pilaCases = []			     //array que sera tratado como pila de pilaCases

//funcion para crear un objeto del caso
let makeObjCase = (nameCase, struct, flags, complete = false) => {
	
	let object = {
		nameCase,
		struct,				//almacena la estuctura de una sintaxis	
		flags,					// un array  de booleanos que su numero dependera de la sintaxis que se este validando
		varInUse:[] ,			    //determina la variable en uso
		result:0,			//determina los valores actuales y los resultados finales 
		complete
	};
	
	console.log(object);
	console.log('\n');
	return object;
}

//funcion para crear el numero de bandera, esto depende de la estructura del caso
makeFlags = (num) => {	
	let array = [];
	for (let index = 0; index < num; index++) {
		array.push(false);
	}
	return array;
};

//funcion para regresar una lista de las variables guardadas
const getVars = () => {
	try {
		listVar = require('../data/var.json');
	} catch{
		listVar = [];
	}
	return listVar;
};

const insertVar = () => {
	let data = JSON.stringify(listVar);
	fs.writeFile('../data/var.json', data, (err) => {
		if (err) throw new Error('No se pudo grabar');
	});
};

const varsToMake = (name,type,value) => {
	let variable = {
		 name,
		 type,
		 value
	};

	varsToMake.push(variable);
	return tarea;
}


// const makeVar = (name,type,value) => {
// 	getVars();
// 	let varaible = {
// 		 name,
// 		 type,
// 		 value
// 	};

// 	listVar.push(varaible);
// 	insertVar();
// 	return tarea;
// }


// const addValueVar = (value,lastElement,lastSecondElement) => {
// 	get_db();
// 	let id_tarea = lista_tareas.findIndex(tarea => tarea.descripcion === descripcion)

// 	if (id_tarea >= 0) {
// 		 lista_tareas[id_tarea].terminado = estado;
// 		 insert_db();
// 		 console.log("la tarea se finalizo correctamente".green);
// 		 return true;
// 	} else {
// 		 console.log("no se encontro la tarea".red);
// 		 return false
// 	}
// }

const performer = {
	
	// funcion para determinar la sintaxis que se validara dependiendo de la palabra reservada encontrada
	wordCase: (element) => {

		switch (element) {
			case 'bucleFor':
				pilaCases.push(makeObjCase(element,syntax.for,makeFlags(syntax.for.length)))
				break;
			case 'bucleWhile':
				pilaCases.push(makeObjCase(element,syntax.while,makeFlags(syntax.while.length)))
				break;
			case 'condition':
				pilaCases.push(makeObjCase(element,syntax.if,makeFlags(syntax.if.length)))
				break;
			case 'end':
				pilaCases.push(makeObjCase(element,syntax.end,makeFlags(syntax.end.length)))
				break;
			case 'funcion':
				pilaCases.push(makeObjCase(element,syntax.accion,makeFlags(syntax.accion.length)))
				break;
			case 'ini':
				pilaCases.push(makeObjCase(element,syntax.ini,makeFlags(syntax.ini.length)))
				break;
			case 'like':
				pilaCases.push(makeObjCase(element,syntax.def,makeFlags(syntax.def.length)))
				break;
			case 'read':
				pilaCases.push(makeObjCase(element,syntax.read,makeFlags(syntax.read.length)))
				break;
			case 'retorna':
				pilaCases.push(makeObjCase(element,syntax.retorna,makeFlags(syntax.retorna.length)))
				break;
			case 'show':
				pilaCases.push(makeObjCase(element,syntax.show,makeFlags(syntax.show.length)))
				break;
			default:
				//console.log('no debia aparecer : ' + element);
				break;	
		}
		
		if (first && element == 'ini') {
			iniIsFirst = true;
		}
		else {
			first = false;
		}
	},
	// funcion para determinar la sintaxis que se validara dependiendo de la palabra reservada encontrada
	charCase: (element) => {
		
		switch (element) {
			case 'fin':
				console.log('soy !');
				break;
			case 'as':
				console.log('soy -');
				break;
			case 'sig':
				console.log('soy >');
				break;
			case 'leftKey':
				console.log('soy {');
				break;
			case 'rightKey':
				console.log('soy }');
				break;
			case 'leftPar':
				console.log('soy (');
				break;
			case 'rightPar':
				console.log('soy )');
				break;
			case 'com':
				console.log('soy "');
				break;
			case 'comSim':
				console.log("soy '");
				break;
			default:
				console.log('mmmta :v');
				break;
		}

		if (first) {
			first = false;
		}
	},

	// funcion para manejar la variable, si se esta declarando o si se esta usando y su manejo de errores
	varCase: (element, lastElement,lastSecondElement, line) => {

		let regEx = new RegExp('\\bnum\\b|decimal|texto|vof|array');

		if (lastElement.match(regEx) && lastSecondElement=='como' || varsToMake.length>0) {
			varsToMake(element,lastElement);
			return 0;
		}
	
		let vars=getVars();
		
		for (let varaible of vars) {

			if (varaible.name == element) {
				//varInUse = element;
				return 0;
			}
		}
		
		errores.push({
			tipo: 'undefined',
			message: `la variable ${element} no se ha definido`,
			line
		});
	},

};

module.exports = {
	performer
}