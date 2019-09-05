/**
 * Configuracion de las palabras reservadas para el lenguaje "SIMPLE"
 *  la configuracion esta realizada con expresiones regulares-comunes
 */

const word = {
        types: '\\bnum\\b|decimal|texto|vof|array', //tipos de variables
        condition: 'correcto|incorrecto|sino', // palabaras paraa condicionales
        bucleFor: 'recorre', //palabra para bucle for
        for: 'hasta',// continuacion del blucle for
        bucleWhile:'mientras', //blucle mientras
        show: 'muestra', // print|log
        read: 'oye', //lectura de datos
        this: 'este', // palabra reservada this
        try: 'intenta',
        catch: 'fallo',
        like: 'como',
        ini: 'Ini',
        end: 'Termi',
        retorna: 'retorna',
        funcion:'accion'
};

const chars = {
        fin: '!',
        leftKey: '{',
        rightKey: '}',
        leftPar: "\\(",
        rightPar: "\\)"
        // as: '-',
        // sig: '>',
        // com: '"',
        // comSim:"'"
}

module.exports = {
        word,
        chars
};