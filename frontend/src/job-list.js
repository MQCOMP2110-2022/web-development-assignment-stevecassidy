//import Handlebars from "handlebars";

const template = Handlebars.compile(`
 <h2>Job List</h2>
 {{#if term}}
 <p>Search results for '{{term}}'</p>
 {{/if}}
 <div class=joblist> 
    {{#each jobs}}
    <div class=job>
        <h3><a href="/#!/jobs/{{id}}">{{attributes.title}}</a></h3>
        <h4 class="job-company">COMPANY: 
        <a href="/#!/companies/{{attributes.company.data.id}}">{{attributes.company.data.attributes.name}}</a></h4>
        <p>Published: {{attributes.publishedAt}}</p>
        <p>Location: {{attributes.location}}</p>
        <p>Type: {{attributes.type}}</p>
    </div>
    {{/each}}
 </div>`)

 export const JobList = (id, jobInfo) => {

   const target = document.getElementById(id)
    target.innerHTML = template(jobInfo)
 }
