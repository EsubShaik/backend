const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const path = require('path');


const { isAuthenticated } = require("../Middleware/verifyJWT");
const express = require("express");
const {signup,signin,forgetpassword,resetpassword,sendotp,detectFood,foodAnalyzer,
addNutriData,getNutriData,req_calories,addhydrate,gethydrateData,updateProfile,
getUserProfile,deleteFood,updateStatus,getRecommendations,getmoreDescription,
registerPushNotification,getDietReport,saveTicket,getTicket,updateFullProfile,getUsers,
handleSST, handleTTT,saveGoal,getGoal} = require("../controllers/userController");
const userController = require("../controllers/userController");

const router = express.Router();
router.route("/register").post(signup);
router.route("/login").post(signin);
router.route("/forgetpassword").post(forgetpassword);
router.route("/resetpassword/:userId/:accessToken").post(resetpassword);
router.route('/send-otp').post(sendotp);
router.route('/analyze-food').post(foodAnalyzer);
router.route('/store-nutridata').post(isAuthenticated,addNutriData);
router.route('/delete-nutridata').post(deleteFood);
router.route('/update-profile').put(isAuthenticated,updateProfile);
router.route('/get-nutridata').get(isAuthenticated,getNutriData);
router.post('/detect-my-food',upload.single('image'),detectFood);
router.route("/req-calories/:age/:gender").get(req_calories);
router.route('/get-user-profile').get(isAuthenticated,getUserProfile);
router.route('/update-status').put(isAuthenticated,updateStatus);
router.route('/get_recommendations').post(isAuthenticated,getRecommendations);
router.route('/get_more_description').post(getmoreDescription);
router.route('/register-push-notification').put(isAuthenticated,registerPushNotification);
router.route('/diet-report').post(isAuthenticated,getDietReport);
router.route('/support-request').post(isAuthenticated,saveTicket);
router.route('/support-request').get(isAuthenticated,getTicket);
router.route('/update-fullprofile').put(isAuthenticated,updateFullProfile);
router.route('/allusers').get(getUsers);
router.route('/predict-sentence').post(handleTTT);
router.route('/save-goal').post(isAuthenticated,saveGoal);
router.route('/get-goal').get(isAuthenticated,getGoal);
// 
//  
const filesFolder = path.join(__dirname, 'mealplans');

router.use(express.static(filesFolder));
router.get('files', (req, res) => {
  const files = getFilesInfo();
  res.json({ files });
});
function getFilesInfo() {
    // Use a method to fetch files from your folder
    // Return an array of objects with file names and download links
    // Example implementation using fs module:
    const fs = require('fs');
    const fileNames = fs.readdirSync(filesFolder);
  
    return fileNames.map(fileName => ({
      name: fileName,
      downloadLink: `/api/download/${encodeURIComponent(fileName)}`,
    }));
  }


router.post('/speech-to-text',upload.single('file'),handleSST);
router.route('/store-hydrate').post(isAuthenticated,addhydrate);
router.route('/get-hydrate').get(isAuthenticated,gethydrateData);
router.use(isAuthenticated);
module.exports = router;