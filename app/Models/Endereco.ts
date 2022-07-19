import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Cidade from 'App/Models/Cidade'

export default class Endereco extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_cidade: number

  @column()
  public cep: string

  @column()
  public bairro: string

  @column()
  public complemento: string | null

  @column()
  public rua: string

  @column()
  public numero: string

  @column()
  public contato: string | null

  @column()
  public telefone: string | null

  @column()
  public email: string | null

  @column()
  public nome_obra: string | null

  @hasOne(() => Cidade, {
    foreignKey: 'id_cidade',
  })
  public Cidade: HasOne<typeof Cidade>
}
