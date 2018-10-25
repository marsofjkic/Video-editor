/*
    Stores and retrieves a cache of VideoComposer projects
*/

import VideoComposer from './VideoComposer.js';

class VideoComposerFacade {

    _store = {
        projects: []
    };

    _projectExists (projectName) {
        if(this._store.projects.find(function(element) 
        {return element.name == projectName;})) return true;
        else return false;
    }

    getProject (projectName) {
        return this._store.projects.find(function(element) 
        {return element.name == projectName;}).project;
    }

    newProject (projectName){
        this._store.projects.push({name: projectName, project: new VideoComposer()});
    }

    loadProject (project) {
        
        if(this._projectExists(project.name)) return true;

        this.newProject(project.name);
        var vidProject =  this.getProject(project.name);

        vidProject.compositionBuilder.constructProject(project);

        vidProject.log();

        return true;

    }

}

export default VideoComposerFacade