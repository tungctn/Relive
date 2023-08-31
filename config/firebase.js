const admin = require("firebase-admin");
const serviceAccount = require("./push-notification-1c019-firebase-adminsdk-j17mf-0d4ae4e166.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
