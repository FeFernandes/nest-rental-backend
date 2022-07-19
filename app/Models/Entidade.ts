import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Usuario from 'App/Models/Usuario'

export default class Entidade extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string | null

  @column()
  public documento: string | null

  @column()
  public tipo: string | null

  @column()
  public razao_social: string | null

  @column()
  public nome_fantasia: string | null

  @column()
  public inscricao_estadual: string | null

  @column()
  public email: string

  @hasOne(() => Usuario, {
    foreignKey: 'id_entidade',
  })
  public usuario: HasOne<typeof Usuario>
}
