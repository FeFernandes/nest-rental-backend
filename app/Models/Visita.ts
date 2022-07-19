import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Visita extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public quantidade: number
}
