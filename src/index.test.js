import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { configure , mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Form, OutputTable} from "./index";

let container = null;
configure({ adapter: new Adapter() });
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

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

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe('Unit Tests for Table', () => {
  it('check if table renders correctly' , async () => {
    const mockedCallback = () => Promise.resolve([{
      "name": "I",
      "count": 27
    },
    {
      "name": "a",
      "count": 24
    }]);
    let state = ({
      output:[{
        "name": "I",
        "count": 27
      },
      {
        "name": "a",
        "count": 24
      }],
      isLoading: true
    })
    let promise;
    const getMostOccuringWords = () => {
      promise = Promise.resolve().then(mockedCallback);
      return promise;
    };
    const table = mount(<OutputTable getMostOccuringWords={getMostOccuringWords}/>);
    promise.then(() => {
      table.setState(state);
      table.update();
      expect(table.find('.thisrow').find('tbody').find('tr').length).toEqual(2);
      done();
    });
  })
})

