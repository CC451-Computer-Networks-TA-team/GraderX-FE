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

  getCourses(onlySTDOUT = false) {
    return axios.get(`${GRADERX_API}courses${onlySTDOUT ? '?STDOUT' : ''}`);
  },

  getCourseEdit(couseName) {
    return axios.get(`${GRADERX_API}courses/${couseName}/edit`);
  },

  deleteCourse(couseName) {
    return axios.delete(`${GRADERX_API}courses/${couseName}`);
  },

  updateCourse(course, oldCourseName) {
    return axios.put(`${GRADERX_API}courses/${oldCourseName}`, course);
  },

  addCourse(course) {
    return axios.post(`${GRADERX_API}course`, course);
  },
  addLab(course, formData){
    return axios.post(`${GRADERX_API}courses/${course}/labs`, formData)
  },
  editLab(course, lab_id, runtime, internet, test_cases){
    return axios.put(`${GRADERX_API}courses/${course}/labs/${lab_id}`, {name: lab_id, runtime_limit: runtime, disable_internet: !internet, test_cases})
  },
  deleteLab(course, lab){
    return axios.delete(`${GRADERX_API}courses/${course}/labs/${lab}`)
  },
    
  uploadSubmissions(course, labId, formData) {
    return axios.post(`${GRADERX_API}submissions?course=${course}&lab=${labId}&method=file`, formData);
  },

  downloadResults(course, labId, submission_key) {
    return axios.get(`${GRADERX_API}results?course=${course}&lab=${labId}&type=download&key=${submission_key}`, {
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

  startGrading(course, lab, submission_key) {
    return axios.get(`${GRADERX_API}run_grader?course=${course}&lab=${lab}&key=${submission_key}`)
  },

  getDiffResults(course, lab, submission_key) {
    return axios.get(`${GRADERX_API}results?course=${course}&lab=${lab}&type=diff&key=${submission_key}`)
  },

 
  modifySubmissions(course, lab, submissionId, formData, submission_key) {
    return axios.put(`${GRADERX_API}submissions?course=${course}&lab=${lab}&submission_id=${submissionId}&key=${submission_key}`,
      formData);
  },

  getFilesList(course, lab, submissionId, submission_key) {
    return axios.get(`${GRADERX_API}submissions?course=${course}&lab=${lab}&submission_id=${submissionId}&key=${submission_key}`)
  },

  getFile(course, lab, submissionId, fileName, submission_key){
    return axios.get(`${GRADERX_API}submission_file?course=${course}&lab=${lab}&submission_id=${submissionId}&file_name=${fileName}&key=${submission_key}`)
  },

  getSubmissionFilesList(course,lab, submission_key){
    return axios.get(`${GRADERX_API}/submissions?course=${course}&lab=${lab}&key=${submission_key}`)
  }
};
