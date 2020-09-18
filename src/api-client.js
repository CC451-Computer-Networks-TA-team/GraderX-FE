import axios from "axios";

function getImportMethod(sheetLink) {

  var parse = require('url-parse')
    , url = parse(sheetLink, true);
  if (url.hostname === "alexuuni-my.sharepoint.com") {
    return "import-ms"

  } else if (url.hostname === "docs.google.com") {
    return "import-google"

  }


}
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

  downloadResults(course, labId) {
    return axios.get(`${GRADERX_API}results?course=${course}&lab=${labId}&type=download`, {
      responseType: 'blob',
    });
  },

  validateSheet(accessToken, sheetLink) {
    return axios.post(`${GRADERX_API}submissions/validate`, {
      accessToken: accessToken,
      sheetLink: sheetLink,
      method: getImportMethod(sheetLink)

    })
  },

  startImporting(accessToken, sheetLink, field, course, lab) {
    const method = getImportMethod(sheetLink)

    return axios.post(`${GRADERX_API}submissions?course=${course}&lab=${lab}&method=${method}&field=${field}`, {
      accessToken: accessToken,
      sheetLink: sheetLink
    })
  },

  startGrading(course, lab) {
    return axios.get(`${GRADERX_API}run_grader?course=${course}&lab=${lab}`)
  },

  getDiffResults(course, lab) {
    return axios.get(`${GRADERX_API}results?course=${course}&lab=${lab}&type=diff`)
  },

  /////////// change endpoints name /////////////////////////////////
  // change: shall go to submission/
  modifySubmissions(course, lab, submissionId, formData) {
    return axios.put(`${GRADERX_API}submission_file?course=${course}&lab=${lab}&submissionId=${submissionId}`,
      formData);
  },

  getFilesList(course, lab, submissionId) {
    return axios.get(`${GRADERX_API}submissions?course=${course}&lab=${lab}&submissionId=${submissionId}`)
  },

  getFile(course, lab, submissionId, fileName){
    return axios.get(`${GRADERX_API}submissions/fetchFile?course=${course}&lab=${lab}
    &submissionId=${submissionId}&fileName=${fileName}`)
  }

};
