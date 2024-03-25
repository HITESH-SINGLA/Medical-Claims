require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL Pool Setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

// Home Route
app.get('/', (req, res) => {
  res.send('onepieceisreal');
});

// Login Route
app.post('/login', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT COUNT(*) FROM login WHERE email = $1', [email]);
    const isExist = 1;
    client.release();

    if (parseInt(isExist) === 0) {
      return res.status(200).json({ message: 'User does not exist.' });
    }

    // Assuming mail sending is disabled for demonstration
    // const mailOptions = {
    //   from: process.env.MAIL_USERNAME,
    //   to: email,
    //   subject: 'Login OTP',
    //   text: `Your OTP is ${otp}.`,
    // };
    // transporter.sendMail(mailOptions);

    res.json({ message: 'An OTP has been sent to your email.', otp: otp });
  } catch (err) {
    console.error('Database query error', err.stack);
    res.status(500).send('Error checking user existence');
  }
});

// User Existence Check Route
app.post('/userexist', async (req, res) => {
  const { email } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT COUNT(*) FROM login WHERE email = $1', [email]);
    const isExist = result.rows[0].count;
    client.release();

    res.json({ isexist: parseInt(isExist) });
  } catch (err) {
    console.error('Database query error', err.stack);
    res.status(500).send('Error checking user existence');
  }
});

// Send OTP Route
app.post('/sendotp', async (req, res) => {
  const { email, otp } = req.body;
  
  // Assuming mail sending is disabled for demonstration
  // const mailOptions = {
  //   from: process.env.MAIL_USERNAME,
  //   to: email,
  //   subject: 'Login OTP',
  //   text: `Your OTP is ${otp}.`,
  // };
  // transporter.sendMail(mailOptions);

  res.json({ message: 'OTP sent successfully.' });
});

// Basic Details Route
app.post('/basicDetails', async (req, res) => {
  const { user } = req.body;
  const emailId = user.email;
  const data = JSON.stringify(req.body);

  try {
    const client = await pool.connect();
    const checkExist = await client.query('SELECT COUNT(*) FROM basicdetails WHERE user_id = $1', [emailId]);
    const isExist = checkExist.rows[0].count;

    let query;
    if (parseInt(isExist) === 0) {
      query = 'INSERT INTO basicdetails(user_id, data) VALUES($1, $2)';
    } else {
      query = 'UPDATE basicdetails SET data = $2 WHERE user_id = $1';
    }
    await client.query(query, [emailId, data]);
    client.release();

    res.json({ status: "ok", result: "basic details updated" });
  } catch (err) {
    console.error('Database query error', err.stack);
    res.status(500).send('Error handling basic details');
  }
});


