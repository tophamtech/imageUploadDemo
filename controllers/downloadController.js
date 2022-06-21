const log = require('../utils/logger')

// Basic function for downloading file extracted from URL path
function downloadEntry(req, res, next){
    log.info('Download controller hit')
    const file = `${__dirname}/../uploads/${req.params.imageID}`;
    res.download(file, (err) => {
        if (err) {log.error(`Download controller error: ${err}`)}
    })
}

module.exports = downloadEntry;