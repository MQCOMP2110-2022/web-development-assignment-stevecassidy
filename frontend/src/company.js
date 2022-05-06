import { JobList } from "./job-list.js"

const template = Handlebars.compile(`
 <div>
    <h3>{{attributes.name}}</h3>
    <div>
     <a href={{attributes.url}}>
        <img src={{attributes.logo}} alt="{{attributes.name}} company logo">
     </a>

     <div id="joblist"></div>
</div>`)

export const CompanyView = (id, company, jobs) => {
   console.log("CC", jobs)
   const target = document.getElementById(id)
   target.innerHTML = template(company)
   JobList('joblist', {jobs})
}


