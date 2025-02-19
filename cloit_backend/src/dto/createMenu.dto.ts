
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreateMenuDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  parentName?: string;

  @IsInt()
  @Min(0)
  depth: number;
}
