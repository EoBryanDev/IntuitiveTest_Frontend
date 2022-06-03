const { Schema, model } = require('mongoose')

const CadopListItemSchema = new Schema({
        "id": {
            type:Number,
            required: true,
        },
        "Registro ANS": {
            type:Number,
            required:true
        },
        "CNPJ": {
            type:Number,
            required:true
        },
        "Razão Social": {
            type: String,
            required:true
        },
        "Nome Fantasia": {
            type: String,

        },
        "Modalidade": {
            type: String,
            required:true
        },
        "Logradouro": {
            type: String,
            required:true
        },
        "Número": {
            type: String,
            required:true
        },
        "Complemento": {
            type: String,
        },
        "Bairro":  {
            type: String,
            required:true
        },
        "Cidade": {
            type: String,
            required:true
        },
        "UF": {
            type: String,
            required:true
        },
        "CEP": {
            type: Number,
            required:true
        },
        "DDD": {
            type: Number,
            required:true
        },
        "Telefone": {
            type: Number,
            required:true
        },
        "FAX": {
            type: Number,
        },
        "Endereço eletrônico": {
            type: String,
            required:true
        },
        "Representante": {
            type: String,
            required:true
        },
        "Cargo Representante": {
            type: String,
            required:true
        },
        "Data Registro ANS": {
            type: Number,
            required:true
        },
    
})

const CadopList = model('CadopReport', CadopListItemSchema)
module.exports = CadopList