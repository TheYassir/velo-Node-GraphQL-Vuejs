/**
 * Ce fichier sert à la validation des données, la documentation, mais également le routage
 * Plugin VSCode pour graphQL : https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode
 */
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { EOL } = require('node:os');

const schemaNames = ['query', 'mutation', 'bike', 'kindOfBike', 'pointOfSale', 'rent'];

const schemas = schemaNames.map(
    (schemaName) => readFileSync(
        path.join(__dirname, `${schemaName}.gql`),
        'utf-8',
    ),
);

module.exports = schemas.join(EOL);
