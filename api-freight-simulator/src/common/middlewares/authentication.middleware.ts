import * as admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  public async use(request: Request, _response: Response, next: NextFunction) {
    const token = request.headers['authorization'];
    const customerUid = request.headers['x-customer-uid'] as string;

    if (!token || !customerUid) {
      console.error('Missing token or customer id');
      throw new UnauthorizedException();
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const uid = decodedToken.uid;

      if (uid !== customerUid) {
        console.error(`Invalid token for customer: ${customerUid}`);
        throw new UnauthorizedException();
      }

      next();
    } catch (error) {
      console.error('Error to verify token:', error);
      throw new UnauthorizedException();
    }
  }
}
