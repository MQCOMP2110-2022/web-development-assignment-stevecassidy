import { jobApplicationForm } from "./user.js"
import { Auth } from "./service.js"
import { Model } from "./model.js"

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
    jobAppBindings()
}

const jobAppBindings = () => {
  const jab = document.getElementById('jobapplicationbutton')
  console.log("JAB", jab)
  if (jab) {
      jab.addEventListener('click', (e) => {
          const jobid = e.target.dataset.job 
          const form = jobApplicationForm(Auth.getUser(), jobid)
          e.target.parentNode.innerHTML = form

          const jaf = document.getElementById('jobapplicationform')
          if (jaf) {
              jaf.addEventListener('submit', (e) => {
                  e.preventDefault()
                  console.log(e)
                  const formelements = e.target.elements
                  Model.submitJobApplication(
                      formelements['user'].value,
                      formelements['jobid'].value,
                      formelements['text'].value
                  )
              })
          }

      })
  }
}