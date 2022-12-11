const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

router.get("/", (req, res, next) => {
    // we will serve the static html code shop.html when req is received to uri path '/'
    // res.sendFile('./views/shop.html');   // won't work - path must be absolute
    // res.sendFile('/views/shop.html');    // won't work - this lookup in OS level and not our root folder level
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));      // works
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));       // also works
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));                  // other way to work with

    // path.join() yields/returns us a path by concatenating the different segments.
    // __dirname <---- a global variable which holds the absolute path on our OS to this project folder.
    //   ../ <--- going one level up 
});

module.exports = router;