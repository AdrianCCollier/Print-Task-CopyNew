// The purpose of this file is to define the code that connects to the database, so that we can just import this file and call connectToDatabase() in other files instead of rewriting this below code everywhere

import mongoose from 'mongoose'

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://wepa:MYLEG@wepacluster.34pyobq.mongodb.net/test',
      {
        useNewUrlParser: true,
      });
      console.log('Successfully connected to the Database');
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
};

export default connectToDatabase;
