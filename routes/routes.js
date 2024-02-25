const express = require('express');
const router = express.Router();
const dataService = require('../services/services.js');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const e = require('express');
const axios = require('axios');

// GET all records
router.get('/', async (req, res) => {
  try {
    const data = await dataService.getAllData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const uploadDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectory)){
    fs.mkdirSync(uploadDirectory);
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    console.log('file', file);
    cb(null, file.originalname); 
  }
});

const upload = multer({ storage: storage });

// router.post('/cgi-bin/MyScript.cgi', (req, res) => {
//     console.log('Upload en cours ...');
//     console.log('req', req);
//     res.status(200).send();
// });

// router.post('/cgi-bin/MyScript.cgi', upload.single('file'), (req, res) => {
//   console.log('upload en cours ...');

//   const filePath = path.join(__dirname, 'uploads/script-cgi.c');
//   const fileContent = fs.readFileSync(filePath);

//   const options = {
//     method: 'POST',
//     url: 'http://localhost:3000/api/data/cgi-bin/MyScript.cgi',
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     },
//     data: {
//       file: {
//         value: fileContent,
//         options: {
//           filename: 'script-cgi.c',
//           contentType: 'text/plain'
//         }
//       }
//     }
//   };

//   // Envoyer la requête
//   axios(options)
//     .then(response => {
//       console.log('Fichier envoyé avec succès');
//       console.log('Réponse du serveur:', response.data);
//     })
//     .catch(error => {
//       console.error('Erreur lors de l\'envoi du fichier:', error);
//     });
    

// });

router.get('/cgi-bin/MyScript.cgi', (req, res) => {
  const fileName = 'MyScript.cgi';
  const uploadDirectory = path.join(__dirname, 'uploads');

  // Construire le chemin complet du fichier à télécharger
  const filePath = path.join(uploadDirectory, fileName);

  // Envoyer le fichier en réponse à la requête
  res.download(filePath, (err) => {
      if (err) {
          console.error('Erreur lors du téléchargement :', err);
          res.status(404).send('Fichier non trouvé');
      }
      else {
          console.log('Téléchargement réussi');
      }
  });
});



// POST a new record
router.post('/', async (req, res) => {
  try {
    const newData = await dataService.addData(req.body);
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// PUT update a record
router.put('/:id', async (req, res) => {
  try {
    const updatedData = await dataService.updateData(req.params.id, req.body);
    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a record
router.delete('/:id', async (req, res) => {
  try {
    await dataService.deleteData(req.params.id);
    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
