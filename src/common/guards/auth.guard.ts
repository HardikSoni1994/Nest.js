import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();

        const token = request.headers['authorization'];

        if (!token) {
            throw new UnauthorizedException('No Token Provided');
        }
        if (token !== 'Bearer mysecrettoken') {
            throw new UnauthorizedException('Invalid token');
        }
        return true;
    }
}