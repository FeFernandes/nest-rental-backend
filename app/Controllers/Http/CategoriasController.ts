import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateCategoriaValidator from 'App/Validators/Categorias/CreateCategoriaValidator'
import CategoriaShowValidator from 'App/Validators/Categorias/CategoriaShowValidator'
import CategoriaDeleteValidator from 'App/Validators/Categorias/CategoriaDeleteValidator'
import EditCategoriaValidator from 'App/Validators/Categorias/EditCategoriaValidator'
import Categoria from 'App/Models/Categoria'

export default class CategoriasController {
  public async index({ response }: HttpContextContract) {
    const categories = await Categoria.all()
    response.status(200).json(categories)
  }
  public async show({ response, request }: HttpContextContract) {
    const payload = await request.validate(CategoriaShowValidator)
    const category = await Categoria.find(payload.params.id)

    if (category) {
      response.status(202).json({
        ...category.$attributes,
      })
    } else {
      response.status(404).json({
        message: 'Not found',
      })
    }
  }
  public async edit({ response, request }: HttpContextContract) {
    const payload = await request.validate(EditCategoriaValidator)
    const category = await Categoria.find(payload.params.id)

    if (category) {
      await category
        .merge({
          descricao: payload.descricao,
        })
        .save()

      response.status(202).json({
        ...category.$attributes,
      })
    } else {
      response.status(404).json({
        message: 'Not found',
      })
    }
  }
  public async destroy({ response, request }: HttpContextContract) {
    const payload = await request.validate(CategoriaDeleteValidator)
    const category = await Categoria.findOrFail(payload.params.id)

    if (category) {
      await category.delete()
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
    let category = new Categoria()
    try {
      const payload = await request.validate(CreateCategoriaValidator)

      category = await Categoria.create(payload)
      if (category.$isPersisted) {
        response.status(202).json({
          ...category.$attributes,
        })
      }
    } catch (error) {
      response.badRequest(error.messages)
    }
  }
}
