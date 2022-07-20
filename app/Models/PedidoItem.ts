import { BaseModel, belongsTo, column, BelongsTo, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Pedido from 'App/Models/Pedido'

export default class PedidoItem extends BaseModel {
  public static table = 'pedidos_itens'

  @column({ isPrimary: true })
  public id: number

  @column()
  public id_pedido: number

  @column()
  public id_produto: number

  @column()
  public valor: number

  @column()
  public vr_desconto: number | null

  @column()
  public quantidade: number

  @belongsTo(() => Pedido, {
    localKey: 'id_pedido',
  })
  public pedido: BelongsTo<typeof Pedido>
}
