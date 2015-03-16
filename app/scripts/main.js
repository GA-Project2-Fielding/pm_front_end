'use strict';
console.log('main loaded');


var Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'projects/:id': 'getProject'
    },
    home: PM.renderUser(),
    getProject: function(id){
        PM.getProject(id);
    }
});

new Router();
Backbone.history.start();
