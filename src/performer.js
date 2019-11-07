/**
 * Clase que se encargara de interpretar y ejecutar el codigo ya analizado
 */

const syntax = require('../config/rules/syntax');


let iniIsFirst = false;			//bandera para la estructura general, palabra reservada ini
let termiIsLast = false;		//bandera para la estrucura general, palabra reservada 
let first = true;				//bandera, determina que es la primera linea de codigo
let listVar = [];				//array que almacena las variables en forma de objeto
let type = '';					//el tipo define que reglas son, de palabra reservada, caracter o variable
let varsToMake = [];			//array que almacena las variables a crear
let parOpen = [];			  	//array de banderas para verificar el cerrado correcto de parentesis
let keyOpen = [];			  	//array de banderas para verificar el cerrado correcto de llaves	
let pilaCases = [];			   	//array que sera tratado como pila de de los casos
let lastCase = 0;


//funcion para crear un objeto del caso
const makeObjCase = (nameCase, struct, flags) => {
	
	let object = {
		nameCase,			//almacena un nombre de caso 
		struct,				//almacena la estuctura de una sintaxis	
		flags,				// un array  de booleanos que su numero dependera de la sintaxis que se este validando
		numFlag: 0,			//varaible centinela que llevara el numero de banderas para recorrerlo
		limit:flags.length,	//variable que alamecena el numero limite de bandera
		varInUse:[] ,		//determina la variable en uso
		result: 0,			//determina los valores actuales y los resultados finales 
	};

	return object;
}

const checkCase = (last) => {
	pilaCases[last].flags.forEach(element => {
		if (!element) {
			return false;
		}
	});
	return true;
}

//funcion para crear el numero de bandera, esto depende de la estructura del caso
const makeFlags = (num) => {	
	let array = [];
	for (let index = 0; index < num; index++) {
		array.push(false);
	}
	return array;
};

//Funcion para preparar variables a guardar
const prepareVars = (name,type) => {
	let variable = {
		name,
		type,
		value: false
	};

	varsToMake.push(variable);
	// return tarea;
}


const makeVars = (vars) => {

	vars.forEach(element => {
		listVar.push(element);
		// return tarea;
	});
}


// const addValueVar = (value,lastToken,lastSecondToken) => {
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

