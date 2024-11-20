mongoose = require ('mongoose');

//app = express();

const MONGO_URI = 'mongodb://localhost:27017/Week8Mongo';
mongoose.connect(MONGO_URI, {useUnifiedTopology: true,useNewUrlParser: true}); const db = mongoose.connection;

db.on('error', function (err)
{
    console.log("Error occured during connection: " + err)
});

db.once('connected', function () {
    console.log('Connected to ${MONGO_URI}');
});

// Creating the scheme 
const PersonScheme = new mongoose.Schema (
    { 
        name: { type: String, required: true }, 
        age: Number, Gender: String, Salary: Number
    }
);

// Creating model named as model name with collection named as personCollection 
const person_doc = mongoose.model('modelname', PersonScheme, 'personCollection');

// Creating a single document 
const doc1 = new person_doc({ name: 'Nik', age: 24, Gender: "Female", Salary: 3456});

// Adding one document in the collection 

doc1
    .save()
    .then((doc1) => {
        console.log("New Artical has been Added to your Database.")
    })
    .catch((err) => {
        console.error(err);
    });

// TASK 2: Adding multiple people 
manypersons= [
    {  name:  'Simon',age:42,Gender:"Male",Salary:3456 },
    {  name:  'Neesha',age:23,Gender:"Female",Salary:1000 },
    {  name:  'Mary',age:27,Gender:"Female",Salary:5402 }, 
    {  name:  'Mike',age:40,Gender:"Male",Salary:4519 }] 

    person_doc.insertMany(manypersons).then(function()
    {  
        console.log("Data inserted")  
    }) 
    .catch(function(error)
    {  
        console.log(error)        
    }); 

// TASK 3: Fetching data using 'find'
person_doc.find({})
    .sort({Salary: 1})
    .select("name Salary age")
    .limit(10)
    .then(docs => {
        console.log("Showing Multiple Doccuments")
        docs.forEach(function(Doc) {
            console.log(Doc.age, Doc.name);
        })
    })
    .catch (err => {
        console.error(err)
    })

// TASK 4: 'find' command with fultering criteria 
var givenage = 30
person_doc.find({Genedr:"Female",age:{$gte:givenage}}) 
    .sort({Salary: 1})
    .select('name Salary age')
    .limit(10)
    .exec()
    .then(docs => {
        console.log("Showing age greater than 15: ", givenage)
        docs.forEach(function(Doc) {
            console.log(Doc.age, Doc.name);
        })
    })
    .catch(err => {
        console.error(err)
    })

// TASK 5: Returning total number of doccuments in collection 
person_doc.countDocuments().exec()
    .then(count => {
        console.log("Total documentation count: ", count)
    })
    . catch(err => {
        console.error(err)
    })

// TASK 6: Delete documents for given criteria 
person_doc.deleteMany({age: {$gte: 25}})
    .exec()
    .then(docs => {
        console.log("Deleted documents are:", docs);
    })
    .catch(function(error) {
        console.log(error);
    })

// TASK 7: Update doccuments of female gender, setting salary to £5555
person_doc.updateMany({Gender: "Female"},{Salary:5555})
    .exec()
    .then(docs => {
        console.log("Update")
        console.log(docs);
    })
    .catch(function(error) {
        console.log(error)
    })