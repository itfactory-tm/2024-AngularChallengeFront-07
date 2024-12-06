import { TestBed } from '@angular/core/testing';
import { ArticleService } from './article.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Article } from '../interfaces/article';
import { environment } from '../../environments/environment';

describe('ArticleService', () => {
  let service: ArticleService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.api_url}/Articles`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleService],
    });
    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all articles', () => {
    const dummyArticles: Article[] = [
      {
        articleId: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
        title: 'Article 1',
        description: 'Description of Article 1',
        date: new Date('2024-01-01'),
        editionId: 'ed1',
        editionName: 'Edition 1',
      },
      {
        articleId: 'b2c3d4e5-f6g7h8i9-j0k1l2m3n4o5p6q7',
        title: 'Article 2',
        description: 'Description of Article 2',
        date: new Date('2024-02-01'),
        editionId: 'ed2',
        editionName: 'Edition 2',
      }
    ];

    service.getArticles().subscribe((articles) => {
      expect(articles.length).toBe(2);
      expect(articles).toEqual(dummyArticles);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyArticles);
  });

  it('should fetch a single article by GUID articleId', () => {
    const dummyArticle: Article = {
      articleId: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
      title: 'Article 1',
      description: 'Description of Article 1',
      date: new Date('2024-01-01'),
      editionId: 'ed1',
      editionName: 'Edition 1',
    };

    service.getArticleById('a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6').subscribe((article) => {
      expect(article).toEqual(dummyArticle);
    });

    const req = httpMock.expectOne(`${apiUrl}/a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyArticle);
  });

  it('should create a new article', () => {
    const newArticle: Article = {
      articleId: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
      title: 'New Article',
      description: 'Description of the new article',
      date: new Date('2024-03-01'),
      editionId: 'ed3',
      editionName: 'Edition 3',
    };

    service.postArticle(newArticle).subscribe((article) => {
      expect(article).toEqual(newArticle);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newArticle);
    req.flush(newArticle);
  });

  it('should update an existing article by GUID articleId', () => {
    const updatedArticle: Article = {
      articleId: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
      title: 'Updated Article',
      description: 'Updated description of the article',
      date: new Date('2024-04-01'),
      editionId: 'ed1',
      editionName: 'Updated Edition 1',
    };

    service.putArticle('a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6', updatedArticle).subscribe((article) => {
      expect(article).toEqual(updatedArticle);
    });

    const req = httpMock.expectOne(`${apiUrl}/a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedArticle);
    req.flush(updatedArticle);
  });
});
