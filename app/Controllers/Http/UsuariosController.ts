import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SignupUsuarioValidator from 'App/Validators/SignupUsuarioValidator'
import CreateEntidadeValidator from 'App/Validators/CreateEntidadeValidator'
import LoginValidator from 'App/Validators/LoginValidator'
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

  public async login({ response, request, auth }: HttpContextContract) {
    const payload = await request.validate(LoginValidator)
    const user = await User.findBy('login', payload.login)
    delete user.password
    const result = await auth.use('jwt').login(user, payload)
    const jwt = await auth.use('jwt').generate(user)
    response.status(200).json({ jwt, user })
  }
}
