import { JobList } from './job-list.js'
import { JobInfo } from './job-info.js'
import { CompanyView } from './company.js'
import { error404, aboutPage, helpPage } from './pages.js'
import { Router } from './router.js'
import { getJobs, getJob, getCompany, getCompanyJobs, loadData } from './model.js'

const router = new Router(error404)

const updateNavigation = (pageid) => {
    const nav = document.getElementsByTagName('nav')[0]
    const links = nav.getElementsByTagName('li')
    for(let i=0; i<links.length; i++) {
        const link = links[i]
        if (link.id == pageid) {
            link.className = "selected"
        } else {
            link.className = ""
        }
    }
}

router.get('/', () => {
    const jobs = getJobs()
    JobList('main', jobs.slice(0, 10))
    updateNavigation('nav-home')
})

router.get('/jobs', (pathInfo) => {
    if (pathInfo.id) {
        const job = getJob(pathInfo.id)
        if (job) {
            JobInfo('main', job)
        } else {
            error404()
        }
    } else {
        const jobs = getJobs()
        JobList(jobs)
    }
    updateNavigation('nav-jobs')
})

router.get('/companies', (pathInfo) => {
    if (pathInfo.id) {
        const company = getCompany(pathInfo.id)
        if (company) {
            const companyJobs = getCompanyJobs(company.id)
            CompanyView('main', company, companyJobs)
        } else {
            error404()
        }
        updateNavigation('nav-companies')
    } else {
        error404()
    }
})

router.get('/about', () => {
    aboutPage('main')
    updateNavigation('nav-about')
})

router.get('/help', () => {
    helpPage('main') 
    updateNavigation('nav-help')
})

window.onload = () => {
    loadData(router)
}

