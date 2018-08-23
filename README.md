## Express API
- This sample Express API uses <a href="https://github.com/helmetjs/helmet">Helmet</a>
- It also is configured to talk to AWS DynamoDB

### Setup and Config
- Clone the repo and install all modules
- Configure your AWS access (via CLI is easiest)
- Add an encryption secret: Via env variable `API_ENCRYPTION_SECRET`, or, replace this (in `./app/utils/crypto.js`) with some secret string for testing
- Run `npm run dev` to start the API

### Notes
- When calling an endpoint that connects to AWS, the <a href="https://github.com/aws/aws-sdk-js">aws-sdk</a> is used
- Node crypto is used to encrypt the email address and password before it is stored in DynamoDB

### DynamoDB Config
- Setup your AWS account and create a new DynamoDB table called `users`. Make `email` the key and add columns for `dates` and `password`
- Ensure your AWS access key and secret have read and write permissions to DynamoDB

### Testing the API
#### http://localhost:3000/add-user
- POST request: Try an empty body. Try only an email or password. The endpoint expects an email address and password, and once passed successfully, will add a row to your DynamoDB

#### http://localhost:3000/check-user
- POST request: The endpoint expects an email address and will return the updated and created date for the record

#### http://localhost:3000/get-user-by-email?email=
- GET request: The endpoint expects an email in the query parameter and will return the updated and created date for the record
