import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import Entidade from 'App/Models/Entidade'
import Perfil from 'App/Models/Perfil'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public password: string

  @column()
  public login: string

  @column()
  public id_entidade: number

  @column()
  public id_perfil: number

  @beforeSave()
  public static async hashPassword(user: Usuario) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
