const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function (req, res) {

    const apiKey = "3cb5f2a00671af7b91c58473d73a8a62-us13";
    const listId = "3594319283";
    const url = "https://us13.api.mailchimp.com/3.0/lists/359431928"
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;


    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }


    const jsonData = JSON.stringify(data)


    // client.setConfig({
    //     apiKey: apiKey,
    //     server: url,
    // });

    // const run = async () => {
    //     const response = await client.lists.batchListMembers(listId, data);
    //     console.log(response);
    // };

    // run();

    const options = {
        method: "POST",
        auth: "jecode93:" + apiKey,
    }

    const request = https.request(url, options, function (response) {
        // run();

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")

        }

        response.on("data", function (data) {

            console.log(JSON.parse(jsonData));
        })
    })

    request.write(jsonData);
    request.end();



})

app.post("/failure", function (req, res) {
    res.redirect("/");
})



app.listen(3000, function (req, res) {
    console.log("Server listen on port 3000");
})