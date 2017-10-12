import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TableHeader from '../src/table-header.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('TableHeader', () => {
    it('should render the caption and a sort order marker', () => {
        let wrapper = Enzyme.shallow(<TableHeader caption="Test" sortOrder="ascending" />);
        expect(wrapper.text()).to.equal('Test \u25b4');
    });

    it('should request a sort when clicked', () => {
        let requestSort = sinon.spy();
        let wrapper = Enzyme.shallow(<TableHeader name="test" caption="Test" sortOrder="ascending" requestSort={requestSort} />);
        wrapper.find('th').simulate('click');
        expect(requestSort.called).to.be.true;
        expect(requestSort.calledWith('test')).to.be.true;
    });
});