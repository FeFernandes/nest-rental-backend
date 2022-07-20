import Encryption from '@ioc:Adonis/Core/Encryption'
import {
  BaseModel,
  column,
  beforeSave,
  hasOne,
  HasOne,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Entidade from 'App/Models/Entidade'
import CupomDesconto from 'App/Models/CupomDesconto'
import Endereco from 'App/Models/Endereco'
import PedidoItem from 'App/Models/PedidoItem'

export default class Pedido extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numero: string

  @column()
  public descricao: string

  @column()
  public data_inicio: string | null

  @column()
  public data_entrega: string | null

  @column()
  public vr_total: number

  @column()
  public id_endereco: number | null

  @column()
  public id_cupom_desconto: number | null

  @column()
  public id_cliente: number | null

  @column()
  public id_usuario: number

  @hasOne(() => Entidade, {
    foreignKey: 'id_usuario',
  })
  public entidade: HasOne<typeof Entidade>

  @hasOne(() => Entidade, {
    foreignKey: 'id_cliente',
  })
  public cliente: HasOne<typeof Entidade>

  @hasOne(() => CupomDesconto, {
    foreignKey: 'id_cliente',
  })
  public cupom: HasOne<typeof CupomDesconto>

  @hasOne(() => Endereco, {
    foreignKey: 'id_cliente',
  })
  public endereco: HasOne<typeof Endereco>

  @hasMany(() => PedidoItem, {
    foreignKey: 'id_pedido',
  })
  public itens: HasMany<typeof PedidoItem>

  @beforeSave()
  public static async hashNumero(pedido: Pedido) {
    if (pedido.$dirty.numero) {
      pedido.numero = Encryption.encrypt(pedido.numero)
    }
  }
}
