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

    it("should not accept the file", () => {
        wrapper.find('input').simulate("change", {
            target: {
                files: [{ name: 'dummyValue', type: 'unSupported type' }]
            }
        });

        //<p>Supported files: .rar / .7z / .zip</p>
        expect(wrapper.find('p').length).toEqual(2);
    });

    it("should accept the file", () => {

        wrapper.find('input').simulate("change", {
            target: {
                files: [{ name: 'dummyValue', type: 'application/vnd.rar' }]
            }
        });

        expect(wrapper.find('p').length).toEqual(1);
    });
});

describe('Components Visibilty and Existance', () => {
    it("input should be initially invisible", () => {
        const wrapper = shallow(< FileUpload />);
        expect(wrapper.find('input').prop('hidden')).toBeTruthy()
    });
});

describe('Extension Validation', () => {


    it("should accept the extension", () => {
        let extension = validateExtension("application/zip");
        expect(extension).toBeTruthy();

        extension = validateExtension("application/vnd.rar");
        expect(extension).toBeTruthy();

        extension = validateExtension("application/x-7z-compressed");
        expect(extension).toBeTruthy();

    });

    it("should reject the extension", () => {
        let extension = validateExtension("text/plain");
        expect(extension).toBeFalsy();

        extension = validateExtension("text/x-python");
        expect(extension).toBeFalsy();

        extension = validateExtension("anything");
        expect(extension).toBeFalsy();

    });


});
