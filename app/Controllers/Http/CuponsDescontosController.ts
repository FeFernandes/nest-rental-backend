import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateValidator from 'App/Validators/CuponsDescontos/CreateValidator'
import ShowValidator from 'App/Validators/CuponsDescontos/ShowValidator'
import DeleteValidator from 'App/Validators/CuponsDescontos/DeleteValidator'
import EditValidator from 'App/Validators/CuponsDescontos/EditValidator'
import CupomDesconto from 'App/Models/CupomDesconto'

export default class CuponsDescontosController {
  public async index({ response }: HttpContextContract) {
    const categories = await CupomDesconto.all()
    response.status(200).json(categories)
  }
  public async show({ response, request }: HttpContextContract) {
    const payload = await request.validate(ShowValidator)
    const social = await CupomDesconto.find(payload.params.id)

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
    const cupomDesconto = await CupomDesconto.find(payload.params.id)

    if (cupomDesconto) {
      delete payload.params
      const validade = payload.validade
      delete payload.validade
      await cupomDesconto
        .merge({
          ...payload,
          validade: `${validade.toSQLDate()} 00:00:00`,
        })
        .save()

      response.status(202).json({
        ...cupomDesconto.$attributes,
      })
    } else {
      response.status(404).json({
        message: 'Not found',
      })
    }
  }
  public async destroy({ response, request }: HttpContextContract) {
    const payload = await request.validate(DeleteValidator)
    const social = await CupomDesconto.findOrFail(payload.params.id)

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
    let cupom = new CupomDesconto()
    try {
      const payload = await request.validate(CreateValidator)
      const validade = payload.validade
      delete payload.validade
      cupom = await CupomDesconto.create({
        ...payload,
        validade: `${validade.toSQLDate()} 00:00:00`,
      })
      if (cupom.$isPersisted) {
        response.status(202).json({
          ...cupom.$attributes,
        })
      }
    } catch (error) {
      response.badRequest(error.messages)
    }
  }
}
