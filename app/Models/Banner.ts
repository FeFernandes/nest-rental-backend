import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Banner extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public descricao: string

  @column()
  public url: string
}
