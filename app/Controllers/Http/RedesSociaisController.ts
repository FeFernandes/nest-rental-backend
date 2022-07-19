import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateValidator from 'App/Validators/RedesSociais/CreateValidator'
import ShowValidator from 'App/Validators/RedesSociais/ShowValidator'
import DeleteValidator from 'App/Validators/RedesSociais/DeleteValidator'
import EditValidator from 'App/Validators/RedesSociais/EditValidator'
import RedeSocial from 'App/Models/RedeSocial'

export default class RedesSociaisController {
  public async index({ response }: HttpContextContract) {
    const categories = await RedeSocial.all()
    response.status(200).json(categories)
  }
  public async show({ response, request }: HttpContextContract) {
    const payload = await request.validate(ShowValidator)
    const social = await RedeSocial.find(payload.params.id)

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
    const social = await RedeSocial.find(payload.params.id)

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
    const social = await RedeSocial.findOrFail(payload.params.id)

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
    let social = new RedeSocial()
    try {
      const payload = await request.validate(CreateValidator)

      social = await RedeSocial.create(payload)
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
