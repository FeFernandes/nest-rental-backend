import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCategoriaValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    descricao: schema.string(),
    data_inicio: schema.date({
      format: 'sql',
    }),
    data_entrega: schema.date({
      format: 'sql',
    }),
    id_endereco: schema.number.nullableAndOptional(),
    id_cupom_desconto: schema.number.nullableAndOptional(),
    id_cliente: schema.number.nullableAndOptional(),
    id_usuario: schema.number(),
    vr_total: schema.number(),
    itens: schema.array().members(
      schema.object().members({
        id_produto: schema.number(),
        valor: schema.number(),
        vr_desconto: schema.number(),
        quantidade: schema.number(),
      })
    ),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {}
}
