# Joomla to wordpress migration

- Wordpress API
- Media API
- Property plugin

## Pre requisites
- Node
- Last wordpress versions with WP API and Application passwords (check wordpress changelog)
- Pictures folder (inside src)

## Initialize
Change name .env.example to .env and use your own `wordpress_url` and generate a base64 token with your user and application password from wordpress and put it on .env

## Run
- Run `npm start`
- Generate a POST without body to `http://localhost:4000/run-script`
- When it finish, run scripts from `query.js`