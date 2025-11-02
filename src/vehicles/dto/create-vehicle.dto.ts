import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  brand!: string;

  @IsString()
  model!: string;

  @IsNumber()
  year!: number;

  @IsString()
  color!: string;

  @IsPositive()
  price!: number;
}
