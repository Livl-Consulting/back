import path from 'node:path'
import url from 'node:url'

export default {
  // path: __dirname + "/../", for AdonisJS v5
  mode: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'RUNTIME',
  // Specify the path to the Swagger specification file
  specFilePath: path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '../swagger.json'),
   title: 'ERP - Flux Ventes/Achat', // use info instead
  version: '1.0.0', // use info instead
  description: '', // use info instead
  tagIndex: 2,
  info: {
    title: 'ERP - Flux Ventes/Achat',
    version: '1.0.0',
    description: '',
  },
  snakeCase: true,
  debug: false, // set to true, to get some useful debug output
  ignore: ['/swagger', '/docs'],
  preferredPutPatch: 'PUT', // if PUT/PATCH are provided for the same route, prefer PUT
  common: {
    parameters: {}, // OpenAPI conform parameters that are commonly used
    headers: {}, // OpenAPI conform headers that are commonly used
  },
  showFullPath: false, // the path displayed after endpoint summary
}
