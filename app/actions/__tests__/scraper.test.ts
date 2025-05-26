import { scrapeSite } from '../scraper';
import { extract } from '@extractus/article-extractor';

jest.mock('@extractus/article-extractor');

const mockedExtract = extract as jest.MockedFunction<typeof extract>;

describe('scrapeSite', () => {
  it('returns parsed article fields', async () => {
    mockedExtract.mockResolvedValue({
      title: 'Hello',
      content: '<p>world</p>',
      image: 'img.jpg',
    } as any);

    const result = await scrapeSite('https://example.com');
    expect(result).toEqual({ title: 'Hello', content: '<p>world</p>', cover: 'img.jpg' });
    expect(mockedExtract).toHaveBeenCalledWith('https://example.com');
  });
});
