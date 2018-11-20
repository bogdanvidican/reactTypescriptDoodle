import * as React from 'react';
import Picture from '../Cards';
interface Props {
  type: string,
  pictures: Picture[],
}

const RatedPics = ({ type, pictures }: Props) => (
  <div>
    <h4>{type} pictures</h4>
    {pictures.map((pic, i) => (
      <div
        key={`picture_${type}_${i}`}
        style={{ textAlign: 'left', marginLeft: '20px' }}
      >
        <div>Id: {pic.id}</div>
        <div>Title: {pic.title}</div>
        {/* <div>URL: {pic.url}</div> */}
        <div
          style={{
            backgroundImage:`url(${pic.url})`,
            height: '50px',
            width: '50px'
          }}
        />
        <br />
      </div>
    ))}
    <hr />
  </div>
)

export default RatedPics;
