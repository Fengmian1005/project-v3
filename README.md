This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting a Modern Logic Developer AWS Account - READ ME FIRST

Each developer will be provided with an AWS account under the Modern Logic Organization for development. The account is per developer, not per project. If you have multiple Modern Logic projects you should re-use the same development account. If you've already got an account from a different project you can skip to 'Setting up...' below.

If you have not worked with a Modern Logic Developer AWS account before:

1. Get account credentials from your development lead
2. Add them to ~/.aws/credentials in the following format:

[ModernLogicDevelopment]
aws_access_key_id=YOURACCESSKEYID
aws_secret_access_key=YOURSECRETACCESSKEY

3. Add the following to ~/.aws/config:

[profile ModernLogicDevelopment]
region=us-east-1

4. then login to the aws console using a web browser and a link your dev lead will provide. It will ask you to change the password. Do so.
5. Visit https://console.aws.amazon.com/iam/home?region=us-east-2#/users/YOURUSERNAME?section=security_credentials and add an MFA token. You can use a program like google authenticator on your phone or 1password for One Time Tokens.

## Setting up this project with AWS Amplify - READ ME SECOND

Once the above is completed you can get started with your development environment. 

1. Checkout the project from github.
2. Install the AWS Amplify CLI (`npm install -g @aws-amplify/cli`).
3. Run `amplify env add` with the following answers:

environment name: yournamedev (for example: dylandev)
Do you want to use an AWS profile: Yes
Choose a profile: Choose ModernLogicDevelopment

This will create some resources in your AWS account.

4. amplify push

This will deploy the backend resources.

To run the app locally:

`yarn start`

To deploy the website to your development account:

`amplify publish`

This should open it in a browser and output the url to the command line.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
