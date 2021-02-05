import { ConflictException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Admin, AdminDocument } from '../model/admin.schema'
import { Model } from 'mongoose'

@Injectable()
export class AdminRepository {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>
  ) {}

  async findByLogin(login: string): Promise<AdminDocument> {
    return this.adminModel.findOne({ login })
  }

  async findById(id: any): Promise<AdminDocument> {
    return this.adminModel.findById(id)
  }

  async trySaveAdmin(login: string, password: string): Promise<AdminDocument> {
    if (await this.findByLogin(login)) {
      throw new ConflictException()
    }
    const admin = await new this.adminModel({ login, password })
    return admin.save()
  }
}
