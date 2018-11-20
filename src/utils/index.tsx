import Picture from '../components/Cards';

export const areAllRated = (pics: Picture[]) => {
  return pics.reduce((acc: boolean, pic: Picture) => { return acc && pic.liked !== null }, true)
}

export const getNextPicture = (currentPicture: number, limit: number) => {
  const nextPicture = currentPicture + 1;
  return (nextPicture > limit) ? currentPicture : nextPicture;
}
