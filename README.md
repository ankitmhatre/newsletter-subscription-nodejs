
# Instructions to Test (How to run)




  1. [Install docker](https://docs.docker.com/desktop/install/linux-install/)<br />
  
  After you are done installing
  Do, <br />
  
    docker compose build
    docker compose up

  Create a `.env` at the root and add this to this `.env` file ( do this, if you are not using docker compose, but then run the MongoDB service at 27017, w/o auth) 
    
    PORT=3001
    TOKEN_SECRET_KEY=does-not-matter
    JWT_ACCESS_EXPIRES_IN=9028374920
    JWT_REFRESH_EXPIRES_IN=9028374920873
    JWT_REFRESH_SECRET=lorem-ipsum
    JWT_ACCESS_SECRET=lorem-ipsum
    MONGO_HOST=localhost
    MONGO_PORT=27017
    MONGO_DBNAME=sdb
    NODE_ENV=development
    JWT_EMAIL_SECRET=akjkdsnajdnajnda


 2. [Here is the API document, download (postman)](https://github.com/ankitmhatre/nwo.ai/blob/main/nwo.ai.postman_collection.json)<br />
 
      <img src="https://github.com/ankitmhatre/nwo.ai/blob/main/api_ss.png" width="300" />

    Steps: 
      1. Start with creating an account (signup)
      2. Log into your account (login)
      3. Add newsletters to the database (this is an admin's job)
      4. Also, you can filter the newsletter based on industry, sub-category & source
      5. If you have logged in and have an access token, use it to create a subscription
      6. Check your subscription
         

All the controllers, routers, and models are in their respective folders.
we have 3 modules

/auth
/newsletter
/subscribe







  


  
