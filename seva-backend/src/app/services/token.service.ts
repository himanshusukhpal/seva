import jwt from 'jsonwebtoken';
import { AuthConfig } from '../config/auth.config';

const authConfig = new AuthConfig()

export class TokenService {

  generateToken (sub: Record<string, any>) {
    return jwt.sign({ ...sub }, authConfig.secret, {
      expiresIn: 86400 // 24 hours
    });
  }
  
}
