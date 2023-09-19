const CoreDatamapper = require('./coreDatamapper');

class Bike extends CoreDatamapper {
    tableName = 'bike';

    constructor(config) {
        super(config);
        this.createStandardLoaders();
    }
}

module.exports = Bike;
