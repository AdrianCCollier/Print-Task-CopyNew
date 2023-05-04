import express from 'express'
import axios from 'axios'
import { load as cheerioLoad } from 'cheerio'
import path from 'path'
import connectToDatabase from './database/database.js'
import { fileURLToPath } from 'url'
import cors from 'cors'
import ejs from 'ejs'

// changes - Imported Birthday model
import Birthday from './models/Birthday.js'

const app = express()
const PORT = process.env.PORT || 3000
const wepaEndpoint = 'https://cs.wepanow.com/000nmsu146.html&filter='
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.set("views", "public")
app.set('view engine', 'ejs')

connectToDatabase()

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

//List the birthdays from the database 
    // const data = Birthday.currentBirthdays()
    // res.render('index', { data }) 

// changes - Separated index route from /api/wepa-status route to fix server crash error
app.get('/', async(req, res) => {
  try {
    const data = await Birthday.currentBirthdays();
    res.render('index', { data });
  } catch(error) {
    console.error('Error while retrieving birthdays:', error);
    res.status(500).json({ error: 'Failed to fetch birthdays' })
  }
})

app.get('/api/wepa-status', async (req, res) => {
  try {
    const response = await axios.get(wepaEndpoint)
    const $ = cheerioLoad(response.data)
    const redAlerts = $('.round-notif.red p')
    const yellowAlerts = $('.round-notif.yellow p')

    const redCount = redAlerts.length
    const yellowCount = yellowAlerts.length

    res.json({
      printerCount: { red: redCount, yellow: yellowCount },
    })

    

  } catch (error) {
    console.error('Error while retrieving data:', error)
    res.status(500).json({ error: 'Failed to fetch printer' })
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

// Aang's code, commented out for now

// const Printer = require('./models/printers');

// const printers = await Printer.find();

// Update existing printers in the database
// for (const printer of printers) {
//   if (printer.name === 'Red Printer') {
//     printer.status = redCount > 0 ? 'Down' : 'Up';
//     printer.downCount += redCount;
//   } else if (printer.name === 'Yellow Printer') {
//     printer.status = yellowCount > 0 ? 'Down' : 'Up';
//     printer.downCount += yellowCount;
//   }
//   await printer.save();
// }

// Create new printers in the database if they don't exist
// if (printers.length === 0) {
//   await Printer.create([
//     { name: 'Red Printer', status: redCount > 0 ? 'Down' : 'Up', downCount: redCount },
//     { name: 'Yellow Printer', status: yellowCount > 0 ? 'Down' : 'Up', downCount: yellowCount },
//   ]);
// }

// app.get('/api/printers', async (req, res) => {
//   try {
//     const printers = await Printer.find();
//     res.json(printers);
//   } catch (error) {
//     console.error('Error while retrieving printers:', error)
//     res.status(500).json({ error: 'Failed to fetch printers' })
//   }
// });

// app.put('/api/printers/:id', async (req, res) => {
//   const { status, downCount } = req.body;
//   const { id } = req.params;

//   try {
//     const printer = await Printer.findById(id);
//     printer.status = status;
//     printer.downCount = downCount;
//     await printer.save();
//     res.json(printer);
//   } catch (error) {
//     console.error(`Error while updating printer ${id}:`, error);
//     res.status(500).json({ error: `Failed to update printer ${id}` });
//   }
// });
