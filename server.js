const express = require('express');
const bodyParser = require('body-parser');
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);
// Route to handle POST requests
app.post('/', async (req, res) => {
    try {
        const xfdfData = req.body;
        console.log('req : ', xfdfData);

        const firebaseConfig = {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID
        };
          
        const appFirebase = initializeApp(firebaseConfig);
        const firestore = getFirestore(appFirebase);
        // transform the data
        for (const key in xfdfData) {
            if (xfdfData.hasOwnProperty(key)) {
                // Replace 'Choice1' with 'oui' and 'Choice2' with 'no'
                xfdfData[key] = xfdfData[key].replace('Choice1', 'oui').replace('Choice2', 'no');
            }
        }
        // Save data to Firestore
        const docRef = await addDoc(collection(firestore, 'enquetes'), xfdfData);
        console.log('Document written with ID: ', docRef.id);

        // Send a response
        res.send('XFDF data received and processed successfully.');
    } catch (error) {
        console.error('Error storing data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const server = app.listen(3000, () => {
    console.log('Express server is listening on port 3000.');
});

// const functions = require('@google-cloud/functions-framework');

// functions.http('helloHttp', (req, res) => {
//   res.send(`Hello ${req.query.name || req.body.name || 'World'}!`);
// });
