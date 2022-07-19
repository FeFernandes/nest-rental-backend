import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class RedeSocial extends BaseModel {
  public static table = 'redes_sociais'

  @column({ isPrimary: true })
  public id: number

  @column()
  public descricao: string

  @column()
  public url: string
}
