# Welcome to the Doing Event repository!

## 🤷 How it works ?
This is an application aimed at creating events securely.<br /><br />

## 📜 What was used?

<strong>_General_</strong> <br />
- Docker-compose<br />

<strong>_Frontend_</strong> <br />
- Typescritp<br />
- Vite + React<br />
- Axios<br />
- Bootstrap<br />

<strong>_Backend_</strong> <br />
- Typescript<br />
- Nest.js<br />
- ORM(TypeORM)<br />
- SQL Database(PostgresSQL)<br />
- Postman<br />

## 💾 UML Data Model

In this project, we provide a UML data model to represent the `User` and `Event` entities. Below is the textual representation of the classes and their relationships:

> *__User__*

{
  + id : String [PK]
  + name : String
  + email : String
  + cpf : String
  + rg : String
  + cnpj? : String
  + dateOfBirth : DateTime
  + createdAt : DateTime
  + updatedAt : DateTime
  --
  * [UNIQUE] (id, name, rg, cpf, cnpj, email)


}<br />


> *__Event__*

+ id : String [PK]
+ description : String
+ email : String
+ startDate : DateTime
+ endDate : DateTime
--
* [UNIQUE] (id, description, startDate, endate)

<br />


<br />


## 🌐 Flow application <br />
__>__ Click on the link https://youtu.be/b8_3NyzBowM to see the application flow
<br />

## Guidelines<br />

### Enable your environment
Change a `.env.example` to `.env` and set __JWT_SECRET__ and __JWT_EXPIRATION_TIM__ values.
<br />

### 1º Step
Clone the repository:
  ```bash
  git clone https://github.com/oligregz/doing-event.git
  ```

### 2º Step
Access the project directory:
```bash
cd doing-event
```

### 3º Step
Install the project's dependencies in the application's parent directory with the commands:
```bash
npm install
```

init database with docker-compose:
```bash
docker-compose up --build -d
```

up migrations to database:
```bash
cd api/ && npm run migration:run
```

start api service:
```bash
nmp run start
```

start interface service:
```bash
cd .. && cd interface/ && npm run dev
```

## 👀 Interface Route <br />

> __Use app on port 3000__

__>__ http://localhost:5173/

<br />


## 📖 Api Routes <br />

* Brear Token trading routes passed `/auth/login` route

__[DEVELOPMENT]__ <br />

> __💈 Hello__
<br />

__>__ __[GET]__ http://localhost:3000/ <br /><br />


> __💈 Create User__
<br />

__>__ __[POST]__ http://localhost:3000/users <br />

*Body*
```
{
  "name": "Judas Iscariotes",
  "rg": "622.025.31-67",
  "cpf": "000.999.815-38",
  "cnpj": "12.345.673/0001-95", // optional
  "dateOfBirth": "1990-01-01T00:00:00.000Z", //ISO 8601 formatt
  "email": "judas.euca@example.com",
  "password": "123"
}
```
<br />

__[PRODUCTION]__ <br />

> __💈 Auth Signin__
<br />

__>__ __[POST]__ http://localhost:3000/auth/login <br />

*Body*
```
{
  "username": "Judas Iscariotes",
  "password": "123"
}
```
<br /><br />


> __💈 List Events__
<br />

__>__ __[GET]__ http://localhost:3000/events  <br /><br />


__>__ __[POST]__ http://localhost:3000/event <br />

*Body*
```
{
  "description": "First event",
  "startDate": "2025-02-10T08:00:00.000Z",
  "endDate": "2025-02-10T12:00:00.000Z"
}

```
<br /><br />

> __💈 Update Event__
<br />

__>__ __[PUT]__ http://localhost:3000/event <br />

*Body*
```
{
  "id": "bfbb6586-2e37-4a16-974f-4247b52b6a90",
  "description": "First event",
  "startDate": "2025-02-10T09:00:00.000Z",
  "endDate": "2025-02-10T12:00:00.000Z"
}
```
<br /><br />

> __💈 Delete event__
<br />

__>__ __[DELETE]__ http://localhost:3000/event/:eventId

<br />
