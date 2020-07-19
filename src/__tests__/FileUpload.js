import React, { useState } from "react";
import FileUpload from '../components/grader/FileUpload';
import renderer from 'react-test-renderer';


test('Dummy Test', () => {
  const component = renderer.create(<FileUpload/>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  
});