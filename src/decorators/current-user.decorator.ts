import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // In real app this comes from JWT token (Phase 4)
    // For now we simulate it
    return request.user ?? { id: 0, name: "Guest" };
  },
);
