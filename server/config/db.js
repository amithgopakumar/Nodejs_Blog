
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB;

const connectDB = async () => {
        try {
            mongoose.set('strictQuery', false);
            const conn = await mongoose.connect(mongoURI);
            console.log(`Database Connected: ${conn.connection.host}`);
        } catch (error) {
            console.log(error);
        }
    }
    
    
    
module.exports = connectDB;