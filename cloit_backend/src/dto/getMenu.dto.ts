import { IsInt, IsOptional, Min } from "class-validator";

export class GetMenuDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  depth?: number;
}
