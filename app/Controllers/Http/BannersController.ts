import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateValidator from 'App/Validators/Banners/CreateValidator'
import ShowValidator from 'App/Validators/Banners/ShowValidator'
import DeleteValidator from 'App/Validators/Banners/DeleteValidator'
import EditValidator from 'App/Validators/Banners/EditValidator'
import Banner from 'App/Models/Banner'

export default class BannersController {
  public async index({ response }: HttpContextContract) {
    const categories = await Banner.all()
    response.status(200).json(categories)
  }
  public async show({ response, request }: HttpContextContract) {
    const payload = await request.validate(ShowValidator)
    const banner = await Banner.find(payload.params.id)

    if (banner) {
      response.status(202).json({
        ...banner.$attributes,
      })
    } else {
      response.status(404).json({
        message: 'Not found',
      })
    }
  }
  public async edit({ response, request }: HttpContextContract) {
    const payload = await request.validate(EditValidator)
    const banner = await Banner.find(payload.params.id)

    if (banner) {
      delete payload.params
      await banner
        .merge({
          ...payload,
        })
        .save()

      response.status(202).json({
        ...banner.$attributes,
      })
    } else {
      response.status(404).json({
        message: 'Not found',
      })
    }
  }
  public async destroy({ response, request }: HttpContextContract) {
    const payload = await request.validate(DeleteValidator)
    const banner = await Banner.findOrFail(payload.params.id)

    if (banner) {
      await banner.delete()
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
    let banner = new Banner()
    try {
      const payload = await request.validate(CreateValidator)

      banner = await Banner.create(payload)
      if (banner.$isPersisted) {
        response.status(202).json({
          ...banner.$attributes,
        })
      }
    } catch (error) {
      response.badRequest(error.messages)
    }
  }
}
