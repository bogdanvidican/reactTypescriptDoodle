import * as Chance from 'chance';
import Picture from '../components/Cards';

const RANGE = {
  MIN: 3,
  MAX: 4,
}

const PICSUM_RANDOM_URL = 'https://picsum.photos/400/600/?random';
const PICSUM_THUMB_URL = 'https://picsum.photos/50/?image=';

export async function fetchPictures(): Promise<Picture> {
  const numberOfPictures = randomIntFromInterval();
  return getPictures(numberOfPictures); 
}

function randomIntFromInterval(): number {
    return Math.floor(Math.random()*(RANGE.MAX-RANGE.MIN+1)+RANGE.MIN);
}

async function getPictures(picLimit: number): Promise<Picture> {
  const pictures = [];
  const chance = new Chance(Math.random);
  for (let i = 0; i < picLimit; i++) {
    const response = await fetch(PICSUM_RANDOM_URL);
    pictures.push({
      id: i,
      title: chance.sentence({ words: 3 }),
      url: response.url,
      liked: null,
    })
  }
  return pictures;
}

function getIdFromUrl(url: string): string {
  return url.split('?image=')[1];
}

export async function getThumbnails(urls: string[]): Promise<string[]> {
  const thumbs: string[] = [];
  for(let i = 0; i < urls.length; i++) {
    const thumb = await fetch(PICSUM_THUMB_URL + getIdFromUrl(urls[i]));
    thumbs.push(thumb.url);
  }
  return thumbs;
}
