# Assignment

This project contains source code and supporting files for a serverless application that you can deploy with the AWS Serverless. It includes the following files and folders:

- `src` - Code for the application's Lambda function.
- `events` - Invocation events that you can use to invoke the function.
- `__tests__` - Unit tests for the application code. 
- `serverless.yml` - A serverless template that defines the application's AWS resources.

The application uses several AWS resources, including Lambda functions, an API Gateway API. These resources are defined in the `serverless.yml` file in this project. You can update the template to add AWS resources through the same deployment process that updates your application code.

## Deploy the sample application

you can deploy this project by following command on root folder

npm run deploy
 
test it by

npm test

