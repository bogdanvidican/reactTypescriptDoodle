import * as React from 'react';
import { shallow } from 'enzyme';
import { Summary, Props } from './Summary';
import { Button } from '@material-ui/core';

const props: Props = {
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
  restart: jest.fn(),
};

let wrapper: any;
let button: any;

beforeAll(() => {
  wrapper = shallow(<Summary {...props} />);
  button = wrapper.find(Button);
})

describe('<Summary />', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })
  it('should render a restart button', () => {
    expect(button).toBeTruthy();
  })
  it('should trigger callback on button click', () => {
    button.simulate('click');
    expect(props.restart).toHaveBeenCalled();
  });
});
