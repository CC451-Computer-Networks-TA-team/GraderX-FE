import axios from "axios";

const GRADERX_API = process.env.GRADERX_API
  ? process.env.GRADERX_API
  : "http://localhost:5000/";

export default {
  getLabs(course) {
    return axios.get(`${GRADERX_API}courses/${course}/labs`);
  },

  getCourses() {
    return axios.get(`${GRADERX_API}courses`);
  },

  uploadSubmissions(course, labId, formData) {
    return axios.post(`${GRADERX_API}submissions?course=${course}&lab=${labId}&method=file`, formData);
  },
  uploadSubmissionsMoss(formData) {
    return axios.post(`${GRADERX_API}submissions?course=cc451&lab=lab3&method=file-moss`, formData);
  },
  downloadResults(course, labId) {
    return axios.get(`${GRADERX_API}results?course=${course}&lab=${labId}&type=download`, {
      responseType: 'blob',
    });
  },

  validateSheet(accessToken, sheetLink) {
    return axios.post(`${GRADERX_API}submissions/validate`, {
      accessToken: accessToken,
      sheetLink: sheetLink
    })
  },

  startImporting(accessToken, sheetLink, field, course, lab) {
    return axios.post(`${GRADERX_API}submissions?course=${course}&lab=${lab}&method=import-google&field=${field}`, {
      accessToken: accessToken,
      sheetLink: sheetLink
    })
  },

  startGrading(course, lab) {
    return axios.get(`${GRADERX_API}run_grader?course=${course}&lab=${lab}`)
  },

  runMoss(course, lab){
    return axios.get(`${GRADERX_API}moss?course=${course}&lab=${lab}`)
  }
};