// Get Basic Details Route
app.post('/getbasicDetails', async (req, res) => {
    const { user } = req.body;
    const emailId = user.email;
  
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT data FROM basicdetails WHERE user_id = $1', [emailId]);
      client.release();
  
      if (result.rows.length > 0) {
        res.json({ status: "ok", result: result.rows[0].data });
      } else {
        res.json({ status: "ok", result: { user: { address: "", email: "", employee_code_no: "", martial_status: "", name: "", partner_place: "", pay: "" } } });
      }
    } catch (err) {
      console.error('Database query error', err.stack);
      res.status(500).send('Error fetching basic details');
    }
  });
  
  // Check User Route
  app.post('/check_user', async (req, res) => {
    const { user } = req.body;
    const email = user.email;
    const pageNo = user.page_no;
  
    try {
      const client = await pool.connect();
      let query;
      let params = [email, JSON.stringify(user)];
  
      if (pageNo === 1) {
        query = 'INSERT INTO application(user_id, page1, page2, page3, page4, status) VALUES($1, $2, \'{}\', \'{}\', \'{}\', \'PENDING\') RETURNING application_id';
      } else {
        query = `UPDATE application SET page${pageNo} = $2 WHERE user_id = $1 AND application_id = (SELECT application_id FROM application WHERE user_id = $1 ORDER BY application_id DESC LIMIT 1)`;
      }
  
      const result = await client.query(query, params);
      client.release();
  
      res.json({ status: "ok", message: "User check/update successful", applicationId: pageNo === 1 ? result.rows[0].application_id : undefined });
    } catch (err) {
      console.error('Database query error', err.stack);
      res.status(500).send('Error processing user check');
    }
  });
  
  // Update Status Route
  app.post('/updateStatus', async (req, res) => {
    const { authorityUser } = req.body;
    const applicationId = authorityUser.application_id;
    const statusToUpdate = authorityUser.applicationStatus;
    const remarks = authorityUser.remarks;
    const authorityRole = authorityUser.email.includes('pharmacist') ? 'pharmacist' :
                          authorityUser.email.includes('medical.officer') ? 'medical_officer' :
                          authorityUser.email.includes('junioracc') ? 'DA_JAO' :
                          authorityUser.email.includes('assessing.officer') ? 'AO' :
                          authorityUser.email.includes('senior.audit') ? 'Sr_AO' :
                          authorityUser.email.includes('registrar.officer') ? 'registrar' :
                          authorityUser.email.includes('director') ? 'director' : '';
  
    if (!authorityRole) {
      return res.status(400).json({ status: "error", message: "Invalid authority role" });
    }
  
    try {
      const client = await pool.connect();
      const query = `UPDATE application SET ${authorityRole} = $1, ${authorityRole}_remarks = $2 WHERE application_id = $3`;
      await client.query(query, [statusToUpdate, remarks, applicationId]);
      client.release();
  
      res.json({ status: "ok", message: "Status updated successfully" });
    } catch (err) {
      console.error('Database query error', err.stack);
      res.status(500).send('Error updating status');
    }
  });
  
  app.post('/getData', async (req, res) => {
    const { user_data } = req.body;
    if (!user_data) {
      return res.status(400).send({ status: 'error', message: 'User data is missing.' });
    }
  
    try {
      const { rows } = await pool.query('SELECT * FROM application WHERE user_id = $1 ORDER BY application_id ASC', [user_data.email]);
      const responseData = rows.map(row => ({ page1: JSON.parse(row.page1), page2: JSON.parse(row.page2), page3: JSON.parse(row.page3), page4: JSON.parse(row.page4) }));
      res.json({ status: "ok", data: responseData });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
  });
  
  app.post('/getApplicationId', async (req, res) => {
    const { currentUser } = req.body;
    if (!currentUser) {
      return res.status(400).send({ status: 'error', message: 'Current user data is missing.' });
    }
  
    try {
      const { rows } = await pool.query('SELECT application_id FROM application WHERE user_id = $1 ORDER BY application_id ASC', [currentUser.email]);
      const resultArr = rows.map(row => ({ applicationId: row.application_id }));
      res.json({ status: "ok", result: resultArr });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
  });
  
  app.post('/getallApplicationIdFromPharmacist', async (req, res) => {
    const { user_data } = req.body;
    if (!user_data) {
      return res.status(400).send({ status: 'error', message: 'User data is missing.' });
    }
  
    try {
      const { rows } = await pool.query('SELECT application_id FROM application WHERE pharmacist = \'approved\'');
      const resultArr = rows.map(row => ({ applicationId: row.application_id }));
      res.json({ status: "ok", result: resultArr });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
  });
  



  app.post('/getallApplicationIdFromMedicalOff', async (req, res) => {
    const { user_data } = req.body;
    if (!user_data) {
      return res.status(400).send({ status: 'error', message: 'User data is missing.' });
    }
  
    try {
      const { rows } = await pool.query("SELECT application_id FROM application WHERE medical_officer = 'approved'");
      const resultArr = rows.map(row => ({ applicationId: row.application_id }));
      res.json({ status: "ok", result: resultArr });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
  });
  
  app.post('/getallApplicationIdFromAccSec', async (req, res) => {
    const { user_data } = req.body;
    if (!user_data) {
      return res.status(400).send({ status: 'error', message: 'User data is missing.' });
    }
  
    try {
      const { rows } = await pool.query("SELECT application_id FROM application WHERE accountsection = 'approved'");
      const resultArr = rows.map(row => ({ applicationId: row.application_id }));
      res.json({ status: "ok", result: resultArr });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
  });
  
  app.post('/getallApplicationIdFromDAorJAO', async (req, res) => {
    const { user_data } = req.body;
    if (!user_data) {
      return res.status(400).send({ status: 'error', message: 'User data is missing.' });
    }
  
    try {
      const { rows } = await pool.query("SELECT application_id FROM application WHERE \"DA_JAO\" = 'approved'");
      const resultArr = rows.map(row => ({ applicationId: row.application_id }));
      res.json({ status: "ok", result: resultArr });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
  });
  

  app.post('/getallApplicationIdFromAO', async (req, res) => {
    const { user_data } = req.body;
    try {
      const { rows } = await pool.query("SELECT application_id FROM application WHERE AO = 'approved'");
      const resultArr = rows.map(row => ({ applicationId: row.application_id }));
      res.json({ status: "ok", result: resultArr });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
  });
  
  app.post('/getallApplicationIdFromSrAo', async (req, res) => {
    const { user_data } = req.body;
    try {
      const { rows } = await pool.query("SELECT application_id FROM application WHERE Sr_AO = 'approved'");
      const resultArr = rows.map(row => ({ applicationId: row.application_id }));
      res.json({ status: "ok", result: resultArr });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
  });
  
  app.post('/showApplicationId/:id', async (req, res) => {
    const id = req.params.id;
    const { user_data } = req.body;
    try {
      const { rows } = await pool.query("SELECT * FROM application WHERE application_id = $1 AND user_id = $2", [id, user_data.email]);
      if (rows.length > 0) {
        const application = rows[0];
        res.json({ status: "ok", page1: JSON.parse(application.page1), page2: JSON.parse(application.page2), page3: JSON.parse(application.page3), page4: JSON.parse(application.page4) });
      } else {
        res.status(404).send({ status: 'error', message: 'Application not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
  });
  
  app.post('/getallApplicationId', async (req, res) => {
    const { user_data } = req.body;
    try {
      const { rows } = await pool.query("SELECT * FROM application WHERE pharmacist <> 'approved' ORDER BY application_id ASC");
      const resultArr = rows.map(row => ({ applicationId: row.application_id, page1: JSON.parse(row.page1), status: row.pharmacist }));
      res.json({ status: "ok", result: resultArr });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
  });
  
  app.post('/getallApplicationIdForHome', async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ status: "error", message: "Email not provided in request" });
    }
  
    try {
      const { rows } = await pool.query("SELECT * FROM application WHERE user_id = $1", [email]);
      const resultArr = rows.map(item => ([item.application_id, item[4], item[6], item[8], item[10], item[16]])); // Adjust column names as needed
      res.json({ status: "ok", result: rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
  });
  
  app.post('/getallApprovedApplicationId', async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ status: "error", message: "Email not provided" });
    }
  
    try {
      const { rows } = await pool.query("SELECT * FROM application WHERE user_id = $1 AND director = 'approved' ORDER BY application_id ASC", [email]);
      // Logic to process rows as needed, potentially filtering based on additional conditions
      res.json({ status: "ok", result: rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
  });
  
  app.post('/getallApprovedApplicationIdFromPharmacist', async (req, res) => {
    const { user_data } = req.body;
    if (!user_data || !user_data.email) {
      return res.status(400).json({ status: "error", message: "Email not provided" });
    }
  
    try {
      const { rows } = await pool.query("SELECT * FROM application WHERE pharmacist = 'approved' ORDER BY application_id ASC");
      const resultArr = rows.map(item => ([item.application_id, item.column4])); // Adjust column names as needed
      res.json({ status: "ok", result: resultArr });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
  });
  





  app.all('/getallApplicationIdForMedicalOff', async (req, res) => {
    if (req.method === 'POST') {
      try {
        const request_data = req.body;
        if (!request_data) {
          console.log('Error in reading request data');
          return res.status(400).json({ status: 'Error in reading request data' });
        }
  
        const query = `
          SELECT * 
          FROM application 
          WHERE pharmacist = 'approved' 
          AND medical_officer <> 'approved' 
          ORDER BY application_id ASC;
        `;
        const { rows } = await pool.query(query);
        const result_arr = rows.map(item => [String(item.application_id), item[4], item[8]]);
        return res.json({ status: "ok", result: result_arr });
      } catch (error) {
        console.error('Error executing query', error.stack);
        return res.status(500).json({ status: "Error fetching applications" });
      }
    } else {
      return res.json({ status: "getallApplicationIdForMedicalOff working" });
    }
  });
  
  // Route 2: Get all Approved Application IDs from Medical Officer
  app.all('/getallApprovedApplicationIdFromMedicalOff', async (req, res) => {
    if (req.method === 'POST') {
      try {
        const request_data = req.body;
        if (!request_data) {
          return res.status(400).json({ status: 'Error in reading request data' });
        }
  
        const query = `
          SELECT * 
          FROM application 
          WHERE medical_officer='approved' 
          ORDER BY application_id ASC;
        `;
        const { rows } = await pool.query(query);
        const result_arr = rows.map(item => [String(item.application_id), item[4]]);
        return res.json({ status: "ok", result: result_arr });
      } catch (error) {
        console.error('Error executing query', error.stack);
        return res.status(500).json({ status: "Error fetching approved applications" });
      }
    } else {
      return res.json({ status: "getallApprovedApplicationIdFromMedicalOff working" });
    }
  });
  
  // Route 3: Get all Application IDs for DA or JAO
  app.all('/getallApplicationIdForDAorJAO', async (req, res) => {
    if (req.method === 'POST') {
      try {
        const request_data = req.body;
        if (!request_data) {
          return res.status(400).json({ status: 'Error in reading request data' });
        }
  
        const query = `
          SELECT * 
          FROM application 
          WHERE medical_officer = 'approved' 
          AND "DA_JAO" <> 'approved' 
          ORDER BY application_id ASC;
        `;
        const { rows } = await pool.query(query);
        const result_arr = rows.map(item => [String(item.application_id), item[4], item[10]]);
        return res.json({ status: "ok", result: result_arr });
      } catch (error) {
        console.error('Error executing query', error.stack);
        return res.status(500).json({ status: "Error fetching applications for DA or JAO" });
      }
    } else {
      return res.json({ status: "getallApplicationIdForDAorJAO working" });
    }
  });
  

















// Additional Route 1: Get all Approved Application IDs from DA or JAO
app.all('/getallApprovedApplicationIdFromDAorJAO', async (req, res) => {
    if (req.method === 'POST') {
      try {
        const request_data = req.body;
        if (!request_data) {
          return res.status(400).json({ status: 'Error in reading request data' });
        }
  
        const query = `
          SELECT * 
          FROM application 
          WHERE "DA_JAO" = 'approved' 
          ORDER BY application_id ASC;
        `;
        const { rows } = await pool.query(query);
        const result_arr = rows.map(item => [String(item.application_id), item[4], item[10]]);
        return res.json({ status: "ok", result: result_arr });
      } catch (error) {
        console.error('Error executing query', error.stack);
        return res.status(500).json({ status: "Error fetching applications from DA or JAO" });
      }
    } else {
      return res.json({ status: "getallApprovedApplicationIdFromDAorJAO working" });
    }
  });
  
  // Additional Route 2: Get all Application IDs for AO
  app.all('/getallApplicationIdForAO', async (req, res) => {
    if (req.method === 'POST') {
      try {
        const request_data = req.body;
        if (!request_data) {
          return res.status(400).json({ status: 'Error in reading request data' });
        }
  
        const query = `
          SELECT * 
          FROM application 
          WHERE "DA_JAO" = 'approved' AND "AO" <> 'approved' 
          ORDER BY application_id ASC;
        `;
        const { rows } = await pool.query(query);
        const result_arr = rows.map(item => [String(item.application_id), item[4], item[12]]); // Assuming field12 is correct
        return res.json({ status: "ok", result: result_arr });
      } catch (error) {
        console.error('Error executing query', error.stack);
        return res.status(500).json({ status: "Error fetching applications for AO" });
      }
    } else {
      return res.json({ status: "getallApplicationIdForAO working" });
    }
  });
  
  // Additional Route 3: Get all Approved Application IDs from AO
  app.all('/getallApprovedApplicationIdFromAO', async (req, res) => {
    if (req.method === 'POST') {
      try {
        const request_data = req.body;
        if (!request_data) {
          return res.status(400).json({ status: 'Error in reading request data' });
        }
  
        const query = `
          SELECT * 
          FROM application 
          WHERE "AO" = 'approved' 
          ORDER BY application_id ASC;
        `;
        const { rows } = await pool.query(query);
        const result_arr = rows.map(item => [String(item.application_id), item[4], item[12]]);
        return res.json({ status: "ok", result: result_arr });
      } catch (error) {
        console.error('Error executing query', error.stack);
        return res.status(500).json({ status: "Error fetching approved applications from AO" });
      }
    } else {
      return res.json({ status: "getallApprovedApplicationIdFromAO working" });
    }
  });
  
  // Additional Route 4: Get all Application IDs for SrAO with conditions
  app.all('/getallApplicationIdForSrAO', async (req, res) => {
    if (req.method === 'POST') {
      try {
        const request_data = req.body;
        if (!request_data) {
          return res.status(400).json({ status: 'Error in reading request data' });
        }
  
        const query = `
          SELECT * 
          FROM application 
          WHERE "AO" = 'approved' AND "Sr_AO" <> 'approved' 
          ORDER BY application_id ASC;
        `;
        const { rows } = await pool.query(query);
        const result_arr = rows.filter(item => {
          const userJson = JSON.parse(item[4]); // Assuming field4 contains the JSON with user data
          const netAmntClaimed = parseInt(userJson.user.netAmntClaimed || "0", 10);
          return netAmntClaimed >= 50000;
        }).map(item => [item.application_id, item[4]]);
  
        return res.json({ status: "ok", result: result_arr });
      } catch (error) {
        console.error('Error executing query', error.stack);
        return res.status(500).json({ status: "Error fetching applications for SrAO" });
    }
  } else {
    return res.json({ status: "getallApplicationIdForSrAO working" });
  }
});


















// Get all Approved Application IDs from SrAO
app.all('/getallApprovedApplicationIdFromSrAO', async (req, res) => {
    if (req.method === 'POST') {
      try {
        const request_data = req.body;
        if (!request_data) {
          return res.status(400).json({ status: 'Error in reading request data' });
        }
  
        const query = `
          SELECT * 
          FROM application 
          WHERE "Sr_AO" = 'approved' 
          ORDER BY application_id ASC;
        `;
        const { rows } = await pool.query(query);
        const result_arr = rows.map(item => [String(item.application_id), item[4]]); // Assuming field4 is the user data
        return res.json({ status: "ok", result: result_arr });
      } catch (error) {
        console.error('Error executing query', error.stack);
        return res.status(500).json({ status: "Error fetching applications approved by SrAO" });
      }
    } else {
      return res.json({ status: "getallApprovedApplicationIdFromSrAO working" });
    }
  });
  
  // Get all Application IDs for Registrar with Conditions
  app.all('/getallApplicationIdForRegistrar', async (req, res) => {
    if (req.method === 'POST') {
      try {
        const request_data = req.body;
        if (!request_data) {
          return res.status(400).json({ status: 'Error in reading request data' });
        }
  
        // Combine two queries for applications where AO is approved but below 50000, and where Sr_AO is approved, excluding those already approved by registrar
        const query = `
          SELECT * 
          FROM application 
          WHERE "AO" = 'approved' AND registrar <> 'approved' 
          OR ("Sr_AO" = 'approved' AND registrar <> 'approved') 
          ORDER BY application_id ASC;
        `;
        const { rows } = await pool.query(query);
        const result_arr = rows.filter(item => {
          const userJson = JSON.parse(item[4]); // Assuming field4 contains the JSON with user data
          const netAmntClaimed = parseInt(userJson.user.netAmntClaimed || "0", 10);
          return netAmntClaimed >= 50000 || item.sr_ao === 'approved';
        }).map(item => [item.application_id,item[4], item[16]]); // field16 is assumed to be relevant data
        
        return res.json({ status: "ok", result: result_arr });
      } catch (error) {
        console.error('Error executing query', error.stack);
        return res.status(500).json({ status: "Error fetching applications for Registrar" });
      }
    } else {
      return res.json({ status: "getallApplicationIdForRegistrar working" });
    }
  });
  
  // Get all Approved Application IDs from Registrar
  app.all('/getallApprovedApplicationIdFromRegistrar', async (req, res) => {
    if (req.method === 'POST') {
      try {
        const request_data = req.body;
        if (!request_data) {
          return res.status(400).json({ status: 'Error in reading request data' });
        }
  
        const query = `
          SELECT * 
          FROM application 
          WHERE "registrar" = 'approved' 
          ORDER BY application_id ASC;
        `;
        const { rows } = await pool.query(query);
        const result_arr = rows.map(item => [String(item.application_id), item[4], item[16]]); // Adjust field names as necessary
        return res.json({ status: "ok", result: result_arr });
      } catch (error) {
        console.error('Error executing query', error.stack);
        return res.status(500).json({ status: "Error fetching applications approved by Registrar" });
      }
    } else {
      return res.json({ status: "getallApprovedApplicationIdFromRegistrar working" });
    }
  });











// Get all Approved Application IDs from SrAO
app.all('/getallApprovedApplicationIdFromSrAO', async (req, res) => {
  if (req.method === 'POST') {
    try {
      const request_data = req.body;
      if (!request_data) {
        return res.status(400).json({ status: 'Error in reading request data' });
      }

      const query = `SELECT * FROM application WHERE "Sr_AO" = 'approved' ORDER BY application_id ASC;`;
      const { rows } = await pool.query(query);
      const result_arr = rows.map(item => [String(item[0]), item[4]]); // Access by index
      return res.json({ status: "ok", result: result_arr });
    } catch (error) {
      console.error('Error executing query', error.stack);
      return res.status(500).json({ status: "Error fetching applications approved by SrAO" });
    }
  } else {
    return res.json({ status: "getallApprovedApplicationIdFromSrAO working" });
  }
});

// Get all Application IDs for Registrar with Conditions
app.all('/getallApplicationIdForRegistrar', async (req, res) => {
  if (req.method === 'POST') {
    try {
      const request_data = req.body;
      if (!request_data) {
        return res.status(400).json({ status: 'Error in reading request data' });
      }

      // Since you're accessing by index, ensure your query selects columns in the order you expect
      const query = `SELECT * FROM application WHERE "AO" = 'approved' AND registrar <> 'approved' OR ("Sr_AO" = 'approved' AND registrar <> 'approved') ORDER BY application_id ASC;`;
      const { rows } = await pool.query(query);
      const result_arr = rows.map(item => [String(item[0]), item[4], item[16]]); // Adjust based on actual column indices
      return res.json({ status: "ok", result: result_arr });
    } catch (error) {
      console.error('Error executing query', error.stack);
      return res.status(500).json({ status: "Error fetching applications for Registrar" });
    }
  } else {
    return res.json({ status: "getallApplicationIdForRegistrar working" });
  }
});

// Get all Approved Application IDs from Registrar
app.all('/getallApprovedApplicationIdFromRegistrar', async (req, res) => {
  if (req.method === 'POST') {
    try {
      const request_data = req.body;
      if (!request_data) {
        return res.status(400).json({ status: 'Error in reading request data' });
      }

      const query = `SELECT * FROM application WHERE "registrar" = 'approved' ORDER BY application_id ASC;`;
      const { rows } = await pool.query(query);
      const result_arr = rows.map(item => [String(item[0]), item[4], item[16]]); // Adjust based on actual column indices
      return res.json({ status: "ok", result: result_arr });
    } catch (error) {
      console.error('Error executing query', error.stack);
      return res.status(500).json({ status: "Error fetching applications approved by Registrar" });
    }
  } else {
    return res.json({ status: "getallApprovedApplicationIdFromRegistrar working" });
  }
});



// Route: Get all Application IDs for Director
app.all('/getallApplicationIdForDirector', async (req, res) => {
    if (req.method === 'POST') {
        const { user_data } = req.body;
        if (!user_data || !user_data.email) {
            console.log('Error in reading request data');
            return res.json({ status: 'Error in reading request data' });
        }

        const query = `SELECT application_id FROM application WHERE "registrar"='approved' AND "director"<>'approved' ORDER BY application_id ASC`;
        const result = await pool.query(query);

        const dataQuery = `SELECT "application_id","table_data" FROM data`;
        const resultData = await pool.query(dataQuery);

        const resultArr = [];
        for (const item of result.rows) {
            const p = item.application_id;
            for (const data of resultData.rows) {
                if (data.application_id === p) {
                    try {
                        const ajso = JSON.parse(data.table_data);
                        const amntt = parseInt(ajso.total2 || '0');
                        resultArr.push([p.toString(), amntt]);
                    } catch (error) {
                        console.log(`Error: 'total2' not found in JSON data for application_id ${p}`);
                        continue;
                    }
                    break;
                }
            }
        }

        return res.json({ status: 'ok', result: resultArr });
    }

    return res.json({ status: 'getallApplicationIdForDirector working' });
});

// Route: Get all Approved Application IDs from Director
app.all('/getallApprovedApplicationIdFromDirector', async (req, res) => {
    if (req.method === 'POST') {
        const { user_data } = req.body;
        if (!user_data || !user_data.email) {
            console.log('Error in reading request data');
            return res.json({ status: 'Error in reading request data' });
        }

        const query = `SELECT application_id FROM application WHERE "director"='approved' ORDER BY application_id ASC`;
        const result = await pool.query(query);

        return res.json({ status: 'ok', result: result.rows });
    }

    return res.json({ status: 'getallApprovedApplicationIdFromDirector working' });
});

// Route: Show all Application IDs
app.all('/showallApplicationId/:id', async (req, res) => {
    if (req.method === 'POST') {
        const id = req.params.id;
        const { user_data } = req.body;
        if (!user_data || !user_data.email) {
            console.log('Error in reading request data');
            return res.json({ status: 'Error in reading request data' });
        }

        const query = `SELECT * FROM application WHERE application_id = $1`;
        const result = await pool.query(query, [id]);

        return res.json({
            status: 'ok',
            page1: JSON.parse(result.rows[0].page1),
            page2: JSON.parse(result.rows[0].page2),
            page3: JSON.parse(result.rows[0].page3),
            page4: JSON.parse(result.rows[0].page4),
        });
    }

    return res.json({ status: 'ok', result: 'showallapplication is working' });
});


// Route: Show Application ID Status
app.all('/showApplicationIdStatus/:id', async (req, res) => {
    const id = req.params.id;
    const email = req.body.user_data.email;
    
    // Query for pharmacist approval
    const pharmacistQuery = `SELECT pharmacist, pharmacist_remarks FROM application WHERE application_id = ${id} AND user_id = '${email}'`;
    const pharmacistResult = await database.query(pharmacistQuery);
    const pharmacistStatus = pharmacistResult[0].pharmacist;
    const pharmacistRemarks = pharmacistResult[0].pharmacist_remarks;
    
    // Query for medical officer approval
    const medicalOfficerQuery = `SELECT medical_officer, medical_officer_remarks FROM application WHERE application_id = ${id} AND user_id = '${email}'`;
    const medicalOfficerResult = await database.query(medicalOfficerQuery);
    const medicalOfficerStatus = medicalOfficerResult[0].medical_officer;
    const medicalOfficerRemarks = medicalOfficerResult[0].medical_officer_remarks;
    
    // Query for D.A./JAO approval
    const daJaoQuery = `SELECT "DA_JAO", "DA_JAO_remarks" FROM application WHERE application_id = ${id} AND user_id = '${email}'`;
    const daJaoResult = await database.query(daJaoQuery);
    const daJaoStatus = daJaoResult[0].DA_JAO;
    const daJaoRemarks = daJaoResult[0].DA_JAO_remarks;
    
    // Query for AO approval
    const aoQuery = `SELECT "AO", "AO_remarks" FROM application WHERE application_id = ${id} AND user_id = '${email}'`;
    const aoResult = await database.query(aoQuery);
    const aoStatus = aoResult[0].AO;
    const aoRemarks = aoResult[0].AO_remarks;
    
    // Query for Sr.AO approval
    const srAoQuery = `SELECT "Sr_AO", "Sr_AO_remarks" FROM application WHERE application_id = ${id} AND user_id = '${email}'`;
    const srAoResult = await database.query(srAoQuery);
    const srAoStatus = srAoResult[0].Sr_AO;
    const srAoRemarks = srAoResult[0].Sr_AO_remarks;
    
    // Query for Registrar approval
    const registrarQuery = `SELECT "registrar", "registrar_remarks" FROM application WHERE application_id = ${id} AND user_id = '${email}'`;
    const registrarResult = await database.query(registrarQuery);
    const registrarStatus = registrarResult[0].registrar;
    const registrarRemarks = registrarResult[0].registrar_remarks;
    
    // Query for Director approval
    const directorQuery = `SELECT "director", "director_remarks" FROM application WHERE application_id = ${id} AND user_id = '${email}'`;
    const directorResult = await database.query(directorQuery);
    const directorStatus = directorResult[0].director;
    const directorRemarks = directorResult[0].director_remarks;
    
    let authority = '';
    let authorityRemarks = '';
    let isHold = 'no';
    
    // Determine the current authority and remarks based on the approval status
    if (pharmacistStatus === 'approved') {
        authority = 'Pharmacist has approved your application.';
        authorityRemarks = pharmacistRemarks;
    } else if (pharmacistStatus === 'hold') {
        authority = 'Pharmacist has put your application on hold.';
        authorityRemarks = pharmacistRemarks;
        isHold = 'yes';
    } else if (pharmacistStatus === 'rejected') {
        authority = 'Pharmacist has rejected your application.';
        authorityRemarks = pharmacistRemarks;
    } else if (medicalOfficerStatus === 'approved') {
        authority = 'Medical Officer has approved your application.';
        authorityRemarks = medicalOfficerRemarks;
    } else if (medicalOfficerStatus === 'hold') {
        authority = 'Medical Officer has put your application on hold.';
        authorityRemarks = medicalOfficerRemarks;
        isHold = 'yes';
    } else if (medicalOfficerStatus === 'rejected') {
        authority = 'Medical Officer has rejected your application.';
        authorityRemarks = medicalOfficerRemarks;
    } else if (daJaoStatus === 'approved') {
        authority = 'D.A./JAO has approved your application.';
        authorityRemarks = daJaoRemarks;
    } else if (daJaoStatus === 'hold') {
        authority = 'D.A./JAO has put your application on hold.';
        authorityRemarks = daJaoRemarks;
        isHold = 'yes';
    } else if (daJaoStatus === 'rejected') {
        authority = 'D.A./JAO has rejected your application.';
        authorityRemarks = daJaoRemarks;
    } else if (aoStatus === 'approved') {
        authority = 'A.O. has approved your application.';
        authorityRemarks = aoRemarks;
    } else if (aoStatus === 'hold') {
        authority = 'A.O. has put your application on hold.';
        authorityRemarks = aoRemarks;
        isHold = 'yes';
    } else if (aoStatus === 'rejected') {
        authority = 'A.O. has rejected your application.';
        authorityRemarks = aoRemarks;
    } else if (srAoStatus === 'approved') {
        authority = 'Sr.A.O.(Audit) has approved your application.';
        authorityRemarks = srAoRemarks;
    } else if (srAoStatus === 'hold') {
        authority = 'Sr.A.O.(Audit) has put your application on hold.';
        authorityRemarks = srAoRemarks;
        isHold = 'yes';
    } else if (srAoStatus === 'rejected') {
        authority = 'Sr.A.O.(Audit) has rejected your application.';
        authorityRemarks = srAoRemarks;
    } else if (registrarStatus === 'approved') {
        authority = 'Registrar has approved your application.';
        authorityRemarks = registrarRemarks;
    } else if (registrarStatus === 'hold') {
        authority = 'Registrar has put your application on hold.';
        authorityRemarks = registrarRemarks;
        isHold = 'yes';
    } else if (registrarStatus === 'rejected') {
        authority = 'Registrar has rejected your application.';
        authorityRemarks = registrarRemarks;
    } else if (directorStatus === 'approved') {
        authority = 'Director has approved your application.';
        authorityRemarks = directorRemarks;
    } else if (directorStatus === 'hold') {
        authority = 'Director has put your application on hold.';
        authorityRemarks = directorRemarks;
        isHold = 'yes';
    } else if (directorStatus === 'rejected') {
        authority = 'Director has rejected your application.';
        authorityRemarks = directorRemarks;
    }
    
    res.json({
        status: 'ok',
        current_auth: authority,
        current_auth_remarks: authorityRemarks,
        isHold: isHold
    });
});







app.post('/update_data_from_accountsection', async (req, res) => {
    const request_data = req.body;
    if (!request_data) {
        res.status(400).json({ error: 'Error in request data' });
        return;
    }

    const { user } = request_data;
    const { application_id } = user;
    const table_data = JSON.stringify(user);

    try {
        const query1 = `SELECT COUNT(*) FROM data WHERE application_id = $1`;
        const result = await pool.query(query1, [application_id]);

        if (result.rows[0].count === '0') {
            const query = `INSERT INTO data (application_id, table_data) VALUES ($1, $2)`;
            await pool.query(query, [application_id, table_data]);
        } else {
            const query = `UPDATE data SET table_data = $1 WHERE application_id = $2`;
            await pool.query(query, [table_data, application_id]);
        }

        res.json({ status: 'update_data_from_accountsection worked fine' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/getData_from_accounttable/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = `SELECT * FROM data WHERE application_id = $1`;
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Data not found' });
        } else {
            const user = JSON.parse(result.rows[0].table_data);
            res.json({ status: 'ok', user });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route: Resubmit Application
app.post('/resubmitApplication', async (req, res) => {
    const request_data = req.body;
    if (!request_data) {
        console.log('Error in request data');
        return res.status(400).json({ status: 'error', message: 'Invalid request data' });
    }

    const { application_id, page1, page2, page3, page4 } = request_data;

    try {
        // Update application data in the database
        const updateQuery = `UPDATE application SET page1 = $1, page2 = $2, page3 = $3, page4 = $4 WHERE application_id = $5`;
        await pool.query(updateQuery, [page1, page2, page3, page4, application_id]);

        return res.status(200).json({ status: 'success', message: 'Application resubmitted successfully' });
    } catch (error) {
        console.log('Error in resubmitting application:', error);
        return res.status(500).json({ status: 'error', message: 'Failed to resubmit application' });
    }
});



// Route: Get Application ID
app.post('/get_application_id', async (req, res) => {
    const request_data = req.body;
    if (!request_data) {
        res.status(400).json({ status: 'error', message: 'Invalid request data' });
        return;
    }

    const { email1 } = request_data;
    const email = `'${email1}'`;

    try {
        const query = `SELECT application_id FROM application WHERE user_id = ${email} ORDER BY application_id DESC`;
        const result = await pool.query(query);
        const recent_id = result.rows[0].application_id;

        res.json({ status: 'ok', id: recent_id });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

// Route: Get Remarks
app.post('/getRemarks/:id', async (req, res) => {
    const { id } = req.params;
    const request_data = req.body;
    if (!request_data) {
        res.status(400).json({ status: 'error', message: 'Invalid request data' });
        return;
    }

    const { authorityUser } = request_data;
    const { email } = authorityUser;

    try {
        let query = '';
        switch (email) {
            case 'pharmacistxyz901@gmail.com':
                query = `SELECT pharmacist_remarks FROM application WHERE application_id = ${id}`;
                break;
            case 'medical.officer.901@gmail.com':
                query = `SELECT medical_officer_remarks FROM application WHERE application_id = ${id}`;
                break;
            case 'junioracc.xyz901@gmail.com':
                query = `SELECT DA_JAO_remarks FROM application WHERE application_id = ${id}`;
                break;
            case 'assessing.officer.901@gmail.com':
                query = `SELECT AO_remarks FROM application WHERE application_id = ${id}`;
                break;
            case 'senior.audit.901@gmail.com':
                query = `SELECT Sr_AO_remarks FROM application WHERE application_id = ${id}`;
                break;
            case 'registrar.officer.901@gmail.com':
                query = `SELECT registrar_remarks FROM application WHERE application_id = ${id}`;
                break;
            case 'directorxyz@gmail.com':
                query = `SELECT director_remarks FROM application WHERE application_id = ${id}`;
                break;
            default:
                res.status(400).json({ status: 'error', message: 'Invalid email' });
                return;
        }

        const result = await pool.query(query);
        const authority_remarks = result.rows[0][`${email.split('.')[0]}_remarks`];

        res.json({ status: 'ok', current_auth_remarks: authority_remarks });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});

  



