import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateValidator from 'App/Validators/Enderecos/CreateValidator'
import EstadoCidadesValidator from 'App/Validators/Enderecos/EstadoCidadesValidator'
import DeleteValidator from 'App/Validators/Enderecos/DeleteValidator'
import EditValidator from 'App/Validators/Enderecos/EditValidator'
import ShowValidator from 'App/Validators/Enderecos/ShowValidator'
import Entidade from 'App/Models/Entidade'
import Estado from 'App/Models/Estado'
import Cidade from 'App/Models/Cidade'
import Endereco from 'App/Models/Endereco'
import EntidadesEndereco from 'App/Models/EntidadesEndereco'

export default class EnderecosController {
  public async estados({ response }: HttpContextContract) {
    const estados = await Estado.all()
    response.status(200).json(estados)
  }

  public async estadoCidade({ response, request }: HttpContextContract) {
    const payload = await request.validate(EstadoCidadesValidator)
    const cidades = await Cidade.query()
      .where('id_estado', payload.params.id)
      .orderBy('nome', 'asc')

    if (cidades) {
      response.status(202).json(cidades)
    } else {
      response.status(404).json({
        message: 'Not found',
      })
    }
  }

  public async cidadePeloNome({ response, request }: HttpContextContract) {
    const { nome } = request.params();
    console.log(decodeURI(nome));
    const cidade = await Cidade.query().where('nome', decodeURI(nome));

    if (cidade?.length == 1) {
      response.json(cidade[0])
    } else {
      response.status(404).json({ message: 'Not found' })
    }
  }

  public async show({ response, request }: HttpContextContract) {
    const payload = await request.validate(ShowValidator)
    const endereco = await Endereco.find(payload.params.id)

    if (endereco) {
      response.status(202).json({
        ...endereco.$attributes,
      })
    } else {
      response.status(404).json({
        message: 'Not found',
      })
    }
  }
  public async edit({ response, request }: HttpContextContract) {
    const payload = await request.validate(EditValidator)
    const endereco = await Endereco.find(payload.params.id)

    if (endereco) {
      const entidadeEndereco = await EntidadesEndereco.findBy('id_endereco', payload.params.id)
      const tipo = payload.tipo
      delete payload.params
      delete payload.tipo
      await endereco
        .merge({
          ...payload,
        })
        .save()
      await entidadeEndereco
        .merge({
          tipo,
        })
        .save()
      response.status(202).json({
        ...endereco.$attributes,
        entidadeEndereco: entidadeEndereco.$attributes,
      })
    } else {
      response.status(404).json({
        message: 'Not found',
      })
    }
  }
  public async destroy({ response, request }: HttpContextContract) {
    const payload = await request.validate(DeleteValidator)
    const endereco = await Endereco.findOrFail(payload.params.id)

    if (endereco) {
      const entidadeEndereco = await EntidadesEndereco.findBy('id_endereco', payload.params.id)
      if (entidadeEndereco) {
        await entidadeEndereco.delete()
      }

      await endereco.delete()
      response.status(200).json({
        status: true,
      })
    } else {
      response.status(404).json({
        message: 'Not found',
      })
    }
  }

  public async create({ response, request }: HttpContextContract) {
    let endereco = new Endereco()
    try {
      const payload = await request.validate(CreateValidator)
      const idEntidade = payload.params.id_entidade
      await Entidade.findOrFail(idEntidade)
      const tipo = payload.tipo
      delete payload.params
      delete payload.tipo

      endereco = await Endereco.create(payload)
      if (endereco.$isPersisted) {
        const entidadeEndereco = await EntidadesEndereco.create({
          id_entidade: parseInt(idEntidade),
          id_endereco: endereco.id,
          tipo,
        })
        response.status(202).json({
          ...endereco.$attributes,
          entidade_endereco: entidadeEndereco.$attributes,
        })
      }
    } catch (error) {
      response.badRequest(error.messages)
    }
  }
}
