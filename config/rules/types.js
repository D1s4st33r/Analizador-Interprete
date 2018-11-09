/**
 *   Configuracion de la forma de las variables para el lenguaje "SIMPLE"
 *  lacconfiguracion esta realizada con expresiones regulares-comunes
 */
const descrip = require('./description').rules;

const types = {
        name: `\\b${descrip.alp}${descrip.alpnum}*\\b`,
        num: `\\b${descrip.num}+\\b`,
        decimal: `\\b${descrip.num}+\\.${descrip.num}+\\b`,
        texto: `\\b".*"\\b|\\b'.*'\\b`,
        vof: 'verdadero|falso'
};

module.exports = {
        types,
        re: `${types.name}|${types.num}|${types.decimal}|${types.texto}|${types.vof}`
};
