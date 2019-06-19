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
The application uses yarn. In order to install all the dependencies for this application run `yarn install`.

## The Application
The first step after setting up webpack was creating the model, controllers and routes for the votes. Ideally the votes would be linked to an account_id but in order to keep it simple decided to just store the candidate number and an email address. Both email and candidate are required fields and non unique as you can use the same email up to 3 times and you can vote for the same candidate several times.

Once I made sure that both the index, at this moment it was returning all the fields of all the votes, and the create route on Insomnia I wrote the tests and made sure that the frontend was getting and setting to state this response correctly.

I decided to create the form component next. In order to give adecuate feedback to the user on why the post failed I set the model to catch ValidationErrors if the email was not valid or if a candidate outside the range was voted for. With more time I would add feedback of when the post was successful. 

When the form was working and displaying the correct error messages I moved onto how to deal with not being able to vote more than 3 times. The solution I decided on was to once there was 3 votes linked to one email address to not let another vote be created. So I set up the search route and before sending the create request for the vote the frontend checks how many votes the email used has already. If that email has already 3 an error message is displayed in the form.


