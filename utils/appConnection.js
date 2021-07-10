const mongoose = require('mongoose');

const appConnection = async (port) => {
    const URI = process.env['URI'];
    try {
        const connect = await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.clear();
        console.log("\n <===== Connected established with DB =====> \n")
        console.log(`Server Started at port no - ${port}`)
    } catch (e) {
        console.log("\n Could not connect to database. \n Error :- ", e.message);
    }
}

module.exports = { appConnection };