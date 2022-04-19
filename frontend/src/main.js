import { JobList } from './job-list.js'
import { JobInfo } from './job-info.js'
import { CompanyView } from './company.js'
import { error404, aboutPage, helpPage } from './pages.js'
import { Router } from './router.js'
import { Model } from './model.js'
import { jobApplicationForm, loginForm, userPage } from './user.js'
import { Auth } from './service.js'

const router = new Router(error404)
Auth.init()


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

    const userInfo = document.getElementById("userinfo")
    userInfo.innerHTML = loginForm(Auth.getUser(), Auth.getErrorMessage());
    const loginform = document.getElementById('loginform')
    if (loginform) {
        loginform.onsubmit = (event) => {
            event.preventDefault();
            const user = loginform.elements['username'].value;
            const password = loginform.elements['password'].value;
            Auth.login(user, password);
        }
    }
    const logoutbutton = document.getElementById('logoutbutton')
    if (logoutbutton) {
        logoutbutton.onclick = (event) => {
            event.preventDefault()
            Auth.logout()
        }
    }
}

const bindings = () => {

    document.getElementById('searchbutton').addEventListener("click", (e) => {
        const term = document.getElementById('search').value
        Model.searchJobs(term)
        window.location.hash = '!/search/' + term
        document.getElementById('search').value = ''
        e.preventDefault()
        false
    })

}

router.get('/', () => {
    const jobs = Model.getJobs()
    JobList('main', {jobs: jobs.slice(0, 10)})
    updateNavigation('nav-home')
})

router.get('/jobs', (pathInfo) => {
    if (pathInfo.id) {
        const job = Model.getJob(pathInfo.id)
        if (job) {
            JobInfo('main', job, Auth.getUser())
        } else {
            error404()
        }
    } else {
        const jobs = Model.getJobs()
        JobList('main', {jobs})
    }
    updateNavigation('nav-jobs')
})

router.get('/companies', (pathInfo) => {
    if (pathInfo.id) {
        const company = Model.getCompany(pathInfo.id)
        if (company) {
            const companyJobs = Model.getCompanyJobs(company.id)
            CompanyView('main', company, companyJobs)
        } else {
            error404()
        }
        updateNavigation('nav-companies')
    } else {
        error404()
        updateNavigation('nav-home')
    }
})

router.get('/me', () => {
    const apps = Model.getJobApplications(Auth.getUser())
    userPage('main', Auth.getUser(), apps)
    updateNavigation('nav-me')
})

router.get('/search', (pathInfo) => {

    if (pathInfo.id === Model.getSearchTerm()) {
        const jobs = Model.getSearchResult()
        JobList('main', {jobs, term: pathInfo.id})
    } else {
        Model.searchJobs(pathInfo.id)
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

const redraw = () => {
    router.route()
    bindings()
}

window.addEventListener('userLogin', redraw)

window.addEventListener('modelUpdated', redraw)

window.addEventListener('applicationResponse', () => {
    window.location.hash = '!/me'
    Model.loadJobApplications()
    redraw()
} )

window.onload = () => {
    Model.loadData()
    Model.loadJobApplications()
}

