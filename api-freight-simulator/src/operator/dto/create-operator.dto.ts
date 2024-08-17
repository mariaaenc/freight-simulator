import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  IsEnum,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum OperatorDistanceRange {
  LESS_THAN_OR_EQUAL_TO_ONE_HUNDRED = 'less_than_or_equal_to_one_hundred',
  LESS_THAN_OR_EQUAL_TO_FIVE_HUNDRED = 'less_than_or_equal_to_five_hundred',
  OTHER_VALUE = 'other_value',
}

export class FreightInformation {
  @ApiProperty()
  @IsEnum(OperatorDistanceRange)
  @IsNotEmpty()
  distance: OperatorDistanceRange;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  multiplesOfDistance: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  deliveryTime: number;
}

export class CreateOperatorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  divisor: number;

  @ApiProperty({ type: [FreightInformation] })
  @ValidateNested({ each: true })
  @Type(() => FreightInformation)
  @ArrayNotEmpty()
  freightInformation: FreightInformation[];
}
