import { Module } from '@nestjs/common'
import { AdminRepository } from './service/admin.repository'
import { Admin, AdminSchema } from './model/admin.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
  controllers: [],
  providers: [AdminRepository],
  exports: [AdminRepository]
})
export class AdminModule {}
