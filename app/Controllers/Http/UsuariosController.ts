import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUsuarioValidator from 'App/Validators/Usuarios/CreateUsuarioValidator'
import CreateEntidadeValidator from 'App/Validators/Usuarios/CreateEntidadeValidator'
import EditEntidadeValidator from 'App/Validators/Usuarios/EditEntidadeValidator'
import LoginValidator from 'App/Validators/Usuarios/LoginValidator'
import UsuarioShowValidator from 'App/Validators/Usuarios/UsuarioShowValidator'
import UsuarioDeleteValidator from 'App/Validators/Usuarios/UsuarioDeleteValidator'
import EditUsuarioValidator from 'App/Validators/Usuarios/EditUsuarioValidator'
import Entidade from 'App/Models/Entidade'
import Usuario from 'App/Models/Usuario'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsuariosController {
  public async index({ response }: HttpContextContract) {
    const users = await Entidade.query().preload('usuario')
    response.status(200).json(users)
  }
  public async show({ response, request }: HttpContextContract) {
    const payload = await request.validate(UsuarioShowValidator)
    const user = await Usuario.find(payload.params.id)

    if (user) {
      const entidade = await Entidade.find(user.id_entidade)
      response.status(202).json({
        entidade: entidade.$attributes,
        usuario: user.$attributes,
      })
    } else {
      response.status(404).json({
        message: 'Not found',
      })
    }
  }
  public async edit({ response, request }: HttpContextContract) {
    const payloadUser = await request.validate(EditUsuarioValidator)
    const user = await Usuario.find(payloadUser.params.id)

    if (user) {
      const payloadEntidade = await request.validate(EditEntidadeValidator)
      const entidade = await Entidade.find(user.id_entidade)
      await user
        .merge({
          id_perfil: user.id_perfil,
          password: user.password,
          login: user.login,
        })
        .save()
      await entidade
        .merge({
          ...payloadEntidade,
        })
        .save()

      response.status(202).json({
        entidade: entidade.$attributes,
        usuario: user.$attributes,
      })
    } else {
      response.status(404).json({
        message: 'Not found',
      })
    }
  }
  public async destroy({ response, request }: HttpContextContract) {
    const payload = await request.validate(UsuarioDeleteValidator)
    const user = await Usuario.findOrFail(payload.params.id)

    if (user && user.id_perfil === 1) {
      const entidade = await Entidade.find(user.id_entidade)
      await user.delete()
      await entidade.delete()
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
    let entidade = new Entidade()
    try {
      const payloadEntidade = await request.validate(CreateEntidadeValidator)
      const payloadUser = await request.validate(CreateUsuarioValidator)

      entidade = await Entidade.create(payloadEntidade)
      if (entidade.$isPersisted) {
        const user = await Usuario.create({
          ...payloadUser,
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
    const {login, password} = request.all();
    const user = await Usuario.findBy('login', login);

    if(!user)
      return response.status(403).json({message:"Usuário não existe!"});

    const valid = await Hash.verify(user.password, password);
    if(!valid)
      return response.status(403).json("Senha inválida!");

    const token = await auth.use('jwt').generate(user);

    response.json(token);

    /*
    const payload = await request.validate(LoginValidator)
    const user = await Usuario.findBy('login', payload.login)
    delete user.password
    const result = await auth.use('jwt').login(user, payload)
    const jwt = await auth.use('jwt').generate(user)
    response.status(200).json({ jwt, user })
    */
  }
}
