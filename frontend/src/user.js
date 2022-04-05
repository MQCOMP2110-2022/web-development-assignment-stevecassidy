import Handlebars from "handlebars";

const template = Handlebars.compile(`
<div class='user'>
    <p>Name: {{name}}</p>
</div>`)

export const UserInfo = (user) => {

    return template(user)
    
}


