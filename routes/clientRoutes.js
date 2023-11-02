const express = require('express');
const router = express.Router();
const client = require('../models/clientModel');
const dateUtil = require('../utils/date');

// Route to add a new client
router.post('/addClient', async (req, res) => {
  try {
    const clientInfo = req.body;
    
    // Create a new client instance
    const newclient = new client({
        customerFirstName: clientInfo.firstName,
        customerLastName: clientInfo.lastName,
        companyName: clientInfo.companyName,
        dateAdded: dateUtil.getTodaysDate(),
        contractDate: clientInfo.contractDate,
        contractPrice: clientInfo.contractPrice,
        contractDuration: clientInfo.contractDuration,
        supplierName: clientInfo.supplierName,
        meetingNotes: [clientInfo.meetingNote]
    })

    // Save the client to the database
    console.log("Successfully created new Client object, saving it to the database ...");
    await newclient.save();
    console.log("New Client object saved successfully");
    res.status(201).json(newclient);

  } catch (error) {
    console.log('Error adding client:', error);
    console.log('This might happen because of some error in the database or duplicate combination of first name and company name already exists');
    res.status(500).json({ error: error});
  }

});

// Route to search for clients by name
router.get('/getClient', async (req, res) => {
  try {
    const query = req.query;
    const name = query.name;
    const regexPattern = new RegExp(name, "i");

    console.log("Name queried : " + name);
    const clients = await client.find({
      $or: [
        { customerFirstName: { $regex: regexPattern } },
        { companyName: { $regex: regexPattern } },
      ],
    });
    console.log("Successfully retrieved clients with name consisting of " + name)

    res.json(clients);
  } catch (error) {
    console.log('Error searching for clients:', error);
    res.status(500).json({ error: 'Could not search for clients' + req.toArray + "ok" + req.query.toString });
  }
});

// Route to add meeting note to a client
router.post('/addMeetingNote', async (req, res) => {
  try {
    const clientInfo = req.body;
    console.log("Received Update request for Client Info : " + clientInfo.customerFirstName + ", " + clientInfo.companyName);

    const filter = { customerFirstName: clientInfo.customerFirstName, companyName: clientInfo.companyName };
    console.log("Filter created based on first name and company name");

    const updateDocument = {
      $push: {
        meetingNotes: {
          $each: [clientInfo.meetingNote],
          $position: 0, // Insert at the first index
        },
      },
    };
    console.log("Update Document field created to push meeting note at index 0");

    const response = await client.updateOne(filter, updateDocument);
    console.log("Client info updated");

    res.status(201).json(response);

  } catch (error) {
    console.log('Error updating client:', error);
    console.log('This might happen because of some error in the database or duplicate combination of first name, last name and company name already exists');
    res.status(500).json({ error: error});
  }

});

module.exports = router;
