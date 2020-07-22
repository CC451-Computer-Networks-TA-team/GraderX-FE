import React from "react";
import FileUpload, { validateExtension } from '../components/grader/FileUpload';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });



describe('Testing File input', () => {

            let wrapper;

            beforeEach(() => {
                    wrapper = shallow( < FileUpload setFile = {
                            () => {}
                        }
                        />);

                    });


                // Label is created whenever the file is Invalid
                it("should not accept the file", () => {

                    wrapper.find('input').simulate("change", {

                        target: {
                            files: [{ name: 'dummyValue', type: 'unSupported type' }]
                        }
                    });

                    expect(wrapper.find('Label').exists()).toBeTruthy();
                });

                it("should not accept the file", () => {

                    wrapper.find('input').simulate("change", {

                        target: {
                            files: [{ name: 'dummyValue', type: 'application/vnd.rar' }]
                        }
                    });

                    expect(wrapper.find('Label').exists()).toBeFalsy();
                });


            });


        describe('Components Visibilty and Existance', () => {

            it("label should not initially exist", () => {
                const wrapper = shallow( < FileUpload / > );
                expect(wrapper.find('Label').exists()).toBeFalsy();

            });

            it("input should be initially invisible", () => {
                const wrapper = shallow( < FileUpload / > );
                expect(wrapper.find('input').prop('hidden')).toBeTruthy()

            });



        });


        // letterly useless
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
        