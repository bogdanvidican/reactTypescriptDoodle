import * as React from 'react';
import PictureWithThumb from '../Summary';

interface Props {
  type: string,
  pictures: PictureWithThumb[],
}

const RatedPics = ({ type, pictures }: Props) => (
  <div>
    <h4>{type} pictures</h4>
    {pictures.map((pic, i) => (
      <div
        key={`picture_${type}_${i}`}
        style={{ textAlign: 'left', marginLeft: '20px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
      >
        <span><img src={pic.thumb} /></span>
        <span
          style={{ marginLeft: '20px' }}
        >Title: {pic.title}</span>
        <br />
      </div>
    ))}
    <hr />
  </div>
)

export default RatedPics;
