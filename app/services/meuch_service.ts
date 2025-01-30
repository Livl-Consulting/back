import env from '#start/env'

import axios from "axios";

export class MeuchService {
  public async registerToMiddleware() {
    const client = axios.create({ baseURL: env.get("KEPI_MIDDLEWARE_URL") });

    await client.post("/register", {
      url: env.get("API_URL"),
      appKey: env.get("API_CODE"),
    });
  }
}