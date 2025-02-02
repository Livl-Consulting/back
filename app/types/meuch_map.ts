

export interface MeuchEntry {
    key: string
    endpoint: string
    description: string
    type: 'GET' | 'POST' | 'PUT' | 'DELETE'
    routeFormat: string | null
    queryParams: string[] | null
    body: Record<string, string> | null
    response: Record<string, string> | null
}
