const functions = require('@google-cloud/functions-framework');
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");


functions.http('getData' ,async (req, res) => {
    try {
        const xfdfData = req.body;
        console.log('req : ', xfdfData);

        const firebaseConfig = {
            apiKey: "AIzaSyAJLiKBxvNaV82B5MYnaggZJaOUKBQo9Ts",
            authDomain: "db-dce.firebaseapp.com",
            projectId: "db-dce",
            storageBucket: "db-dce.appspot.com",
            messagingSenderId: "801498778018",
            appId: "1:801498778018:web:a7e801119a2b7189bd4afb"
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

