import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ViewModule } from '~server/modules/view/view.module'
import { DummyModule } from '~server/modules/dummy/dummy.module'
import { AdminModule } from '~server/modules/admin/admin.module'
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from "~server/modules/auth/auth.module";
import { LessonsModule } from "~server/modules/lesson/lessons.module";


const environment = process.env.NODE_ENV || 'development'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${environment}`,
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    AdminModule,
    AuthModule,
    LessonsModule,
    DummyModule,
    ViewModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
