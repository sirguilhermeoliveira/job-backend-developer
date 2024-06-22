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

/*   describe('createReview', () => {
    it('should create a review', async () => {
      const reviewDto: ReviewDto = { movieTitle: 'Vingadores', notes: 'Great movie!' };
      const movieDetails = { year: '2023', imdbRating: '8.5' };
      const createdReview = { title: reviewDto.movieTitle, notes: reviewDto.notes, year: movieDetails.year, imdbRating: movieDetails.imdbRating };

      jest.spyOn(service, 'fetchMovieDetails').mockResolvedValueOnce(movieDetails as never);
      jest.spyOn(reviewRepository, 'findOne').mockResolvedValueOnce(undefined);
      jest.spyOn(reviewRepository, 'create').mockReturnValueOnce(createdReview);
      jest.spyOn(reviewRepository, 'save').mockResolvedValueOnce(createdReview);

      const result = await service.createReview(reviewDto);

      expect(result.title).toEqual(reviewDto.movieTitle);
      expect(result.notes).toEqual(reviewDto.notes);
      expect(result.year).toEqual(movieDetails.year);
      expect(result.imdbRating).toEqual(movieDetails.imdbRating);
    }); */

    it('should throw NotFoundException if review already exists', async () => {
      const reviewDto: ReviewDto = { movieTitle: 'Existing Movie', notes: 'Existing movie review' };
      jest.spyOn(reviewRepository, 'findOne').mockResolvedValueOnce({ title: reviewDto.movieTitle });

      await expect(service.createReview(reviewDto)).rejects.toThrowError(NotFoundException);
    });
  });

