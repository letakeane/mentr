### This app is designed to help connect Turing studings with mentors associated with the school

##### To install and edit locally:
1. Clone down the repo.
2. Run `$ npm install`.
3. Run `$ touch .env`.
4. In that `.env` file, add `API_KEY = ` and set it to whatever string you like.
5. In the `Header.js` and `server.js` files, change the `redirect_uri` to `http://localhost:1701/callback`.
    * `Header.js`: ![Header.js change](http://i.imgur.com/ZgVJANQ.png)
    * `server.js`: ![server.js change](http://i.imgur.com/JXXPWP4.png)
6. Run `$ npm start`.
7. View the app at `http://localhost:1701`!
8. To test, run `$ npm test`.


#### Views

* This is the view students see on their home page

![Image](images/StudentHomeView.png)

* This is the view of a mentor information

![Image](images/MentorCardView.png)

#### The app is hosted on Heroku

[See the production app](https://turing-mentr.herokuapp.com/)


#### Circle CI Status:
[![CircleCI](https://circleci.com/gh/letakeane/mentr.svg?style=svg)](https://circleci.com/gh/letakeane/mentr)
