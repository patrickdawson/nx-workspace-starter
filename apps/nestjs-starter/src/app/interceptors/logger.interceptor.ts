import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private logger: Logger) {
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    return next.handle().pipe(
      tap(res => this.logger.log(`Request-Url: ${request.url}, Body: ${JSON.stringify(res)}`))
    );
  }
}
