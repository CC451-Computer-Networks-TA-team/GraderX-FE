import axios from "axios";

const GRADERX_API = process.env.GRADERX_API
  ? process.env.GRADERX_API
  : "http://localhost:5000/";

export default {
  getLabs() {
    return axios.get(`${GRADERX_API}labs/cc451`);
  },

  uploadSubmissions(labId, formData) {
    return axios.post(`${GRADERX_API}results/cc451/${labId}`, formData);
  },

  downloadResults(labId) {
    return axios.get(`${GRADERX_API}results/cc451/${labId}`);
  },

  validateSheet(accessToken, sheetLink) {
    return axios.post(`${GRADERX_API}submissions/validate`, {
      accessToken: accessToken,
      sheetLink: sheetLink
    })
  },

  startImporting(accessToken, sheetLink, field, lab) {
    return axios.post(`${GRADERX_API}submissions/cc451/${lab}?field=${field}`, {
      accessToken: accessToken,
      sheetLink: sheetLink
    })
  },

  startGrading(lab) {
    return axios.get(`${GRADERX_API}grader/cc451/${lab}`)
  }
};
