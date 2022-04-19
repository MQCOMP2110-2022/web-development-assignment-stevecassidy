
const loginTemplate = Handlebars.compile(`
<div class='loginform'>
{{#if user}}
    <p>Logged in as {{user.username}}</p>
    <button id="logoutbutton">Logout</button>
{{else}}
    <form id="loginform">
        <input name="username" placeholder="Username">
        <input name="password" type="password" autocomplete="on" placeholder="Password">
        <input id="loginbutton" type="submit" value="Login">
    </form>
{{/if}}
{{#if error}} 
    <p>{{error}}</p>
{{/if}}
</div>`)

export const loginForm = (user, error) => {
    return loginTemplate({user, error})
    
}


const jobAppTemplate = Handlebars.compile(`
<div>
  <form id='jobapplicationform'>
    <textarea name='text'></textarea>
    <input type='hidden' name='user' value='{{user.id}}'>
    <input type='hidden' name='jobid' value='{{jobid}}'>
    <input type='submit' value='Submit Application'>
  </form>
</div>`)

export const jobApplicationForm = (user, jobid) => {

    return jobAppTemplate({user, jobid})
}


const userPageTemplate = Handlebars.compile(`
<div id='userjobapplications'>
  <h1>User page for {{user.username}}</h1>
  {{#each applications}}
    <div class='jobapp'>
      <h2>Job: <a href="/#!/jobs/{{attributes.job.data.id}}">{{attributes.job.data.attributes.title}}</a></h2>
      <p>{{attributes.text}}</p>
    </div>
  {{/each}}
</div>
`)

export const userPage = (id, user, applications) => {
    if (user) {
        console.log("UU", user, applications)
        const target = document.getElementById(id)
        target.innerHTML = userPageTemplate({user, applications})
    }
}
