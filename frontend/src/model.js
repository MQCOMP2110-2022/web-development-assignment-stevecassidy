

export const Model = {
    BASE_URL: 'http://localhost:1337/api/',

    DATA: {
        jobs: [],
        companies: []
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
        const result = []
        for(let i=0; i<this.DATA.jobs.length; i++) {
            const job = this.DATA.jobs[i] 
            if (job.attributes.company.data && job.attributes.company.data.id == id) {
                result.push(job)
            }
        }

        return result
    },

    loadData:  function() {

        const joburl = this.BASE_URL + 'jobs?populate=company'

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