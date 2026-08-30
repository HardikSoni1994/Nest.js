import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBlogDto {

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    content!: string;

    @IsString()
    @IsNotEmpty()
    author!: string;

    @IsArray()
    @IsString({ each: true})
    @IsOptional()
    tags?: string[];

    @IsBoolean()
    @IsOptional()
    published?: boolean;
}
