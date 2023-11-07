const database = require('../config/index')
const tabela = require('../models/usuarioModels')

class LoginControllers{

    static async Cadastrar(req, res) {
        try {
          const { nome, senha } = req.body;
      
          const user = await tabela.findOne({ where: { nome } });
      
          if (user) {
            res.status(400).send('Nome de usuário já cadastrado');
          } else {
            await tabela.create({ nome, senha });
            res.status(200).send('Cadastro realizado com sucesso');
          }
        } catch (error) {
          console.error('Erro ao cadastrar o usuário', error);
          res.status(500).send('Erro ao cadastrar o usuário');
        }
      }
      

    static async Login(req, res){
        await database.sync();
        let data = await tabela.findAll({raw : true});
        let array = Object.keys(data)
        let registros = Object.values(data)
        let verificacao = false
        for(let i = 0; i < array.length; i++){
            if(req.body.senha == registros[i].senha && req.body.nome == registros[i].nome){
                verificacao = true
            }
        }

        let dataPerfil = await tabelaPerfil.findAll({raw : true})
        let arrayPerfil = Object.keys(dataPerfil)
        let registrosPerfil = Object.values(dataPerfil)

        for(let i = 0; i < arrayPerfil.length; i++){
            if(registrosPerfil[i].status == 1){
                const UpdateOffline = await tabelaPerfil.update({status : 0}, {where: {idPerfil: (i + 1)} })
            }
        }
        
        if(verificacao == true){
            let idUser = await tabela.findAll({
                where : {nome : req.body.nome},
                attributes :[
                    'idUsuario', 
                    'nome'
                ]
            })
            let dadosObj = Object.values(idUser)
            let idWhere = dadosObj[0].dataValues.idUsuario
            const UpdateStatus = await tabelaPerfil.update({status : 1}, {where: {idPerfil : idWhere} })
            res.status(200).json(5)
        }else{
            res.send('login invalido')
        }
    }
}

module.exports = LoginControllers;