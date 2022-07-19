import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Estado from 'App/Models/Estado'

export default class Cidade extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public cod: string

  @hasOne(() => Estado, {
    foreignKey: 'id_estado',
  })
  public Estado: HasOne<typeof Estado>
}
