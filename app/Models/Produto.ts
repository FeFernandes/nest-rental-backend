import { BaseModel, BelongsTo, belongsTo, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
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
  public identificador: string | null

  @column()
  public prod_image: string | null

  @column()
  public valor: number

  @column()
  public vr_desconto: number | null

  @column()
  public id_categoria: number | null

  @belongsTo(() => Categoria, {
    foreignKey: 'id_categoria',
  })
  public categoria: BelongsTo<typeof Categoria>
}
