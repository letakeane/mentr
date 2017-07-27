import Auth0Lock from 'auth0-lock';
const lockConfig = require('dotenv').config().parsed;
const clientId = '2G2e97ENfF6QYnLPLevZF3O39FcBlmJ8';
const domain = 'mentr.auth0.com';
const options = {
  theme: {
    logo: 'http://i.imgur.com/AGi44vF.png',
    primaryColor: '#021D36'
  },
  allowedConnections: ['github']
};

export const lock = new Auth0Lock(clientId, domain, options);

// Listen for the authenticated event and get profile
lock.on("authenticated", (authResult) => {
  lock.getUserInfo(authResult.accessToken, (error, profile) => {
    if (error) {
      // Handle error
      return;
    }

    // Save token and profile locally
    localStorage.setItem("accessToken", authResult.accessToken);
    localStorage.setItem("profile", JSON.stringify(profile));

    // Update DOM

  });
});
