/**
 * Configuracion de las palabras reservadas para el lenguaje "SIMPLE"
 *  la configuracion esta realizada con expresiones regulares-comunes
 */

const word = {
        type: '\\bnum\\b|decimal|texto|vof|array',
        condition: 'correcto|incorrecto|sino',
        bucleFor: 'recorre',
        for: 'hasta',
        bucleWhile:'mientras',
        show: 'muestra',
        read: 'oye',
        this: 'este',
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