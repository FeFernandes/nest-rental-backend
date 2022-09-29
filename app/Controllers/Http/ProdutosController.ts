import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateValidator from 'App/Validators/Produtos/CreateValidator'
import ShowValidator from 'App/Validators/Produtos/ShowValidator'
import DeleteValidator from 'App/Validators/Produtos/DeleteValidator'
import EditValidator from 'App/Validators/Produtos/EditValidator'
import Produto from 'App/Models/Produto'

export default class ProdutosController {
  public async index({ response }: HttpContextContract) {
    const categories = await Produto.query().preload('categoria')
    response.status(200).json(categories)
  }
  public async show({ response, request }: HttpContextContract) {
    const payload = await request.validate(ShowValidator)
    const social = await Produto.findBy("identificador", payload.params.id)

    if (social) {
      response.status(202).json({
        ...social.$attributes,
      })
    } else {
      response.status(404).json({
        message: 'Not found',
      })
    }
  }
  public async edit({ response, request }: HttpContextContract) {
    const payload = await request.validate(EditValidator)
    const social = await Produto.find(payload.params.id)

    if (social) {
      delete payload.params
      await social
        .merge({
          ...payload,
        })
        .save()

      response.status(202).json({
        ...social.$attributes,
      })
    } else {
      response.status(404).json({
        message: 'Not found',
      })
    }
  }
  public async destroy({ response, request }: HttpContextContract) {
    const payload = await request.validate(DeleteValidator)
    const social = await Produto.findOrFail(payload.params.id)

    if (social) {
      await social.delete()
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
    let social = new Produto()
    try {
      const payload = await request.validate(CreateValidator)

      social = await Produto.create(payload)
      if (social.$isPersisted) {
        response.status(202).json({
          ...social.$attributes,
        })
      }
    } catch (error) {
      response.badRequest(error.messages)
    }
  }
}
