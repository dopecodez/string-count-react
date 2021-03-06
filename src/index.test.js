import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Form, OutputTable} from "./index";

configure({ adapter: new Adapter() });

describe('Unit Tests for Form', () => {
  it("check if url is set correctly", () => {
    const form = shallow(<Form />);
    const input = form.find('.urlBox');
    expect(input.props().value).toEqual('https://terriblytinytales.com/test.txt');
  })

  it("checks if number changes correctly", () => {
    const form = shallow(<Form />);
    const input = form.find('.numberBox');
    input.simulate('change', { target: { value: 5 } })
    expect(form.state().number).toEqual(5);
  })
});

describe('Unit Tests for Table', () => {
  it('check if table renders correctly' , async (done) => {
    const mockedCallback = () => Promise.resolve([{ //mocking success for the api call
      "name": "I",
      "count": 27
    },
    {
      "name": "a",
      "count": 24
    }]);
    let promise;
    const getMostOccuringWords = () => { //mocking the api
      promise = Promise.resolve().then(mockedCallback);
      return promise;
    };
    const table = shallow(<OutputTable getMostOccuringWords={getMostOccuringWords}/>);
    promise.then(() => {
      table.update();
      expect(table.find('.outTable').find('tbody').find('tr').length).toEqual(3);
      done();
    })
  })
})

