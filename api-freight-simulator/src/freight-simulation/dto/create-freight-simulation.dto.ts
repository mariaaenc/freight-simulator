import { Type } from 'class-transformer';
import { IsNumber, IsString, Matches, Min } from 'class-validator';

export class CreateFreightSimulationDto {
  @IsString()
  @Matches(/^\d{8}$/, {
    message: 'The ZIP code must be exactly 8 digits and have only numbers.',
  })
  originZipCode: string;

  @IsString()
  @Matches(/^\d{8}$/, {
    message: 'The ZIP code must be exactly 8 digits and have only numbers.',
  })
  destinationZipCode: string;

  @IsNumber()
  @Min(0, { message: 'Height must be valid number.' })
  @Type(() => Number)
  height: number;

  @IsNumber()
  @Min(0, { message: 'Width must be valid number.' })
  @Type(() => Number)
  width: number;

  @IsNumber()
  @Min(0, { message: 'Length must be valid number.' })
  @Type(() => Number)
  length: number;
}
