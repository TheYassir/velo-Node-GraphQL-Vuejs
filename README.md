# vel'O - Node.js + GraphQL + Vuejs

## Après clonage

-   $ npm i && npm run inst
-   $ docker compose up --build

-   Adminer sur le port 8080
-   mongo-express: GUI pour mongoDB sur le port 8081

Trois utilisateurs pour le login :

-   le mot de passe est toujours le même : secret

-   les users :
    -   role administrateur
        -   admin@ovelo.com
    -   role gestionnaire
        -   gestionnaire@ovelo.com
    -   role client
        -   client@client.com

## reset docker

Stop containers

-   $ docker stop $(docker ps -aq)

Delete containers

-   $ docker rm -f $(docker ps -aq)

Delete all Images

-   $ docker system prune -a
