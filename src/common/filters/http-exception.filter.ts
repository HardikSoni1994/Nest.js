import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        const message = typeof exceptionResponse === "string"
        ? exceptionResponse
        : (exceptionResponse as any).message;

        const errorBody = {
            success: false,
            statusCode: status,
            message,
            path: request.url,
            timestamp: new Date().toISOString(),
        };
        this.logger.error(
            `${request.method} ${request.url} - ${status}`,
        );
        response.status(status).json(errorBody);
    }
}