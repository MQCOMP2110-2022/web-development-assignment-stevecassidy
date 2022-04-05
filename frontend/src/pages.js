
// import Handlebars from "handlebars";

const template404 = Handlebars.compile(`
 <div>
    <h2>Page not found</h2>

    <p>The link you followed does not work.</p>
</div>`)

export const error404 = () => {
    const target = document.getElementById('main')
    target.innerHTML = template404()
}

const templateAbout = Handlebars.compile(`
 <div>
    <h2>About Us</h2>

    <p>Bob's Jobs is a revolution in career planning brought to you
    by Bob Bobalooba himself!</p>
</div>`)

export const aboutPage = (id) => {
    const target = document.getElementById(id)
    target.innerHTML = templateAbout()
}

const templateHelp = Handlebars.compile(`
 <div>
    <h2>Applicant Help</h2>

    <p>Be sure to he honest in your application!</p>
</div>`)

export const helpPage = (id) => {
    const target = document.getElementById(id)
    target.innerHTML = templateHelp()
}
