!function(){var e=Handlebars.template,n=Handlebars.templates=Handlebars.templates||{};n.commentShowTemplate=e({1:function(e,n,t,a){var l,i=n.helperMissing,r="function",s=this.escapeExpression;return'      <li><a href="/#/comments/'+s((l=null!=(l=n.id||(null!=e?e.id:e))?l:i,typeof l===r?l.call(e,{name:"id",hash:{},data:a}):l))+'">'+s((l=null!=(l=n.body||(null!=e?e.body:e))?l:i,typeof l===r?l.call(e,{name:"body",hash:{},data:a}):l))+"</a></li>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(e,n,t,a){var l,i=this.lambda,r=this.escapeExpression;return"<div id='comment'>\n  <h1>"+r(i(null!=(l=null!=e?e.comment:e)?l.body:l,e))+"</h1>\n  <h3>"+r(i(null!=(l=null!=(l=null!=e?e.comment:e)?l.user:l)?l.user_name:l,e))+"</h3>\n  <h6>"+r(i(null!=(l=null!=e?e.comment:e)?l.created_at:l,e))+"</h6>\n  <ul>\n    <h4>Subcomments:</h4>\n"+(null!=(l=n.each.call(e,null!=(l=null!=e?e.comment:e)?l.subcomments:l,{name:"each",hash:{},fn:this.program(1,a,0),inverse:this.noop,data:a}))?l:"")+"  </ul>\n</div>\n"},useData:!0}),n["commentform-partial"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(){return"<h3>New Comment</h3>\n<form class='newCommentForm'>\n  <fieldset>\n    <textarea id=\"commentBody\" name=\"commentBody\"></textarea>\n  </fieldset>\n  <button type='submit'>Submit</button>\n</form>\n"},useData:!0}),n.homeTemplate=e({1:function(e,n,t,a){var l,i=n.helperMissing,r="function",s=this.escapeExpression;return'      <li><a href="/#/projects/'+s((l=null!=(l=n.id||(null!=e?e.id:e))?l:i,typeof l===r?l.call(e,{name:"id",hash:{},data:a}):l))+'">'+s((l=null!=(l=n.project_title||(null!=e?e.project_title:e))?l:i,typeof l===r?l.call(e,{name:"project_title",hash:{},data:a}):l))+"</a></li>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(e,n,t,a){var l,i=this.lambda,r=this.escapeExpression;return"<div id='user'>\n  <img src="+r(i(null!=(l=null!=e?e.user:e)?l.image_url:l,e))+' alt="Profile Picture"><h1>'+r(i(null!=(l=null!=e?e.user:e)?l.user_name:l,e))+"</h1>\n  <h2>"+r(i(null!=(l=null!=e?e.user:e)?l.first_name:l,e))+" "+r(i(null!=(l=null!=e?e.user:e)?l.last_name:l,e))+'</h2><a href="#" class="update-user-link">Update</a>\n  <h3>Projects:</h3>\n  <ul>\n'+(null!=(l=n.each.call(e,null!=(l=null!=e?e.user:e)?l.projects:l,{name:"each",hash:{},fn:this.program(1,a,0),inverse:this.noop,data:a}))?l:"")+'  </ul>\n  <button id="new-project-button" type="">New Project</button>\n'+(null!=(l=this.invokePartial(t["userform-partial"],e,{name:"userform-partial",data:a,indent:"  ",helpers:n,partials:t}))?l:"")+"    <div class=\"projectForm\">\n      <h3>New Project</h3>\n        <form id='newProjectForm'>\n          <fieldset>\n            <label for='projectTitle'>\n              <input type='text' name='projectTitle' id='projectTitle'autofocus='true' />\n              Project Title\n            </label>\n            <br>\n            <label for='description'>\n              <input type='text' name='description' id='description' />\n              Description\n            </label>\n            <br>\n            <label for='startDate'>\n              <input type='date' name='startDate' id='startDate' />\n              Start Date\n            </label>\n            <br>\n            <label for='dueDate'>\n              <input type='date' name='dueDate' id='dueDate' />\n              Due Date\n            </label>\n            <br>\n            <label for='completionDate'>\n              <input type='date' name='completionDate' id='completionDate' />\n              Completion Date\n            </label>\n            <br>\n            <label for='completed'>\n              <!-- <input type='hidden' name='completed' id='completed' value='false'/> -->\n              <input type='checkbox' name='completed' id='completed'/>\n              Completed\n            </label>\n            <br>\n            <label for='visible'>\n              <input type='checkbox' name='visible' id='visible' checked/>\n              Visible\n            </label>\n          </fieldset>\n\n          <button type='submit'>Submit</button>\n        </form>\n    </div>\n</div>\n"},usePartial:!0,useData:!0}),n.projectshowTemplate=e({1:function(e,n,t,a){var l,i=n.helperMissing,r="function",s=this.escapeExpression;return'      <li><a href="/#/tasks/'+s((l=null!=(l=n.id||(null!=e?e.id:e))?l:i,typeof l===r?l.call(e,{name:"id",hash:{},data:a}):l))+'">'+s((l=null!=(l=n.title||(null!=e?e.title:e))?l:i,typeof l===r?l.call(e,{name:"title",hash:{},data:a}):l))+"</a></li>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(e,n,t,a){var l,i=this.lambda,r=this.escapeExpression;return"<div id='project'>\n  <h1>"+r(i(null!=(l=null!=e?e.project:e)?l.project_title:l,e))+"</h1>\n  <h2>Start Date: "+r(i(null!=(l=null!=e?e.project:e)?l.start_date:l,e))+"</h2>\n  <h2>Due Date: "+r(i(null!=(l=null!=e?e.project:e)?l.due_date:l,e))+"</h2>\n  <h2>Completed: "+r(i(null!=(l=null!=e?e.project:e)?l.completed:l,e))+"</h2>\n  <h3>Tasks:</h3>\n  <ul>\n"+(null!=(l=n.each.call(e,null!=e?e.tasks:e,{name:"each",hash:{},fn:this.program(1,a,0),inverse:this.noop,data:a}))?l:"")+'  </ul>\n  <button id="new-task-button" type="">New Task</button>\n  <div class="new-task-form">\n'+(null!=(l=this.invokePartial(t["taskform-partial"],e,{name:"taskform-partial",data:a,indent:"    ",helpers:n,partials:t}))?l:"")+"  </div>\n</div>\n"},usePartial:!0,useData:!0}),n.taskShowTemplate=e({1:function(e,n,t,a){var l,i=n.helperMissing,r="function",s=this.escapeExpression;return'      <li><a href="/#/tasks/'+s((l=null!=(l=n.id||(null!=e?e.id:e))?l:i,typeof l===r?l.call(e,{name:"id",hash:{},data:a}):l))+'">'+s((l=null!=(l=n.title||(null!=e?e.title:e))?l:i,typeof l===r?l.call(e,{name:"title",hash:{},data:a}):l))+"</a></li>\n"},3:function(e,n,t,a){var l,i=n.helperMissing,r="function",s=this.escapeExpression;return'    <li><a href="/#/comments/'+s((l=null!=(l=n.id||(null!=e?e.id:e))?l:i,typeof l===r?l.call(e,{name:"id",hash:{},data:a}):l))+'">'+s((l=null!=(l=n.body||(null!=e?e.body:e))?l:i,typeof l===r?l.call(e,{name:"body",hash:{},data:a}):l))+"</a></li>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(e,n,t,a){var l,i=this.lambda,r=this.escapeExpression;return"<div id='task'>\n  <h1>"+r(i(null!=(l=null!=e?e.task:e)?l.title:l,e))+"</h1>\n  <h2> Completed: "+r(i(null!=(l=null!=e?e.task:e)?l.completed:l,e))+"</h2>\n  <h2> Due Date: "+r(i(null!=(l=null!=e?e.task:e)?l.due_date:l,e))+"</h2>\n  <h2> Priority: "+r(i(null!=(l=null!=e?e.task:e)?l.priority:l,e))+"</h2>\n  <ul>\n    <h3>Subtasks:</h3>\n"+(null!=(l=n.each.call(e,null!=(l=null!=e?e.task:e)?l.subtasks:l,{name:"each",hash:{},fn:this.program(1,a,0),inverse:this.noop,data:a}))?l:"")+"    <button id=\"new-subtask-button\">New Subtask</button>\n    <div class='new-subtask-form'>\n"+(null!=(l=this.invokePartial(t["taskform-partial"],e,{name:"taskform-partial",data:a,indent:"      ",helpers:n,partials:t}))?l:"")+"    </div>\n    <h3>Comments:</h3>\n"+(null!=(l=n.each.call(e,null!=e?e.comments:e,{name:"each",hash:{},fn:this.program(3,a,0),inverse:this.noop,data:a}))?l:"")+"    <div class='new-comment-form'>\n"+(null!=(l=this.invokePartial(t["commentform-partial"],e,{name:"commentform-partial",data:a,indent:"      ",helpers:n,partials:t}))?l:"")+"    </div>\n  </ul>\n</div>\n"},usePartial:!0,useData:!0}),n["taskform-partial"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(){return"<div class='form new'>\n<h3>New Task</h3>\n    <form class='newTaskForm'>\n      <fieldset>\n        <label for='taskTitle'>\n          <input type='text' name='taskTitle' id='taskTitle'autofocus='true' />\n          Title\n        </label>\n        <br>\n        <label for='taskDescription'>\n          <textarea id='taskDescription'></textarea>\n          Description\n        </label>\n        <br>\n        <label for='taskDueDate'>\n          <input type='date' name='taskDueDate' id='taskDueDate' />\n          Due Date\n        </label>\n        <br>\n        <label for='taskCompleted'>\n          <input type='checkbox' name='taskCompleted' id='taskCompleted' />\n          Completed?\n        </label>\n        <br>\n        <label for='taskPriority'>\n        <select id='taskPriority'>\n          <option value=\"1\">Urgent</option>\n          <option value=\"2\">High</option>\n          <option value=\"3\">Medium</option>\n          <option value=\"4\">Low</option>\n        </select>\n          Priority\n        </label>\n      </fieldset>\n\n    <button type='submit'>Submit</button>\n  </form>\n</div>\n"},useData:!0}),n["userform-partial"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(){return"<div class='form update'>\n  <form id='user-update-form'>\n    <fieldset>\n      <label for='email'>\n        <input type='text' id='email-reg' name='email' autofocus='true' />\n        E-mail\n      </label>\n      <br>\n      <label for='user_name'>\n        <input type='text' id='user-name' name='user_name' autofocus='true' />\n        User Name\n      </label>\n      <br>\n      <label for='first_name'>\n        <input type='text' id='first-name' name='first_name' autofocus='true' />\n        First Name\n      </label>\n      <br>\n      <label for='last_name'>\n        <input type='text' id='last-name' name='last_name' autofocus='true' />\n        Last Name\n      </label>\n      <br>\n      <label for='password'>\n        <input type='password' id='password-reg' name='password' />\n        Password\n      </label>\n      <br>\n      <label for='file'>\n        <input type='file' name='file' id='file_upload' autofocus='true' />\n        Profile Picture\n      </label>\n    </fieldset>\n\n    <button type='submit'>Save</button>\n  </form>\n</div>\n"},useData:!0})}();
