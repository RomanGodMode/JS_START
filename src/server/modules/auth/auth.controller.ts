import { Body, Controller, Get, Param, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './service/auth.service'
import { AdminRepository } from '../admin/service/admin.repository'
import { AdminAuthCredentialsDto } from './dto/adminAuthCredentials.dto'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly adminRepository: AdminRepository) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('register')
  async registerAdmin(@Body() adminAuthCredentialsDto: AdminAuthCredentialsDto) {
    const { login, password } = adminAuthCredentialsDto
    return await this.authService.registerAdmin(login, password)
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  getToken(@Request() req) {
    return this.authService.login(req.user._doc)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  async refreshToken(@Request() req) {
    const admin = await this.adminRepository.findById(req.user._id)
    return this.authService.login(admin)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getMyData(@Request() req) {
    return 'О так это же ты!'
  }

}
