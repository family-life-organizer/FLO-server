# Family Life Organizer

# How to setup the project

- create an account in [ElephantSQl](https://customer.elephantsql.com/instance)
- Create a database instance in ElephantSQL and copy the connection string (URL)
- create a `.env` file at the root of the project, copy the content of `.env.example` into it.
- Assign the URL above to the `DATABASE_URL` in `.env` file
- npm install or yarn install
- npm migrate or yarn migrate
- npm run start:dev or yarn start:dev

<pre>
<h3>Register Route </h3>
<code>
Method: POST
Route: /api/signup
Payload: {
    firstName: STRING,
    lastName: STRING,
    email: STRING,
    username: STRING,
    password: STRING
}
</code>
</pre>

<pre>
<h3>Login Route </h3>
<code>
Method: POST
Route: /api/login
Payload: {
    email: STRING || username: STRING,
    password: STRING
}
</code>
</pre>

pre>
<h3>Create Category </h3>
<code>
Method: POST
Route: /api/categories
headers : {
  authorization: token
}
Payload: {
    name: STRING 
}
</code>
</pre>


- Start coding
- Keep coding
- Win the Hackerthon🔥🔥