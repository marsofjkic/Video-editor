var express = require('express');
var router = express.Router();
const Project = require('./../model/project');

router.post('/newUser', (req, res)=>{

	const name = req.body.name;

	User.create({ 
        name: name, 
    }, function (err, user) {
		if (err){
			console.log(err);
		}else{
			res.json({user:user});
		}
	});
	
});

router.get('/users', (req, res)=>{
	
	User.find({},function (err, users) {
        if (err){
            console.log(err);
        };
        if (users === null) {
            console.log('none found');
        }
        else{
            res.json({users:users});
        }
    });
	
});

router.get('/projects', (req, res)=>{

    if(req.isAuthenticated()){

        var searchQuery = {
            'profileID': req.user.profileID
        };

        Project.find(searchQuery, function (err, projects) {
            if (err){
                console.log(err);
                res.status(404).send(err);
            } else {
                res.json(projects);
            }
        });

    };
	
});

router.post('/setProject', (req, res)=>{

    const project = req.body.project;
    console.log(project);
    project.profileID = req.user.profileID;
    
    if(req.isAuthenticated()){

        var searchQuery = {
            'name': project.name,
            'profileID': project.profileID
        };

        var updates = {
            'project.layers': project.layers,
            'project.media': project.media
        };

        var options = {
            upsert: true
        };

        Project.findOneAndUpdate(searchQuery, project, options, function (err, project) {
            if (err){
                console.log(err);
                res.status(404).send(err);
            } else {
                res.json(project);
            }
        });

    };
	
});

module.exports = router;