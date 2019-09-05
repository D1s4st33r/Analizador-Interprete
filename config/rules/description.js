/**
 *  Configuracion de los caracteres permitidos para el lenguaje "SIMPLE"
 *  lacconfiguracion esta realizada con expresiones regulares
 */
const rules = {
        alp: '[A-Za-z]',
        num: '[0-9]',
        alpnum:'[A-Za-z0-9_]',
        spe:'[^A-Za-z0-9]' ,
        log: '[+-*/%]',
};

module.exports = rules;