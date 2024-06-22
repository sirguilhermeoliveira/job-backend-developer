import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { ReviewDto } from './dto/review.dto';

describe('ReviewsService', () => {
  let service: ReviewsService;
  let reviewRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ReviewsService>(ReviewsService);
    reviewRepository = module.get(getRepositoryToken(Review));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

    it('should throw NotFoundException if review already exists', async () => {
      const reviewDto: ReviewDto = { movieTitle: 'Existing Movie', notes: 'Existing movie review' };
      jest.spyOn(reviewRepository, 'findOne').mockResolvedValueOnce({ title: reviewDto.movieTitle });

      await expect(service.createReview(reviewDto)).rejects.toThrowError(NotFoundException);
    });
  });

