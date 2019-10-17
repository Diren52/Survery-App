const APIURL = '/api/survey';

export async function getSurveys(){
    return fetch(APIURL) /* global fetch*/ //add proxy at package.json so this refers to :8081/api/surveys
    .then(resp => {
        if (!resp.ok){
            if (resp.status >= 400 && resp.status < 500){
                return resp.json().then(data => {
                    let err = {errorMessage: data.message};
                    throw err;
                })
            }else {
                let err = {errorMessage: 'Please try again later. Server is not responding.'};
                throw err;
            }
    }
    return resp.json()
    })
}

export async function createSurvey(val){
    return fetch(APIURL, {
        method: 'post',
        headers: new Headers({/*global Headers*/
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(val)
    })/* global fetch*///add proxy at package.json so this refers to :8081/api/surveys
    .then(resp => {
        if (!resp.ok){
            if (resp.status >= 400 && resp.status < 500){
                return resp.json().then(data => {
                    let err = {errorMessage: data.message+'in !resp.ok'};
                    throw err;
                })
            }else {
                let err = {errorMessage: 'Please try again later. Server is not responding.'};
                throw err;
            }
        }
        return resp.json();
    })    
}

export async function removeSurvey(id){
    const deleteURL = APIURL + id;
    return fetch(deleteURL, {
        method: 'delete'
    })/* global fetch*///add proxy at package.json so this refers to :8081/api/surveys
    .then(resp => {
        if (!resp.ok){
            if (resp.status >= 400 && resp.status < 500){
                return resp.json().then(data => {
                    let err = {errorMessage: data.message};
                    throw err;
                })
            }else {
                let err = {errorMessage: 'Please try again later. Server is not responding.'};
                throw err;
            }
        }
        return resp.json()
    })
}

export async function updateSurvey(survey){
    const updateURL = APIURL + survey._id;
    return fetch(updateURL, {
        method: 'put',
        headers: new Headers({/*global Headers*/
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({completed: !survey.completed})
    })/* global fetch*///add proxy at package.json so this refers to :8081/api/surveys
    .then(resp => {
        if (!resp.ok){
           if (resp.status >= 400 && resp.status < 500){
                return resp.json().then(data => {
                    let err = {errorMessage: data.message};
                    throw err;
                })
            }else {
                let err = {errorMessage: 'Please try again later. Server is not responding.'};
                throw err;
            }
        }
        return resp.json()
    })    
}