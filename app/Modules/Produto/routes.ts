import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/', 'ProdutosController.create')
    Route.get('/', 'ProdutosController.index')
    Route.get('/:id', 'ProdutosController.show')
    Route.delete('/:id', 'ProdutosController.destroy')
    Route.put('/:id', 'ProdutosController.edit')
  }).prefix('/produtos')
}).prefix('api')
export default Route
