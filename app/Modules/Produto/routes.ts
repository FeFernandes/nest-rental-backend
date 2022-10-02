import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/', 'ProdutosController.create')
    Route.get('/', 'ProdutosController.index')
    Route.get('/:id', 'ProdutosController.show')
    Route.delete('/:id', 'ProdutosController.destroy')
    Route.put('/:id', 'ProdutosController.edit')
  }).prefix('/produtos')



  /* Deveria estar em rota separada */
  Route.group(() => {
    Route.post('/', 'ProdutosController.marca_create')
    Route.get('/', 'ProdutosController.marca_index')
    Route.put('/:id', 'ProdutosController.marca_edit')
  }).prefix('/marcas')

}).prefix('api')



export default Route
