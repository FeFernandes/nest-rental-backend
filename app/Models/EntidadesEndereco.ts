import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Endereco from 'App/Models/Endereco'
import Entidade from 'App/Models/Entidade'

export default class EntidadesEndereco extends BaseModel {
  public static tableName = 'entidades_endereco'
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_entidade: number

  @column()
  public id_endereco: number

  @column()
  public tipo: string

  @hasOne(() => Endereco, {
    foreignKey: 'id_endereco',
  })
  public endereco: HasOne<typeof Endereco>

  @hasOne(() => Entidade, {
    foreignKey: 'id_entidade',
  })
  public entidade: HasOne<typeof Entidade>
}
