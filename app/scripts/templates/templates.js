!function(){var e=Handlebars.template,n=Handlebars.templates=Handlebars.templates||{};n.commentShowTemplate=e({1:function(e,n,t,a){var l,i=n.helperMissing,s="function",o=this.escapeExpression;return'      <li><a href="/#/comments/'+o((l=null!=(l=n.id||(null!=e?e.id:e))?l:i,typeof l===s?l.call(e,{name:"id",hash:{},data:a}):l))+'">'+o((l=null!=(l=n.body||(null!=e?e.body:e))?l:i,typeof l===s?l.call(e,{name:"body",hash:{},data:a}):l))+"</a></li>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(e,n,t,a){var l,i=this.lambda,s=this.escapeExpression;return"<div id='comment'>\n  <h1>"+s(i(null!=(l=null!=e?e.comment:e)?l.body:l,e))+"</h1>\n  <h3>"+s(i(null!=(l=null!=(l=null!=e?e.comment:e)?l.user:l)?l.user_name:l,e))+"</h3>\n  <h6>"+s(i(null!=(l=null!=e?e.comment:e)?l.created_at:l,e))+"</h6>\n  <ul>\n    <h4>Subcomments:</h4>\n"+(null!=(l=n.each.call(e,null!=(l=null!=e?e.comment:e)?l.subcomments:l,{name:"each",hash:{},fn:this.program(1,a,0),inverse:this.noop,data:a}))?l:"")+"  </ul>\n</div>\n"},useData:!0}),n.homeTemplate=e({1:function(e,n,t,a){var l,i=n.helperMissing,s="function",o=this.escapeExpression;return'      <li><a href="/#/projects/'+o((l=null!=(l=n.id||(null!=e?e.id:e))?l:i,typeof l===s?l.call(e,{name:"id",hash:{},data:a}):l))+'">'+o((l=null!=(l=n.project_title||(null!=e?e.project_title:e))?l:i,typeof l===s?l.call(e,{name:"project_title",hash:{},data:a}):l))+"</a></li>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(e,n,t,a){var l,i=this.lambda,s=this.escapeExpression;return"<div id='user'>\n  <h1>"+s(i(null!=(l=null!=e?e.user:e)?l.user_name:l,e))+"</h1>\n  <h3>"+s(i(null!=(l=null!=e?e.user:e)?l.first_name:l,e))+" "+s(i(null!=(l=null!=e?e.user:e)?l.last_name:l,e))+"</h3>\n  <h5>Projects:</h5>\n  <ul>\n"+(null!=(l=n.each.call(e,null!=(l=null!=e?e.user:e)?l.projects:l,{name:"each",hash:{},fn:this.program(1,a,0),inverse:this.noop,data:a}))?l:"")+"  </ul>\n  <button id=\"new-project-button\" type=\"\">New Project</button>\n   <div class=\"form\">\n      <h3>New Project</h3>\n        <form id='newProjectForm'>\n          <fieldset>\n            <label for='projectTitle'>\n              <input type='text' name='projectTitle' id='projectTitle'autofocus='true' />\n              Project Title\n            </label>\n            <br>\n            <label for='description'>\n              <input type='text' name='description' id='description' />\n              Description\n            </label>\n            <br>\n            <label for='startDate'>\n              <input type='date' name='startDate' id='startDate' />\n              Start Date\n            </label>\n            <br>\n            <label for='dueDate'>\n              <input type='date' name='dueDate' id='dueDate' />\n              Due Date\n            </label>\n            <br>\n            <label for='completionDate'>\n              <input type='date' name='completionDate' id='completionDate' />\n              Completion Date\n            </label>\n            <br>\n            <label for='completed'>\n              <!-- <input type='hidden' name='completed' id='completed' value='false'/> -->\n              <input type='checkbox' name='completed' id='completed'/>\n              Completed\n            </label>\n            <br>\n            <label for='visible'>\n              <input type='checkbox' name='visible' id='visible' checked/>\n              Visible\n            </label>\n          </fieldset>\n\n          <button type='submit'>Submit</button>\n        </form>\n    </div>\n</div>\n"},useData:!0}),n.projectshowTemplate=e({1:function(e,n,t,a){var l,i=n.helperMissing,s="function",o=this.escapeExpression;return'      <li><a href="/#/tasks/'+o((l=null!=(l=n.id||(null!=e?e.id:e))?l:i,typeof l===s?l.call(e,{name:"id",hash:{},data:a}):l))+'">'+o((l=null!=(l=n.title||(null!=e?e.title:e))?l:i,typeof l===s?l.call(e,{name:"title",hash:{},data:a}):l))+"</a></li>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(e,n,t,a){var l,i=this.lambda,s=this.escapeExpression;return"<div id='project'>\n  <h1>"+s(i(null!=(l=null!=e?e.project:e)?l.project_title:l,e))+"</h1>\n  <h3>"+s(i(null!=(l=null!=e?e.project:e)?l.start_date:l,e))+"</h3>\n  <h5>Tasks:</h5>\n  <ul>\n"+(null!=(l=n.each.call(e,null!=e?e.tasks:e,{name:"each",hash:{},fn:this.program(1,a,0),inverse:this.noop,data:a}))?l:"")+'  </ul>\n  <button id="new-task-button" type="">New Task</button>\n'+(null!=(l=this.invokePartial(t["taskform-partial"],e,{name:"taskform-partial",data:a,indent:"  ",helpers:n,partials:t}))?l:"")+"</div>\n"},usePartial:!0,useData:!0}),n.taskShowTemplate=e({1:function(e,n,t,a){var l,i=n.helperMissing,s="function",o=this.escapeExpression;return'      <li><a href="/#/tasks/'+o((l=null!=(l=n.id||(null!=e?e.id:e))?l:i,typeof l===s?l.call(e,{name:"id",hash:{},data:a}):l))+'">'+o((l=null!=(l=n.title||(null!=e?e.title:e))?l:i,typeof l===s?l.call(e,{name:"title",hash:{},data:a}):l))+"</a></li>\n"},3:function(e,n,t,a){var l,i=n.helperMissing,s="function",o=this.escapeExpression;return'    <li><a href="/#/comments/'+o((l=null!=(l=n.id||(null!=e?e.id:e))?l:i,typeof l===s?l.call(e,{name:"id",hash:{},data:a}):l))+'">'+o((l=null!=(l=n.body||(null!=e?e.body:e))?l:i,typeof l===s?l.call(e,{name:"body",hash:{},data:a}):l))+"</a></li>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(e,n,t,a){var l,i=this.lambda,s=this.escapeExpression;return"<div id='task'>\n  <h1>"+s(i(null!=(l=null!=e?e.task:e)?l.title:l,e))+"</h1>\n  <h3>"+s(i(null!=(l=null!=e?e.task:e)?l.completed:l,e))+"</h3>\n  <ul>\n    <h4>Subtasks:</h4>\n"+(null!=(l=n.each.call(e,null!=(l=null!=e?e.task:e)?l.subtasks:l,{name:"each",hash:{},fn:this.program(1,a,0),inverse:this.noop,data:a}))?l:"")+'    <button id="new-subtask-button">New Subtask</button>\n'+(null!=(l=this.invokePartial(t["taskform-partial"],e,{name:"taskform-partial",data:a,indent:"    ",helpers:n,partials:t}))?l:"")+"    <h4>Comments:</h4>\n"+(null!=(l=n.each.call(e,null!=e?e.comments:e,{name:"each",hash:{},fn:this.program(3,a,0),inverse:this.noop,data:a}))?l:"")+"  </ul>\n</div>\n"},usePartial:!0,useData:!0}),n["taskform-partial"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(){return"<div class='form'>\n    <h3>New Task</h3>\n        <form id='newTaskForm'>\n          <fieldset>\n            <label for='taskTitle'>\n              <input type='text' name='taskTitle' id='taskTitle'autofocus='true' />\n              Title\n            </label>\n            <br>\n            <label for='taskDescription'>\n              <textarea id='taskDescription'></textarea>\n              Description\n            </label>\n            <br>\n            <label for='taskDueDate'>\n              <input type='date' name='taskDueDate' id='taskDueDate' />\n              Due Date\n            </label>\n            <br>\n            <label for='taskCompleted'>\n              <input type='checkbox' name='taskCompleted' id='taskCompleted' />\n              Completed?\n            </label>\n            <br>\n            <label for='taskPriority'>\n            <select id='taskPriority'>\n              <option value=\"1\">Urgent</option>\n              <option value=\"2\">High</option>\n              <option value=\"3\">Medium</option>\n              <option value=\"4\">Low</option>\n            </select>\n              Priority\n            </label>\n          </fieldset>\n\n          <button type='submit'>Submit</button>\n        </form>\n    </div>\n"},useData:!0})}();
