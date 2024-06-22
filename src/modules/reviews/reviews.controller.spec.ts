import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { ReviewDto } from './dto/review.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Review } from './entities/review.entity';
import { of } from 'rxjs';

describe('ReviewsController', () => {
  let controller: ReviewsController;
  let service: ReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ReviewsController],
      providers: [
        ReviewsService,
        {
          provide: getRepositoryToken(Review),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            createQueryBuilder: jest.fn(() => ({
              andWhere: jest.fn().mockReturnThis(),
              orderBy: jest.fn().mockReturnThis(),
            })),
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() => of({ data: {} })),
          },
        },
      ],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createReview', () => {
    it('should create a review', async () => {
      const reviewDto: ReviewDto = { movieTitle: 'Vingadores', notes: 'Teste description' };
      const createdReview = { ...reviewDto, year: '2023', imdbRating: '8.5', title: reviewDto.movieTitle };
      
      jest.spyOn(service, 'createReview').mockResolvedValueOnce(createdReview as any);

      const result = await controller.createReview(reviewDto);
      expect(result).toBe(createdReview);
    });
  });
});
