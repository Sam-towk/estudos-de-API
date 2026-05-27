const router = require ('express').Router()
const OrdemServico = require('../models/ordemServico');



//Create
router.post('/ordemServico', async (req, res) =>{
    const{idClient, descricao, idTecnico, concluido, dataAbertura} = req.body;

    if (!idClient || !idTecnico || concluido === undefined || !dataAbertura) {
        return res.status(422).json({error: 'Os campos de cliente, tecnico, data e conclusão estão vazios'})}

    const novaOS = {
        idClient,
        descricao,
        idTecnico,
        concluido,
        dataAbertura
    };
    try {
        await OrdemServico.create(novaOS)

        res.status(201).json({massage : 'Os registrada com sucesso'})

    } catch (error) {
        return res.status(500).json({error: error})
    }
});

//read
router.get('/', async(req, res) =>{
try {
    const ordemservico = await OrdemServico.find();
    return res.status(200).json(ordemservico);
} catch (error) {
    console.error("Erro no GET Geral:", error);
    return res.status(500).json({ error: error.message });
    }
}
)


router.get('/:id', async(req,res) =>{
    const id = req.params.id
    try {
        const ordemservico = await OrdemServico.findOne({ idClient: id });
        if (!ordemservico) {
            return res.status(404).json({ message: 'Ordem de serviço não encontrada para este cliente.' });
        }
        res.status(200).json(ordemservico)

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
    }
)

//UPDATE 

router.patch('/:id', async(req, res) => {
    const id = req.params.id;
    const camposAtualizados = req.body;

    try {
        const updateNovaOs = await OrdemServico.updateOne(
            { idClient: id },
            { $set: camposAtualizados }
        );

        if (updateNovaOs.matchedCount === 0) {
            return res.status(404).json({ message: 'Ordem de serviço não encontrada para atualização.' });
        }

        return res.status(200).json({
            message: 'Ordem de serviço atualizada com sucesso!',
            matchedCount: updateNovaOs.matchedCount
        });

    } catch (error) {
        console.error("Erro no PATCH:", error);
        return res.status(500).json({ error: error.message });
    }
})


//DELETE - Exclui por idClient (mesma lógica do UPDATE)
router.delete('/:id', async(req,res) =>{
    const id = req.params.id;

    try {
        const deleteResult = await OrdemServico.deleteOne({ idClient: id });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: 'Ordem de serviço não encontrada para exclusão.' });
        }

        return res.status(200).json({
            message: 'Ordem de serviço excluída com sucesso!',
            deletedCount: deleteResult.deletedCount
        });

    } catch (error) {
      console.error("Erro no DELETE:", error);
      return res.status(500).json({ error: error.message });
    }
})


//DELETE 
router.delete('/bulk', async(req,res) =>{
    const ids = req.body.ids;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(422).json({
            error: 'O corpo do request deve conter um array chamado "ids" com os IDs para exclusão.'
        });
    }

    try {
        const deleteResult = await OrdemServico.deleteMany({ idClient: { $in: ids } });

        return res.status(200).json({
            message: `${deleteResult.deletedCount} ordens de serviço excluídas com sucesso!`,
            deletedCount: deleteResult.deletedCount,
            idsRequested: ids.length,
            warning: ' Dados removidos permanentemente !'
        });

    } catch (error) {
      console.error("Erro no DELETE em massa:", error);
      return res.status(500).json({ error: error.message });
    }
})


module.exports = router
