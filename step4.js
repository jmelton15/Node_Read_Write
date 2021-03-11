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

function containsURL(arg) {
    return arg.match(urlRegex) ? true : false;
}

/**
 * Function that writes to the same file, but writes every arg given in the command line
 * requires format of:
 * 
 * node <.js file> <path/new_file_name> <URL/read_file> <URL/read_file> ... 
 */
process.argv.forEach((arg,i) => {
    if (i >= 3) {
        containsURL(arg) ? webCat(arg,process.argv[2]) : cat(arg,process.argv[2]);
    }
});
