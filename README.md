**Student Name**:  Krina Patel

**NetID**: vj3004


# Homework #12 Solutions

## Question 1

### 1(a)
```javascript
// Create a NeDB datastore for users with hashed passwords and club activities

import DataStore1 from "nedb-promises";
const db1 = DataStore1.create("./usersDB");
import DataStore2 from "nedb-promises";
const db2 = DataStore2.create("./activityDB");
import { readFile } from "fs/promises";

// Get user data from JSON file
const users = JSON.parse(
  await readFile(new URL("./clubUsers3Hash.json", import.meta.url))
);

// Get activity data from JSON file
const activities = JSON.parse(
  await readFile(new URL("./eventData.json", import.meta.url))
);

async function setupUserDB() {
  let numRemoved = await db1.remove({}, { multi: true });
  console.log("clearing database, removed " + numRemoved);

  // We let NeDB create _id property for us.
  let newDocs = await db1.insert(users);
  console.log("Added " + newDocs.length + " users");
}

setupUserDB();

async function setupActivityDB() {
  let numRemoved = await db2.remove({}, { multi: true });
  console.log("clearing database, removed " + numRemoved);

  // We let NeDB create _id property for us.
  let newDocs = await db2.insert(activities);
  console.log("Added " + newDocs.length + " activities");
}

setupActivityDB();
```
### 1(b)
```javascript
//Member

//get member data
app.get("/members", checkAdminMiddleware, async function (req, res) {
  let justNames = await usersDB.find({}, { firstName: 1, lastName: 1 });
  res.json(justNames);
});

//login

app.post("/login", express.json(), async function (req, res) {
  console.log(`path /login received: ${JSON.stringify(req.body)}`);
  let email = req.body.email;
  let password = JSON.stringify(req.body.password);

  let auser = await usersDB.findOne({ email: email });

  if (!auser) {
    res.status(401).json({ error: true, message: "User/Password error" });
    return;
  }

  let verified = bcrypt.compareSync(password, auser.password);
  // console.log(verified);

  if (verified) {
    let oldInfo = req.session.user;
    req.session.regenerate(function (err) {
      if (err) {
        console.log(err);
      }
      let newUserInfo = Object.assign(oldInfo, auser);
      delete newUserInfo.password;
      req.session.user = newUserInfo;
      // console.log(newUserInfo);
      res.json(newUserInfo);
    });
  } else {
    res.status(401).json({ error: true, message: "User/Password error" });
  }
});
```

### 1(c)
```javascript
//Activities

//get activity
app.get("/activities", async function (req, res) {
  console.log("Get Activities Called");
  let activities = await activityDB.find({});
  console.log(activities);
  res.json(activities);
});

let ajv = new Ajv();

const activitySchema = JSON.parse(fs.readFileSync("./newActivitySchema.json"));
let activityValidate = ajv.compile(activitySchema);

//post activity
app.post(
  "/activities",
  checkUserMiddleware,
  jsonParser,
  async function (req, res) {
    console.log(
      `POST method /activities received: ${JSON.stringify(req.body)}`
    );

    const activity = req.body;

    try {
      const valid = activityValidate(activity);

      if (!valid) {
        jsonErrors(err, req, res, next);
        console.log(activityValidate.errors);
        res.status(400).json({ error: "bad data" });
        return;
      } else {
        console.log("JSON input is exceeding limit");
      }
    } catch (ex) {
      res.status(500);
      return;
    }
    activityDB.insert(activity);
    let activities = await activityDB.find({});
    res.json(activities);
  }
);

//delete activity
app.delete("/activities/:id", checkAdminMiddleware, async function (req, res) {
  let id = req.params.id;
  let newActivities = activityDB.remove({ _id: id });
  res.json(newActivities);
});
```

## Question 2

### 2(a)
- Do you need to modify your Mocha based login tests from homework #11?
- No, there are no changes required in mocha based login tests. They work fine for updated server code.

![login tests](images/12_2a.PNG)

### 2(b)
- Do you need to modify any of your Mocha based activity tests from homework #11?
- Yes, the index of json activities in DELETE method needs to be replaced by _id of activityDB database

```javascript
  it("Login as an admin and delete activity", async function () {
    assert.equal(res.status, 200);
    assert.equal(login3.role, "admin");

    let savedCookie = res.headers.raw()["set-cookie"];

    delActivities = await fetch(urlBase + "activities/PRiFZEoO51Lbz0aI", { //_id of activity to be deleted
      method: "delete",
      headers: { cookie: savedCookie },
    });

    assert.equal(delActivities.status, 200);
  });
});
```

![activity tests](images/12_2b.PNG)

## Question 3

### 3(a)
1. Start up your clubReact development bunder. What host and TCP port is the Parcel bundler running on?
- The React app is running on : http://localhost:1234/
- Host: http://localhost
- TCP port: 1234

2. In a separate terminal start up your clubServer. What host and TCP port is your server running on?
- The clubServer is running on : http://localhost:3000/
- Host: http://localhost
- TCP port: 3000

### 3(b)
```json
{
    "/activities": {
      "target": "http://localhost:3000"
    }
}
```

## Question 4

### 4(a)

### 4(b)
![fetch activities](images/12_4b.PNG)

```react
import React from 'react';
import ReactDOM from 'react-dom';

class Activities extends React.Component{ 
    constructor(props){
        super(props);
        this.state = { activities: [] };
    }

    componentDidMount(){
        let that = this;
        fetch('/activities').then(function(res){
            if(res.ok){
                console.log(res);
                return res.json();
            } else {
                console.log("Problem getting activities");
                return new Promise.reject(res.statusText);
            }
        })
        .then(function(activities){
            console.log(activities);
            that.setState({activities: activities});
            
        })
    }

    render() {
        // Create table rows with array map method
        let tableRows = this.state.activities.map(function(event,i){
        return (<tr key={i}><td>{event.name}</td>
                        <td>{event.dates}</td>
                        <td>{event.description}</td></tr>);
        });

        let eventName = this.state.activities.map(function(event,j){
        return <h3 key={j}><ul><li>{event.name}</li></ul></h3>
        })
        return <>
        <h1 style={{marginTop:"100px"}}>Club Activities</h1>
        {eventName}
        <table>
        <caption>Club Activities Table</caption>
        <thead>
            <tr><th>Name</th><th>Dates</th><th>Description</th></tr>
                    </thead>
                    <tbody id="ActTable">
                    {tableRows}
                    </tbody>
        </table>
        </>;
    }
}

export default Activities;
```