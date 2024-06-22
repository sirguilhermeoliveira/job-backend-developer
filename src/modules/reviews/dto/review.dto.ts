
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReviewDto {

  @ApiProperty({
    example: 'Inception',
    description: `Movie title.`,
  })
  @IsString()
  movieTitle: string;

  @ApiProperty({
    example: 'Great movie',
    description: `User notes about the movie`,
  })
  @IsString()
  notes: string;
}