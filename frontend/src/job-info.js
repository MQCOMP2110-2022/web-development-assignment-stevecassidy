
// import Handlebars from "handlebars";

const template = Handlebars.compile(`
 <div class='job'>
    <h3>{{attributes.title}}</h3>
    {{#if user}}
    <div id="jobapplication">
      <button id='jobapplicationbutton' data-job='{{job.id}}'>Apply for this Job</button>
    </div>
    {{/if}}
    <h4 class=job-company>COMPANY: 
    <a href="/#!/companies/{{job.attributes.company.data.id}}">{{job.attributes.company.data.attributes.name}}</a></h4>
    <div class='job-description'>{{{job.attributes.description}}}</div>
</div>`)

export const JobInfo = (id, job, user) => {
    const target = document.getElementById(id)
    target.innerHTML = template({job, user})
}

