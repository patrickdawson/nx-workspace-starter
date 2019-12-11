import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets';
import * as SocketIO from 'socket.io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FlightNewsService } from './flight-news.service';

@WebSocketGateway()
export class FlightNewsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: SocketIO.Server;

  constructor(private readonly flightNewsService: FlightNewsService) { }

  // This is the init Lifecycle hook
  afterInit(server: SocketIO.Server): any { }

  // This Lifecycle hook is invoked when a new client connects
  handleConnection(client: SocketIO.Socket, ...args: any[]): any { }

  // This Lifecycle hook is invoked when a connected client disconnects
  handleDisconnect(client: SocketIO.Socket): any { }

  @SubscribeMessage('flightNews')
  getLatestFlightNews(): Observable<WsResponse<string>> {
    return this.flightNewsService.getFlightNews().pipe(
      map(flightNews => ({event: 'flightNews', data: flightNews}))
    );
  }

  pushLatestFlightNews() {
    this.flightNewsService.getFlightNews().subscribe((news: string) => {
      this.server.emit('flightNews', news);
    });
  }
}
