import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, Matches, Min } from 'class-validator';

export class CreateFreightSimulationDto {
  @ApiProperty({
    example: '89222520',
  })
  @IsString()
  @Matches(/^\d{8}$/, {
    message: 'The ZIP code must be exactly 8 digits and have only numbers.',
  })
  originZipCode: string;

  @ApiProperty({
    example: '89245000',
  })
  @IsString()
  @Matches(/^\d{8}$/, {
    message: 'The ZIP code must be exactly 8 digits and have only numbers.',
  })
  destinationZipCode: string;

  @ApiProperty()
  @IsNumber()
  @Min(0, { message: 'Height must be valid number.' })
  @Type(() => Number)
  height: number;

  @ApiProperty()
  @IsNumber()
  @Min(0, { message: 'Width must be valid number.' })
  @Type(() => Number)
  width: number;

  @ApiProperty()
  @IsNumber()
  @Min(0, { message: 'Length must be valid number.' })
  @Type(() => Number)
  length: number;
}
