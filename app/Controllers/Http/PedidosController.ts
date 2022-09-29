import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateValidator from 'App/Validators/Pedidos/CreateValidator'
import ShowValidator from 'App/Validators/Pedidos/ShowValidator'
import DeleteValidator from 'App/Validators/Pedidos/DeleteValidator'
import EditValidator from 'App/Validators/Pedidos/EditValidator'
import Pedido from 'App/Models/Pedido'
import PedidoItem from 'App/Models/PedidoItem'
import Database from '@ioc:Adonis/Lucid/Database'

export default class PedidosController {

  public async total({ response }: HttpContextContract) {
    const [linhasValor] = await Database.rawQuery("select sum(vr_total) as valor_total from pedidos");
    const [linhasResumo] = await Database.rawQuery(
      ` select count(*) as qnt, id_produto, nome 
        from pedidos_itens 
        join produtos on produtos.id = id_produto
        group by id_produto
        order by qnt desc
        limit 1;
    `);

    response.status(200).json({
      pedidos: linhasValor[0],
      produto: linhasResumo?.length != 0? linhasResumo[0] : null
    })
  }

  public async index({ response }: HttpContextContract) {
    const pedidos = await Pedido.query().preload('itens').paginate(1, 100)
    response.status(202).json(pedidos.toJSON())
  }
  public async show({ response, request }: HttpContextContract) {
    const payload = await request.validate(ShowValidator)
    const pedidos = await Pedido.query()
      .where('id', payload.params.id)
      .preload('itens')
      .firstOrFail()
    response.status(202).json(pedidos.toJSON())
  }
  public async edit({ response, request }: HttpContextContract) {
    const payload = await request.validate(EditValidator)
    const ID = payload.params.id
    const pedido = await Pedido.find(ID)

    if (pedido) {
      const items = payload.itens
      const dataInicio = payload.data_inicio
      const dataEntrega = payload.data_entrega
      delete payload.params
      delete payload.itens
      await pedido
        .merge({
          ...payload,
          data_inicio: `${dataInicio.toSQLDate()} 00:00:00`,
          data_entrega: `${dataEntrega.toSQLDate()} 00:00:00`,
        })
        .save()
      await PedidoItem.query().where('id_pedido', ID).delete()
      const resultItens = await pedido.related('itens').createMany(items)
      response.status(202).json({
        ...pedido.toJSON(),
        itens: resultItens,
      })
    } else {
      response.status(404).json({
        message: 'Not found',
      })
    }
  }
  public async destroy({ response, request }: HttpContextContract) {
    const payload = await request.validate(DeleteValidator)
    const pedido = await Pedido.findOrFail(payload.params.id)

    if (pedido) {
      await PedidoItem.query().where('id_pedido', payload.params.id).delete()
      await pedido.delete()
      response.status(200).json({
        status: true,
      })
    } else {
      response.status(404).json({
        message: 'Not found',
      })
    }
  }

  public async create({ response, request }: HttpContextContract) {
    let pedido = new Pedido()
    try {
      const payload = await request.validate(CreateValidator)
      const items = payload.itens
      const dataInicio = payload.data_inicio
      const dataEntrega = payload.data_entrega
      delete payload.itens
      pedido = await Pedido.create({
        ...payload,
        data_inicio: `${dataInicio.toSQLDate()} 00:00:00`,
        data_entrega: `${dataEntrega.toSQLDate()} 00:00:00`,
      })
      if (pedido.$isPersisted) {
        const itensResult = await pedido.related('itens').createMany(items)
        response.status(202).json({
          ...pedido.$attributes,
          itens: itensResult,
        })
      }
    } catch (error) {
      pedido.delete()
      response.badRequest(error.messages)
    }
  }
}
