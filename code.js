//Google Drive public file access
var gDriveFilesUrl = 'https://www.googleapis.com/drive/v2/files/';
var gDriveApiKey = 'AIzaSyDlD0Io4fOzxFrNz1KQk7XfiMcs8g0HEcY';
var urlParamFileId = 'gDriveFileID';

//Get all URL arguments
var args = {};
function getUrlArguments() {
    var params = location.search.split('?');
    if (params.length < 2) return;
    params = params[1].split('&');  
    for (var i = 0; i < params.length; i++) {
        var parm = params[i].split("=");
        if (parm.length == 2) {
            args[parm[0]] = parm[1];
         }
    }
}
getUrlArguments();

//function to display message on page
function displayMsg(msgStr) {
    var e = document.createElement('pre');
    e.innerHTML = msgStr;
    document.body.appendChild(e);
}

//function to review the file ID provided
function CheckHTMLFile() {
    //Get user provided file ID for google Drive
    var gDriveFileId = args[urlParamFileId];

    //Exit if not provided
    if (typeof gDriveFileId != 'string') {
        displayMsg('url parameter required for ' + urlParamFileId);
        return;
    }

    //Compile File Request Url
    var fileRequestURL = gDriveFilesUrl
        + gDriveFileId
        + '?key=' + gDriveApiKey;

    //Ensure HTML file provided
    $.get(fileRequestURL, function(data) {
        if (data.fileExtension != 'html') {
            displayMsg('Google Drive file: ' + data.originalFilename + ' is not an HTML file');
            return;
        }
        loadHTML(fileRequestURL);
    },'json');    
}

//function to load the HTML to page
function loadHTML(urlPath) {
    //Set to get file content
    urlPath += '&alt=media';
    
    //Send file request
    $.get(urlPath, function(data) {
        document.write(data);
    },'html');
}


         
         
    
    
    
    /*Prepare Request
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                //load as html to page
                document.write(xmlhttp.responseText);
            } else {
                //Record error
                displayMsg('unexpected response:'
                    + '\n    readyState: ' + xmlhttp.readyState
                    + '\n    status:     ' + xmlhttp.status
                    + '\n    statusText: ' + xmlhttp.statusText
                );
            }
        }
    };

    //Send request
    xmlhttp.open("GET", fileRequestURL, true);
    xmlhttp.send();
    */
}

//load on startup
CheckHTMLFile();
