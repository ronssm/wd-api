Steps to run application:

1. Clone this repository
2. Access the folder where the docker-compose file is located (project root directory)
3. Run command via terminal: docker-compose up --build

To see the swagger main page, enter the url localhost:3000/api

POST BODY EXAMPLE:

{
    "email": "john@connor.com",
    "givenName": "John",
    "familyName": "Connor"
}
