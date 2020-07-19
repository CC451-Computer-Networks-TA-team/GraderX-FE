import React, { useState } from "react";
import apiClient from "../api-client";
//import {render, cleanup} from 'react-testing-library'
import FileUpload from '../components/grader/FileUpload';
import renderer from 'react-test-renderer';


test('Dummy Test', () => {
  const component = renderer.create(<FileUpload/>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  
});