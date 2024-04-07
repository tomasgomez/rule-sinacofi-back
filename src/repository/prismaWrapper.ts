import { PrismaClient } from "@prisma/client";

export class PrismaWrapper {
    private _client: PrismaClient; 
    constructor(client: PrismaClient) {
      this._client = client
    }
  
    // conect to the database
    async connect(): Promise<void> {}

    // disconnect from the database
    async disconnect(): Promise<void> {
      this._client.$disconnect
    }
  
    // check the connection
    async checkConnection(): Promise<void>{}
  
    // get the client
    getClient(): PrismaClient {
      return this._client;
    }
  }
  