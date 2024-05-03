import { PrismaClient } from "@prisma/client";

export class PrismaWrapper {
    private _client: PrismaClient; 
    constructor(client: PrismaClient) {
      this._client = client
    }
  
    // get the client
    getClient(): PrismaClient {
      return this._client;
    }
  }
  