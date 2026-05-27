const mongoose = require('mongoose')

const ordemServicoSchema = new mongoose.Schema({
    idClient: Number,
    descricao:  String,
    idTecnico: Number,
    concluido: Boolean,
    dataAbertura: Date
 });

const oS = mongoose.model('OrdemServico', ordemServicoSchema);
 module.exports = oS;