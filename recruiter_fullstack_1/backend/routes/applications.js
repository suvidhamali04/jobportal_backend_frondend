const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { apply, getApplicationsForUser, getApplicationsForJob, updateApplicationStatus, uploadResume } = require('../controllers/applicationController');
router.post('/', auth, apply);
router.get('/me', auth, getApplicationsForUser);
router.get('/job/:jobId', auth, getApplicationsForJob);
router.put('/:id/status', auth, updateApplicationStatus);
// Upload resume (multipart/form-data) field name: 'resume'
router.post('/upload', auth, upload.single('resume'), uploadResume);
module.exports = router;
