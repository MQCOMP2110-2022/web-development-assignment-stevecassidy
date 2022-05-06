import { Auth } from "./service.js"


export const Model = {
    BASE_URL: 'http://localhost:1337/api/',

    DATA: {
        jobs: [],
        companies: [],
        searchResult: [],
        searchTerm: '',
        applications: []
    },

    getJobs: function() {
        return this.DATA.jobs
    },

    getJob: function(id) {
        for(let i=0; i<this.DATA.jobs.length; i++) {
            const job = this.DATA.jobs[i] 
            if (job.id == id) {
                return job
            }
        }
        return null
    },

    getCompany: function(id) {
        for(let i=0; i<this.DATA.companies.length; i++) {
            const company = this.DATA.companies[i] 
            if (company.id == id) {
                return company
            }
        }
        return null
    },

    getCompanyJobs: function(id) {
        console.log("GetCompanyJobs", id)
        const result = []
        for(let i=0; i<this.DATA.jobs.length; i++) {
            const job = this.DATA.jobs[i]
            if (job.attributes.company.data) {
                console.log("CD", job.attributes.company.data.id)
            }
            if (job.attributes.company.data && job.attributes.company.data.id == id) {
                console.log("yes", job)
                result.push(job)
            }
        }
        console.log("RES:", result)
        return result
    },

    getSearchTerm: function() {
        return this.DATA.searchTerm
    },

    searchJobs: function(term) {
        const searchurl = this.BASE_URL + 
                          'jobs?populate=company&filters[description][$containsi]=' +
                          encodeURIComponent(term)

        if (term != this.DATA.searchTerm) {
            this.DATA.searchTerm = term
            fetch(searchurl)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log("SEARCH DATA", data)
                this.DATA.searchresult = data.data

                const event = new CustomEvent("modelUpdated")
                window.dispatchEvent(event)
            })
        }
    },

    getSearchResult: function() {
        return this.DATA.searchresult 
    },


    submitJobApplication: function(user, jobid, text) {

        console.log("JOBAPP", user, jobid, text)

        const appurl = this.BASE_URL + 'job-applications'

        fetch(appurl, {
            method: 'POST',
            headers: {
                Authorization: 'bearer ' + Auth.getJWT(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    user: user,
                    job: jobid,
                    text: text
                }
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const event = new CustomEvent("applicationResponse")
            window.dispatchEvent(event)
        })
    },


    loadJobApplications: function() {

        const user = Auth.getUser()
        if (user) {
            const appurl = this.BASE_URL + 'job-applications?populate=job&filters[user][id][$eq]=' + user.id

            console.log("Loading application data...")
            fetch(appurl, {
                headers: {
                    Authorization: 'bearer ' + Auth.getJWT(),
                    'Content-Type': 'application/json'
                }
            }) 
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log("Application DATA", data)
                this.DATA.applications = data.data

                const event = new CustomEvent("modelUpdated")
                window.dispatchEvent(event)

            })
        }
    },

    getJobApplications: function() {
        return this.DATA.applications
    },

    loadData:  function() {

        const joburl = this.BASE_URL + 'jobs?populate=company&sort[0]=publishedAt%3Adesc'

        console.log("Loading job data...")
        fetch(joburl) 
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log("JOB DATA", data)
            this.DATA.jobs = data.data

            const event = new CustomEvent("modelUpdated")
            window.dispatchEvent(event)

        })

        const companyurl = this.BASE_URL + 'companies'

        console.log("Loading company data...")
        fetch(companyurl) 
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log("COMPANY DATA", data)
            this.DATA.companies = data.data
            const event = new CustomEvent("modelUpdated")
            window.dispatchEvent(event)
        })


    }


}