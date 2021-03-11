const fs = require('fs');
const axios = require('axios').default;
const errorText = "There was an Error: ";

function cat(path) {
    fs.readFile(path,'utf8',(err,data) => {
        if (err) {
            console.log(errorText, err);
            process.kill(2);
        }
        console.log(data);
    })
}

async function webCat(URL) {
    try {
        let response = await axios.get(URL);
        console.log(response.data);
    } catch(e) {
        console.log(errorText, e)
    }
}

/** This regular expression can be found on regexr.com/37i6s 
 *  It is a common regex for determining if a string is a url
*/
if (process.argv[2].match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
    webCat(process.argv[2]);
}
else {
    cat(process.argv[2]);
}