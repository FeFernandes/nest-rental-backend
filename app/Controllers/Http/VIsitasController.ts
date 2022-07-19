import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Visita from 'App/Models/Visita'

export default class VisitasController {
  public async index({ response }: HttpContextContract) {
    const categories = await Visita.first()
    response.status(200).json(categories)
  }
  public async create({ response }: HttpContextContract) {
    let visita = await Visita.firstOrCreate({ id: 1 }, { quantidade: 1 })
    try {
      if (!visita.$isLocal) {
        await visita
          .merge({
            quantidade: visita.quantidade + 1,
          })
          .save()
      }

      if (visita.$isPersisted) {
        response.status(202).json({
          ...visita.$attributes,
        })
      }
    } catch (error) {
      response.badRequest(error.messages)
    }
  }
}
