import { Injectable } from '@nestjs/common'
import { AdminRepository } from '../../admin/service/admin.repository'
import { JwtService } from '@nestjs/jwt'
import { AdminDocument } from '../../admin/model/admin.schema'
import * as bcrypt from 'bcryptjs'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(private readonly adminRepository: AdminRepository, private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

  //Используется для проверки есть ли такая комбинация login+pass
  async validateAdmin(login: string, pass: string): Promise<any> {
    let candidate = await this.adminRepository.findByLogin(login)
    console.log(candidate)

    if (candidate && (await bcrypt.compare(pass, candidate.password))) {
      const { password, ...secureAdmin } = candidate
      return secureAdmin
    } else {
      return null
    }
  }

  async login(admin: AdminDocument) {
    const payload = { _id: admin._id }
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }

  async registerAdmin(login: string, password: string) {
    const salt: number = +this.configService.get('PASS_SALT')
    const cryptedPassword = await bcrypt.hash(password, salt)
    const newAdmin = await this.adminRepository.trySaveAdmin(login, cryptedPassword)
    return newAdmin
  }
}
