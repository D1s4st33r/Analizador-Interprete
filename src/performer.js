/**
 * Clase que se encargara de interpretar y ejecutar el codigo ya analizado
 */

const syntax = require('../config/rules/syntax').syntax;


let iniIsFirst= false;			 //bandera para la estructura general, palabra reservada ini
let termiIsLast = false;		    //bandera para la estrucura general, palabra reservada 
let errores = [];				// array que almacena los errores en un objeto individual
let first = true;				//bandera, determina que es la primera linea de codigo
let listVar = [];				//array que almacena las variables en forma de objeto
let type = '';					//el tipo define que reglas son, de palabra reservada, caracter o variable
let varsToMake = [];			//array que almacena las variables a crear
let parOpen = [];			  //array de banderas para verificar el cerrado correcto de parentesis
let keyOpen = [];			  //array de banderas para verificar el cerrado correcto de llaves	
let pilaCases = [];			   //array que sera tratado como pila de de los casos
let lastCase = 0;


//funcion para crear un objeto del caso
const makeObjCase = (nameCase, struct, flags) => {
	
	let object = {
		nameCase,
		struct,				//almacena la estuctura de una sintaxis	
		flags,					// un array  de booleanos que su numero dependera de la sintaxis que se este validando
		numFlag: 0,				//varaible centinela que llevara el numero de banderas para recorrerlo
		limit:flags.length,		//variable que alamecena el numero limite de bandera
		varInUse:[] ,			    //determina la variable en uso
		result: 0,			//determina los valores actuales y los resultados finales 
	};
	//console.log(object);
	//console.log('\n');
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

const prepareVars = (name,type) => {
	let variable = {
		 name,
		 type,
		//  value
	};

	varsToMake.push(variable);
	// return tarea;
}


const makeVars = (vars) => {

	vars.forEach(element => {
		listVar.push(element);
		insertVar();
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
		//console.log(pilaCases);
		// pilaCases=[]
		if (first && caso == 'ini') {
			iniIsFirst = true;
		}
		else {
			first = false;
		}
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
				//console.log('soy >');
				break;
			case 'leftKey':
				//console.log('soy {');
				break;
			case 'rightKey':
				//console.log('soy }');
				break;
			case 'leftPar':
				//console.log('soy (');
				break;
			case 'rightPar':
				//console.log('soy )');
				break;
			case 'com':
				//console.log('soy "');
				break;
			case 'comSim':
				//console.log("soy '");
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
	varCase: (token, lastToken, line) => {

		let regEx = new RegExp('\\bnum\\b|decimal|texto|vof|array');
		listVar.forEach(variable => {
			if (variable.name == token&&pilaCases.length>0) {
				pilaCases[lastCase].varInUse.push(variable)
			}	
		});

		if(lastToken.match(regEx)){type=lastToken}

		if (pilaCases.length>0&& pilaCases[lastCase].nameCase=='like') {
			prepareVars(token, type);
		}
		
		errores.push({
			tipo: 'undefined',
			message: `la variable ${token} no se ha definido`,
			line
		});

		if (first) {
			first = false;
		}
	},

	//metodo que se encargara de ejecutar el codigo interpretado anteriormente por esta misma clase
	validate: (token,type,line) => {
		
		if (pilaCases.length>0) {
			lastCase = pilaCases.length - 1;
			console.log("\n");
			// console.log(pilaCases);
			if (token.match(new RegExp(pilaCases[lastCase].struct[pilaCases[lastCase].numFlag]))) {
				pilaCases[lastCase].flags[pilaCases[lastCase].numFlag] = true;
			}
			else {
				console.log(`no se encuentra el elemento ${pilaCases[lastCase].struct[pilaCases[lastCase].numFlag]} en la linea : ${line}`);
			}
			if (pilaCases[lastCase].numFlag < pilaCases[lastCase].limit) { pilaCases[lastCase].numFlag++; }
			console.log('::::::::::::::::::::::::' + token);
			console.log(pilaCases[lastCase]);
			console.log("//////////////////////////////////////////////////////////////////////////////");

		}
	},
	
	status: () => {

		
		if (pilaCases[lastCase].numFlag == pilaCases[lastCase].limit) {
				
			if (checkCase(lastCase)) {
				return true;
			} 
			console.log(`PRUEBA: ${pilaCases[lastCase]}`);
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