const mongoose = require("mongoose")

const connectDB = async () => {
    try{
        const connect = await mongoose. connect(process.env.MANGOURI)
        console.log(`MANGODB is connected ${connect.connection.host}`)
    }
    catch(err) {
        console.log(err.message)
    }
}

module.exports=connectDB