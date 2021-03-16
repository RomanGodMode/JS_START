import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Injectable } from '@nestjs/common/decorators'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class PurifyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map(this.parseLesson))
  }

  private parseLesson(rawLesson: any) {
    const deleteIds = (obj: any) => {
      Object.keys(obj).forEach(key => {
        if (key === '_id' || key === '__v') delete obj[key]
        else if (typeof obj[key] === 'object') deleteIds(obj[key])
      })
      return obj
    }

    return deleteIds(rawLesson)
  }
}
