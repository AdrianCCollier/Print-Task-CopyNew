import mongoose from "mongoose";

const birthdaySchema = new mongoose.Schema({
  name: String,
  birthMonth: Number,
  birthDay: Number,
})

/* Some changes
made function asynchronous so we can await database fetch first and not throw errors later
since we don't have the birthday year, it'll be easier to get result with just currMonth and currDay
*/
birthdaySchema.statics.currentBirthdays = async function(){
  const today = new Date();
  // const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); 
  // const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); 
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate(); //Currently not in use. If this is included in query, no birthdays will be shown unless
                                      //the date is specific to someone's birthday. 
  
//   const result = this.find({
//     date: {
//       $gte: startOfMonth,
//       $lt: endOfMonth
//     }
//   }).toArray(); 
//   return result; 
// };

const result = await this.find({
  birthMonth: currentMonth,
  //birthDay: currentDay,
});
return result;
};

const Birthday = mongoose.model('Birthday', birthdaySchema)

export default Birthday;
