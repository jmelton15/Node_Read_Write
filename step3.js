const fs = require('fs');
const axios = require('axios').default;
const errorText = "There was an Error: ";
const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;


function cat(path,outputFileName=null) {
    fs.readFile(path,'utf8',(err,data) => {
        if (err) {
            console.log(errorText, err);
            process.kill(2);
        }
        if (outputFileName) {
            writeFile(outputFileName,data)
        }else{ console.log(data); }
    })
}

async function webCat(URL,outputFileName=null) {
    try {
        let response = await axios.get(URL);
        if (outputFileName) {
            writeFile(outputFileName,response.data)
        }else{ console.log(response.data); }
    } catch(e) {
        console.log(errorText, e)
    }
}

function writeFile(pathName,content) {
    let newContent = "\n" + content;
    fs.writeFile(pathName,newContent,{encoding:"utf8",flag:'a'},(err) => {
        if (err) {
            console.log(errorText, err);
            process.kill(2);
        }
        console.log("File Has Been Created!");
    })
}

function toWrite() {
    return process.argv[2] == "--out" ? true : false;
}
function containsURL() {
    return process.argv[2].match(urlRegex) || process.argv[4].match(urlRegex) ? true : false;
}
/** This regular expression can be found on regexr.com/37i6s 
 *  It is a common regex for determining if a string is a url
*/
if (toWrite()) {
    containsURL() ? webCat(process.argv[4],process.argv[3]) : cat(process.argv[4],process.argv[3]);
}
else{
    containsURL() ? webCat(process.argv[2]) : cat(process.argv[2]);
}

