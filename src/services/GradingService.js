
import request from '../request'

function getImportMethod(sheetLink) {

    var parse = require('url-parse')
        , url = parse(sheetLink, true);
    if (url.hostname === "alexuuni-my.sharepoint.com") {
        return "import-ms"

    } else if (url.hostname === "docs.google.com") {
        return "import-google"
    }
}

function getLabs(course) {
    return request({
        url: `courses/${course}/labs`,
        method: 'GET',
    });
}

function getCourses() {
    return request({
        url: `courses`,
        method: 'GET',
    });
}


function uploadSubmissions(course, lab, formData) {

    return request({
        url: `submissions?course=${course}&lab=${lab}&method=file`,
        method: 'POST',
        data: formData

    });
}


function downloadResults(course, lab) {
    return request({
        url: `results?course=${course}&lab=${lab}&type=download`,
        method: 'GET',
        responseType: 'blob'
    });
}

function validateSheet(accessToken, sheetLink) {
    return request({
        url: `submissions/validate`,
        method: 'POST',
        data: {
            accessToken: accessToken,
            sheetLink: sheetLink,
            method: getImportMethod(sheetLink)
        }
    });
}

function startImporting(accessToken, sheetLink, field, course, lab) {
    const method = getImportMethod(sheetLink)
    return request({
        url: `submissions?course=${course}&lab=${lab}&method=${method}&field=${field}`,
        method: 'POST',
        data: {
            accessToken: accessToken,
            sheetLink: sheetLink
        }
    });
}

function startGrading(course, lab) {
    return request({
        url: `run_grader?course=${course}&lab=${lab}`,
        method: 'GET'
    });
}

function getDiffResults(course, lab) {
    return request({
        url: `results?course=${course}&lab=${lab}&type=diff`,
        method: 'GET'
    });
}


const GradingService = {
    getDiffResults, startGrading, startImporting, validateSheet, downloadResults, uploadSubmissions, getCourses, getLabs
}

export default GradingService;
