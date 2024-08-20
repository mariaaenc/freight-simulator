import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import { AuthenticationMiddleware } from '../authentication.middleware';
import { verifyIdTokenMock } from '../mocks/firebase-admin';

describe('AuthenticationMiddleware', () => {
  let middleware: AuthenticationMiddleware;
  let request: Request;
  let response: Response;
  let next: NextFunction;
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

  beforeEach(() => {
    middleware = new AuthenticationMiddleware();
    request = {} as Request;
    response = {} as Response;
    next = jest.fn();
  });

  it('should call next function when token and customer uid are valid', async () => {
    request.headers = {
      authorization: 'fake-token',
      'x-customer-uid': 'customerId',
    };

    verifyIdTokenMock.mockResolvedValueOnce({
      uid: 'customerId',
    } as any);

    await middleware.use(request, response, next);

    expect(next).toHaveBeenCalled();
    expect(verifyIdTokenMock).toHaveBeenCalledWith('fake-token');
  });

  it('should throw UnauthorizedException if token or customer uid is missing', async () => {
    request.headers = {
      authorization: 'fake-token',
      'x-customer-uid': '',
    };

    await expect(middleware.use(request, response, next)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Missing token or customer id',
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedException if token is invalid or does not match customer uid', async () => {
    request.headers = {
      authorization: 'invalid-token',
      'x-customer-uid': 'customerId',
    };

    verifyIdTokenMock.mockResolvedValueOnce({
      uid: 'differentId',
    } as any);

    await expect(middleware.use(request, response, next)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Invalid token for customer: customerId',
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedException if Firebase Admin SDK throws an error', async () => {
    request.headers = {
      authorization: 'fake-token',
      'x-customer-uid': 'customerId',
    };

    verifyIdTokenMock.mockRejectedValue(new Error('error'));

    await expect(middleware.use(request, response, next)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(next).not.toHaveBeenCalled();
  });
});
