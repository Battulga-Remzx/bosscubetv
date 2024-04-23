const app = require('express')();
const port = 3000; // Use a different port number

app.get('/', (req, res) => res.send('Server is up'));

module.exports = () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};
