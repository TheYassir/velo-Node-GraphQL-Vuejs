const CoreDatamapper = require('./coreDatamapper');

class KindOfBike extends CoreDatamapper {
    tableName = 'kind_of_bike';

    constructor(config) {
        super(config);
        this.createStandardLoaders();
    }
}

module.exports = KindOfBike;
