import React from "react";
import Grader from '../components/grader/Grader';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('Components Visibilty', () => {

    it("LabSelector is the only visible component", () => {
        const wrapper = shallow(< Grader />);
        expect(wrapper.find('FileUpload').exists()).toBeFalsy();
        expect(wrapper.find('DownloadResult').exists()).toBeFalsy();
        expect(wrapper.find('Status').exists()).toBeFalsy();
        expect(wrapper.find('LabSelector').exists()).toBeTruthy();


    });



});
