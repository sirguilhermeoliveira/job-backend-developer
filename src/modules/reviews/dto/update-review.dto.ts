
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateReviewDto {

  @ApiProperty({
    example: 'Great movie',
    description: `User notes about the movie`,
  })
  @IsString()
  notes: string;


}