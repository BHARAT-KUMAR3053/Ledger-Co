import { Server } from '@ledger-co/server';

class Application {
  public initialize(): void {
    const server: Server = new Server();
    server.start();
  }
}

const application: Application = new Application();
application.initialize();
