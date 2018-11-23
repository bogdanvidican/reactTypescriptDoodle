import * as React from 'react';
import { shallow } from 'enzyme';
import { PicGridComponent } from './PicGrid';
import { Thumbnail } from '../Thumbnail';
import { InnerProps } from './PicGrid';

let wrapper: any;
const props: InnerProps = {
    type: 'liked',
    pictures: [
      {
        url: 'https://some.test.url_1',
        thumb: 'https://some.test.thumb_1',
        title: 'some test title_1',
      },
      {
        url: 'https://some.test.url_1',
        thumb: 'https://some.test.thumb_1',
        title: 'some test title_1',
      },
      {
        url: 'https://some.test.url_2',
        thumb: 'https://some.test.thumb_2',
        title: 'some test title_2',
      },
      {
        url: 'https://some.test.url_3',
        thumb: 'https://some.test.thumb_3',
        title: 'some test title_3',
      },{
        url: 'https://some.test.url_4',
        thumb: 'https://some.test.thumb_4',
        title: 'some test title_4',
      }
    ],
    classes: {
      root: 'root',
      gridList: 'gridList',
      title: 'title',
    }
};

beforeEach(() => {
  wrapper = shallow(<PicGridComponent {...props} />);
});

describe('<PicGrid />', () => {
  const nrOfPics = props.pictures.length;
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it(`should render component <Thumbnail /> ${nrOfPics} times`, () => {
    const thumbs = wrapper.find(Thumbnail).getElements();
    expect(thumbs).toHaveLength(nrOfPics);
  });
});
