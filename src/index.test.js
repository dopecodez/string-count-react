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

  it('checks if submit works correctly', () => {
    const fakeEvent = { preventDefault: () => console.log('preventDefault') }
    const component = shallow(<Form />);
    component.find('.inputForm').simulate('submit', fakeEvent);
    expect(component.state().submitted).toEqual(true);
  })
});

