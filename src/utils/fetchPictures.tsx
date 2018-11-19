import * as Chance from 'chance';

const RANGE = {
  MIN: 3,
  MAX: 4,
}

const PICSUM_RANDOM_URL = 'https://picsum.photos/400/600/?random';

export default async function generatePictures() {
  const numberOfPictures = randomIntFromInterval();
  return getPictureUrls(numberOfPictures); 
}

function randomIntFromInterval(): number {
    return Math.floor(Math.random()*(RANGE.MAX-RANGE.MIN+1)+RANGE.MIN);
}

async function getPictureUrls(picLimit: number) {
  const urls = [];
  const chance = new Chance(Math.random);
  for (let i = 0; i < picLimit; i++) {
    const response = await fetch(PICSUM_RANDOM_URL);
    urls.push({
      id: i,
      title: chance.sentence({ words: 3 }),
      url: response.url,
      liked: false,
    })
  }
  return urls;
}
