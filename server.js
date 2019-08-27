//Install express server
const express = require('express');
const path = require('path');
const app = express();

const semesters = [
    'winter',
    'spring',
    'summer',
    'fall'
]
var semesterIndex = 0
var firstYear = 2019
var courseListArray = new Array()
var today = new Date()
var bodyParser = require('body-parser')
var request = require('request')
var cheerio = require('cheerio')
var schedule = require('node-schedule')
var mongodb = require('mongodb')
var ObjectID = mongodb.ObjectID
var db

const PORT = process.env.PORT || 5000
//The new uri is of the form:
//http://205.154.255.98/academics/schedules/courselisting/spring2019-courselisting-n.htm
const URLPrefix = 'http://205.154.255.98/academics/schedules/courselisting/class_list_'
const URLPostfix = '.htm'

// This connects the app to the database
mongodb.MongoClient.connect(process.env.MONGODB_URI
                            || 'mongodb://localhost:27017/test',
                            { useNewUrlParser: true },
                            function(err, client) {
    if(err) {
        console.log(err)
        process.exit(1)
    }

    db = client.db()
    console.log("Database connection ready")

    var server = app.listen(PORT, () => {
        console.log("Server is running on port", PORT)
    })
})

// This is used to get a consistent url throughout the program
function createURL(semester, year) {
    if(semesters.indexOf(semester) >= 0 && year >= firstYear ) {
        return URLPrefix + '_' + semester + year + URLPostfix
    } else {
        return null
    }
}

// Used to check if the url exists
function checkRequest(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, res, html) => {
            if(!error && res.statusCode == 200) {
                resolve(true)
            } else {
                reject(false)
            }
        })
    })
}


var getSemester = (semester, year) => {
    let collections = []
    db.command("")
    return collections
}

// Returns the html of the given url
function fromURL(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, res, html) => {
            if(!error && res.statusCode == 200) {
                resolve(html)
            } else {
                reject()
            }
        })
    })
}

var getCourseListing = async (url, courseNumber) => {
    var html = await fromURL(url)
                        .catch((err) => {
                            console.log(err)
                        })
    var $ = cheerio.load(html)
    var course = {
        courseName: "",
        courseDesc: "",
        courseNum: "",
        daysOfWeek: "",
        meetingTime: "",
        meetingDates: ""
    }
    $('tbody').find('tr').each(function(i, elem) {
        var courseArray = []
        $(this).find('td').each(function(j, elem) {
            courseArray.push($(this).text())
        })
        if(courseArray.length == 14) {
            var courseInfo = {
                courseName: courseArray[0].substring(1, courseArray[0].length-1),
                courseDesc: courseArray[1].substring(1, courseArray[1].length-1),
                courseNum: courseArray[2].substring(1, 6),
                daysOfWeek: courseArray[4].substring(1, courseArray[4].length-1),
                meetingTime: courseArray[5].substring(1, courseArray[5].length-1),
                meetingDates: courseArray[13].substring(1, 22),
            }
            if(courseInfo.courseNum === courseNumber) {
                console.log(courseInfo);
                course = courseInfo
            }
            courseListArray.push(courseInfo)
        }
    })
    return course
}

app.use(bodyParser.json())
app.get('/api', async (req, res) => {
    if(!req.query.semester) {
        res.status(400).send({
            success: 'false',
            message: 'semester required'
        })
    }
    if(!req.query.year) {
        res.status(400).send({
            success: 'false',
            message: 'year required'
        })
    }
    if(!req.query.course) {
        res.status(400).send({
            success: 'false',
            message: 'course number required'
        })
    }
    const semester = req.query.semester
    const year = req.query.year
    let url = createURL(semester, year)
    const response = await getCourseListing(url, req.query.course)

    console.log("done")
    console.log(response)
    res.json(response)
})

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/frontend'));

app.get('/vsa', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/frontend/index.html'));
});

app.get('/semester', function(req, res) {
    let semester = req.query.semester
    let year = req.query.year
    collections = getSemester(semester, year)
    res.send({
        "message": "ok",
        "collections": collections
    })
})

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/frontend/index.html'));
});
// Start the app by listening on the default Heroku port
