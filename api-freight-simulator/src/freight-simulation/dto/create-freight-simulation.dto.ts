import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Matches, Min } from 'class-validator';

export class CreateFreightSimulationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({
    example: '89222520',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{8}$/, {
    message: 'The ZIP code must be exactly 8 digits and have only numbers.',
  })
  originZipCode: string;

  @ApiProperty({
    example: '89245000',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{8}$/, {
    message: 'The ZIP code must be exactly 8 digits and have only numbers.',
  })
  destinationZipCode: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Height must be valid number.' })
  height: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Width must be valid number.' })
  width: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Length must be valid number.' })
  length: number;
}
