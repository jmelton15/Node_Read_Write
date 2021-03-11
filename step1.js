const fs = require('fs');

function cat(path) {
    fs.readFile(path,'utf8',(err,data) => {
        if (err) {
            console.log("There was an Error: ", err);
            process.kill(2);
        }
        console.log(data);
    })
}

/** process.argv[2] grabs the 3rd argument to use as the parameter for this function */
cat(process.argv[2]);