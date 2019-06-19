# CountMeUp
## Technologies used
* React.js
* Node.js
* axios
* JavaScript (ES6) / HTML5 / SCSS
* Git / GitHub
* MongoDB & Mongoose
* Chai/Mocha/Supertest
* request-promise/axios


## Run the application 
The application uses yarn. In order to install all the dependencies for this application run `yarn install`. To seed the database run `yarn run seed`.

## The Application
Once I bootstrapped the application I built the models, controllers and routes that were to be the backbone. Ideally I would have built a registration route and linked the votes to an account but as it is a simple project I decided to just store the candidate number and an email address. 

After writing the tests to make sure the application was behaving as expected, I decided to move onto the frontend and build the form component. I decided on the form first as I thought that it would take the most time and be the most complex. To return useful error messages to the user I set the model to catch ValidationErrors if an invalid email was used or if a candidate outside the range was voted for. To deal with the issue of more than 3 votes per user I decided on the frontend stopping the creation of another vote if an email had already 3 votes.

Once the form was working as expected I moved onto the results component. As what I really needed was the total of votes for each candidate I changed the index route to, instead of returning all the votes, aggregate them by candidate and return the total. After this the frontend graph component has only to create the correct number of columns with the candidate label and total.

To finish the application I created the seeds file to populate the db with some votes.




