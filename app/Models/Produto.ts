import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Categoria from 'App/Models/Categoria'
export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public descricao: string

  @column()
  public nome: string

  @column()
  public fabricante: string | null

  @column()
  public valor: number

  @column()
  public vr_desconto: number | null

  @column()
  public id_categoria: number | null

  @hasOne(() => Categoria, {
    foreignKey: 'id_categoria',
  })
  public categoria: HasOne<typeof Categoria>
}
