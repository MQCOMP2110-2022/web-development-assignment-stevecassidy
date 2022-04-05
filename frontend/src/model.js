
// global variable holding the list of jobs
let DATA = {
    jobs: [],
    companies: []
}

export const getJobs = () => {
    return DATA.jobs
}

export const getJob = (id) => {
    for(let i=0; i<DATA.jobs.length; i++) {
        const job = DATA.jobs[i] 
        if (job.id == id) {
            return job
        }
    }
    return null
}

export const getCompany = (id) => {
    for(let i=0; i<DATA.companies.length; i++) {
        const company = DATA.companies[i] 
        if (company.id == id) {
            return company
        }
    }
    return null
}

export const getCompanyJobs = (id) => {
    const result = []
    for(let i=0; i<DATA.jobs.length; i++) {
        const job = DATA.jobs[i] 
        if (job.attributes.company.data.id == id) {
            result.push(job)
        }
    }

    return result
}

export const loadData = (router) => {
    //const url = 'http://localhost:1337/api/jobs?populate=company'
    const url = '/sample-data.json'

    console.log("Loading data...")
    fetch(url) 
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        DATA = data
        console.log("DATA", data)
        router.route()
    })
    .catch(() => {
        // if there's an error loading then just call the router
        // to render a page
        router.route()
    })
}