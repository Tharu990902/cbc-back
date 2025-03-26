import Student from '../modles/student.js';

export function Cretestudent(req, res){

    const newstudent = new Student(req.body);
    newstudent.save().then(()=>{
        res.json({message: "New student created"});
    }).catch((err)=>{
        res.json({message: err.message});
    })

};

export function Getstudent(req, res){

    Student.find().then((studentlist)=>{
        res.json(studentlist);
    })
    .catch((err)=>{
        res.json({message: err.message});
    })
};

export function Deletestudent(req,res){
    Student.deleteOne({name: req.body.name}).then(()=>{
        res.json({message: "Student deleted"});
    }).catch((err)=>{
        res.json({message: err.message});
    })
};
