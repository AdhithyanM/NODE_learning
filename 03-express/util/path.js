const path = require('path');

module.exports = path.dirname(require.main.filename);
// helps me construct a path to the parent directory
// dirname returns directory name of a path
// require.main <--- refers to the module that started our application. i.e, the module where we created server.js 
// require.main.filename
// path.dirname(require.main.filename)     <------ kind of variable
// This gives us the path to the file that is responsible for the fact that our application is running