import axios from "axios";

const graderx_api = process.env.GRADERX_API
  ? process.env.GRADERX_API
  : "http://localhost:5000/";

export default {
  getLabs() {
    return axios.get(`${graderx_api}labs/cc451`);
  },
  uploadSubmissions(labId, formData) {
    return axios.post(`http://localhost:5000/results/cc451/${labId}`, formData);
  },
  downloadResults(labId) {
    return axios.get(`http://localhost:5000/results/cc451/${labId}`);
  },
  getStatus() {
    return axios.get(`http://localhost:5000/get_status`);
  }
};
