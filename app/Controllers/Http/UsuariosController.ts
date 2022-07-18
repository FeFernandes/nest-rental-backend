import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SignupUsuarioValidator from 'App/Validators/SignupUsuarioValidator'
import CreateEntidadeValidator from 'App/Validators/CreateEntidadeValidator'
import Entidade from 'App/Models/Entidade'
import User from 'App/Models/Usuario'

export default class UsuariosController {
  public async index(ctx: HttpContextContract) {}
  public async create(ctx: HttpContextContract) {}
  public async show(ctx: HttpContextContract) {}
  public async edit(ctx: HttpContextContract) {}
  public async destroy(ctx: HttpContextContract) {}

  public async signup({ response, request }: HttpContextContract) {
    let entidade = new Entidade()
    try {
      const payloadEntidade = await request.validate(CreateEntidadeValidator)
      const payloadUser = await request.validate(SignupUsuarioValidator)

      entidade = await Entidade.create(payloadEntidade)
      if (entidade.$isPersisted) {
        const user = await User.create({
          ...payloadUser,
          id_perfil: 1,
          id_entidade: entidade.id,
        })
        if (user.$isPersisted) {
          response.json({
            status: true,
            entidade,
            user,
          })
        } else {
          await entidade.delete()
        }
      }
    } catch (error) {
      response.badRequest(error.messages)
      if (entidade.$isPersisted) {
        await entidade.delete()
      }
    }
  }
}
