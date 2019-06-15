const multer = require('multer');
const path = require('path');
const crypto = require('crypto');


module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function (req, file, callback) {
            
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);
                
                // change to name file
                // include hash    
                let fileName = file.originalname.replace(/\s/g, '-'); // change space for hífen
                const [name, extension] = fileName.split('.');
                fileName = `${name}-${hash.toString("hex")}.${extension}`;
                callback(null, fileName);
            });    
        }
    })
}