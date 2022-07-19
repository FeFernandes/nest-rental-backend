import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.group(() => {
      Route.get('/', 'EnderecosController.estados')
      Route.get('/:id/cidades', 'EnderecosController.estadoCidade')
    }).prefix('/estados')
    Route.post('/:id_entidade', 'EnderecosController.create')
    Route.get('/', 'EnderecosController.index')
    Route.get('/:id', 'EnderecosController.show')
    Route.delete('/:id', 'EnderecosController.destroy')
    Route.put('/:id', 'EnderecosController.edit')
  }).prefix('/enderecos')
}).prefix('api')
export default Route
