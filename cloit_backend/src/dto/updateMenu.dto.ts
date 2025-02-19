
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateMenuDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
