const express = require('express');
const app = express();
const {google} = require('googleapis');
const keys = require('./keys.json');





const client = new google.auth.JWT(
    keys.client_email,                                             //email
    null,                                                         //keyfile
    keys.private_key,                                            //key
    ['https://www.googleapis.com/auth/spreadsheets']            // scopes
);


client.authorize(function(err,tokens){

    if(err)
        console.log(err)
    else
        gsheet(client);
});


async function gsheet(client){

    const gsApi = google.sheets({version: "v4" , auth: client});
    
    const opt = {
        spreadsheetId: '', //enter your spreadsheet api
        range: 'B1:J25'    //from which to which column & row
    }

    data = await gsApi.spreadsheets.values.get(opt);


    app.get('/',function(req,res){
        res.json(data.data.values);
         });  
}


app.listen(8000);

