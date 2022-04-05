
// import Handlebars from "handlebars";

const template = Handlebars.compile(`
 <div class='job'>
    <h3>{{attributes.title}}</h3>
    <h4 class=job-company>COMPANY: 
    <a href="/#!/companies/{{attributes.company.data.id}}">{{attributes.company.data.attributes.name}}</a></h4>
    <div class='job-description'>{{{attributes.description}}}</div>
</div>`)

export const JobInfo = (id, job) => {
    const target = document.getElementById(id)
    target.innerHTML = template(job)
}