//obejeto que contiene las acciones que interpretara el codigo analizado
const performer = {
	
	// funcion para determinar la sintaxis que se validara dependiendo de la palabra reservada encontrada
	wordCase: (caso) => {

		switch (caso) {
			case 'bucleFor':
				pilaCases.push(makeObjCase(caso,syntax.for,makeFlags(syntax.for.length)))
				break;
			case 'bucleWhile':
				pilaCases.push(makeObjCase(caso,syntax.while,makeFlags(syntax.while.length)))
				break;
			case 'condition':
				pilaCases.push(makeObjCase(caso,syntax.if,makeFlags(syntax.if.length)))
				break;
			case 'end':
				pilaCases.push(makeObjCase(caso,syntax.end,makeFlags(syntax.end.length)))
				break;
			case 'funcion':
				pilaCases.push(makeObjCase(caso,syntax.accion,makeFlags(syntax.accion.length)))
				break;
			case 'ini':
				pilaCases.push(makeObjCase(caso,syntax.ini,makeFlags(syntax.ini.length)))
				break;
			case 'like':
				pilaCases.push(makeObjCase(caso,syntax.def,makeFlags(syntax.def.length)))
				break;
			case 'read':
				pilaCases.push(makeObjCase(caso,syntax.read,makeFlags(syntax.read.length)))
				break;
			case 'retorna':
				pilaCases.push(makeObjCase(caso,syntax.retorna,makeFlags(syntax.retorna.length)))
				break;
			case 'show':
				pilaCases.push(makeObjCase(caso,syntax.show,makeFlags(syntax.show.length)))
				break;
			default:
				console.log('no debia aparecer : ' + caso);
				break;	
		}

		if (first && caso == 'ini') {
			iniIsFirst = true;
		}
		if(first) first=false;
	},
	// funcion para determinar la sintaxis que se validara dependiendo de la palabra reservada encontrada
	isChar: (caso) => {
		
		switch (caso) {
			case 'fin':
				//console.log('soy !');
				break;
			case 'as':
				//console.log('soy -');
				break;
			case 'sig':
				//('soy >');
				break;
			case 'leftKey':
				//('soy {');
				break;
			case 'rightKey':
				//('soy }');
				break;
			case 'leftPar':
				//('soy (');
				break;
			case 'rightPar':
				//('soy )');
				break;
			case 'com':
				//('soy "');
				break;
			case 'comSim':
				//("soy '");
				break;
			default:
				console.log('mmmta :v');
				break;
		}

		if (first) first = false;
	},

	// funcion para manejar la variable, si se esta declarando o si se esta usando y su manejo de errores
	varCase: (token, type) => {

		if(pilaCases.length > 0) {
			if(pilaCases[lastCase].name == 'like') {
				prepareVars(token, type);
			} else {
				listVar.forEach(variable => {
					if (variable.name == token&&pilaCases.length>0) {
						pilaCases[lastCase].varInUse.push(variable)
					}
				});
			}
		} else {
			pilaCases.push(makeObjCase('assig',syntax.assig,makeFlags(syntax.assig.length)))
		}
	},

	//metodo que se encargara de ejecutar el codigo interpretado anteriormente por esta misma clase
	validate: (token,type,line) => {
		
		if (pilaCases.length>0) {
			lastCase = pilaCases.length - 1;
			let caso = pilaCases[lastCase];
	
			if (token.match(new RegExp(caso.struct[caso.numFlag]))) {
				caso.flags[caso.numFlag] = true;
			}
			else {
				console.error('Error de syntaxis:')
				console.log(`no se encuentra el elemento ${caso.struct[caso.numFlag]} en la linea : ${line}`);
			}
			if (pilaCases[lastCase].numFlag < pilaCases[lastCase].limit) { pilaCases[lastCase].numFlag++; }

			console.log(`::::: ${token} ::::: `);
			console.log(pilaCases[lastCase]);
			console.log("----------------------");

		}
	},
	
	status: () => {

		console.log('***** EVIDENCIA *****');
		console.log(pilaCases[lastCase]);

		if (pilaCases[lastCase].numFlag == pilaCases[lastCase].limit) {
				
			if (checkCase(lastCase)) {
				return true;
			} 
		}
		return false;
	},

	eject: () => {
		switch (pilaCases[lastCase].name) {
			case 'bucleFor':
				// for(pilaCases[lastCase])
				break;
			case 'bucleWhile':
				pilaCases.push(makeObjCase(caso,syntax.while,makeFlags(syntax.while.length)))
				break;
			case 'condition':
				pilaCases.push(makeObjCase(caso,syntax.if,makeFlags(syntax.if.length)))
				break;
			case 'end':
				pilaCases.push(makeObjCase(caso,syntax.end,makeFlags(syntax.end.length)))
				break;
			case 'funcion':
				pilaCases.push(makeObjCase(caso,syntax.accion,makeFlags(syntax.accion.length)))
				break;
			case 'ini':
				pilaCases.push(makeObjCase(caso,syntax.ini,makeFlags(syntax.ini.length)))
				break;
			case 'like':
				pilaCases.push(makeObjCase(caso,syntax.def,makeFlags(syntax.def.length)))
				break;
			case 'read':
				pilaCases.push(makeObjCase(caso,syntax.read,makeFlags(syntax.read.length)))
				break;
			case 'retorna':
				pilaCases.push(makeObjCase(caso,syntax.retorna,makeFlags(syntax.retorna.length)))
				break;
			case 'show':
				pilaCases.push(makeObjCase(caso,syntax.show,makeFlags(syntax.show.length)))
				break;
			default:
				//console.log('no debia aparecer : ' + caso);
				break;	
		}
	}

};

module.exports = performer;