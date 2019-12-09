import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AirportGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = context.switchToRpc().getData();
    console.log('token', context.switchToRpc())
    if (token === 'TOKEN') {
      return true;
    }
    throw new RpcException('FORBIDDEN');
  }
}
