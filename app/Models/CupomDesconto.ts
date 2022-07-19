import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class CupomDesconto extends BaseModel {
  public static table = 'cupons_descontos'

  @column({ isPrimary: true })
  public id: number

  @column()
  public descricao: string

  @column()
  public validade: string

  @column()
  public limite: number

  @column()
  public vr_desconto: number
}
