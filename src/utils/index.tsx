import Picture from '../components/Cards';

export const areAllRated = (pics: Picture[]) => pics.reduce(
  (acc: boolean, pic: Picture) => acc && (pic.liked !== null),
  true
)
