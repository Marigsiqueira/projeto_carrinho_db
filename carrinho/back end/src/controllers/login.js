const database = require('../config/index')
const tabela = require('../models/usuarioModels')

class LoginControllers{

    static async Cadastrar(req, res) {
        await database.sync()

        let data = await tabela.findAll({raw : true})
        let array = Object.values(data);

        for (let i =0; i < array.length; i++){

           

            if (req.body.nome== array[i].nome){
                console.log("Nome já cadastrado")
            }else{
                const rescreate = await tabela.create(req.body)
                console.log("Cadastrado")
            }

        }

        res.send("foi")
      
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
        if(verificacao == true){
            res.status(200).json(1)
        }else{
            res.send('login invalido')
        }
    }
}

module.exports = LoginControllers;