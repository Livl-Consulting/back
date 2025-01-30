import env from '#start/env'
import type { MeuchEntry } from '../types/meuch_map.js'

export default class MeuchController {

    public async meuch(): Promise<MeuchEntry[]> {
        return [
        {
            key: `${env.get("API_CODE")}_LIST_CLIENT`,
            endpoint: `/api/clients`,
            description: 'Récupère tout les clients',
            type: 'GET',
            routeFormat: null,
            queryParams: null,
            body: null,
            response: null
        }]
    }

}