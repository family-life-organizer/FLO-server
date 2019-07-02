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
Access: Public
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
Access: Public
Method: POST
Route: /api/login
Payload: {
    email: STRING || username: STRING,
    password: STRING
}
</code>
</pre>

<pre>
<h3>Add User (Member) Route </h3>
<code>
Access: Private
Method: POST
Route: /api/addUser
headers: {
    Authorization: token
}
Payload: {
    username: STRING,
    password: STRING
}
</code>
</pre>


<pre>
<h3>Update Profile Route </h3>
<code>
Access: Private
Method: PATCH
Route: /api/profile
headers: {
    Authorization: token
}
Payload: {
    username: STRING (optional),
    password: STRING (optional),
    email: STRING (optional)
    firstName: STRING (optional)
    lastName: STRING (optional)
}

Hint: At least one field to be updated must be provided
</code>
</pre>

<pre>
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

<pre>
<h3>Create Task </h3>
<code>
Method: POST
Route: /api/tasks
headers : {
  authorization: token
}
Payload: {
    description: TEXT,
    dueDate: DATETIME (2019-07-02 04:01:46 +0000)
    categoryId: INTEGER,
    assigneeId: INTEGER [optional]
}
</code>
</pre>

<pre>
<h3>Get Family Task Categories </h3>
<code>
Method: GET
Route: /api/categories/family
headers : {
  authorization: token
}
</code>
</pre>

<pre>
<h3>Get Family Members </h3>
<code>
Method: GET
Route: /api/users/family
headers : {
  authorization: token
}
</code>
</pre>

<pre>
<h3>Get Single User Details</h3>
<code>
Method: GET
Route: /api/users/`userId`
headers : {
  authorization: token
}
</code>
</pre>


- Start coding
- Keep coding
- Win the Hackerthon🔥🔥

