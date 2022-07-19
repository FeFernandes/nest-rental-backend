/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import 'App/Modules/Usuario/routes'
import 'App/Modules/Categoria/routes'
import 'App/Modules/RedeSocial/routes'
import 'App/Modules/Produto/routes'
import 'App/Modules/Visita/routes'
import 'App/Modules/Banner/routes'
import 'App/Modules/Endereco/routes'
import 'App/Modules/Pedido/routes'
import 'App/Modules/CupomDesconto/routes'
Route.get('/', async () => {
  return { hello: 'world' }
})
