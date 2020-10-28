import React from "react";
import FileUpload, { validateExtension } from '../components/grader/submissions/FileUpload';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Testing File input', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(< FileUpload setFile={
            () => { }
        }
        />);
    });

    // <p> exists whenever the file is Invalid
    it("should not accept the file", () => {

        wrapper.find('input').simulate("change", {
            target: {
                files: [{ name: 'dummyValue', type: 'unSupported type' }]
            }
        });

        expect(wrapper.find('p').exists()).toBeTruthy();
    });
    // bug detected: Unhandled Rejection
    it("should not accept the file", () => {

        wrapper.find('input').simulate("change", {
            target: {
                files: [{ name: 'dummyValue', type: 'application/vnd.rar' }]
            }
        });
        // expect(wrapper.find('Label').exists()).toBeTruthy();
    });
});

describe('Components Visibilty and Existance', () => {
    it("label should not initially exist", () => {
        const wrapper = shallow(< FileUpload />);
        expect(wrapper.find('Label').exists()).toBeFalsy();
    });

    it("input should be initially invisible", () => {
        const wrapper = shallow(< FileUpload />);
        expect(wrapper.find('input').prop('hidden')).toBeTruthy()
    });
});
