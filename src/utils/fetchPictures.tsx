import * as Chance from 'chance';
import Picture from '../components/Cards';
import PictureWithThumb from '../components/Summary';

const RANGE = {
  MIN: 4,
  MAX: 10,
}

const PICSUM_RANDOM_URL = 'https://picsum.photos/400/600/?random';
const PICSUM_THUMB_URL = 'https://picsum.photos/50/?image=';

export async function fetchPictures(): Promise<Picture> {
  const numberOfPictures = randomIntFromInterval();
  return getThumbnails(await getPictures(numberOfPictures)); 
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

export async function getThumbnails(pictures: Picture[]): Promise<PictureWithThumb[]> {
  const pics: PictureWithThumb[] = [];
  for(let i = 0; i < pictures.length; i++) {
    const thumb = await fetch(PICSUM_THUMB_URL + getIdFromUrl(pictures[i].url));
    pics.push({ ...pictures[i], thumb: thumb.url });
  }
  return pics;
}
