const CoreDatamapper = require('./coreDatamapper');

class PointOfSale extends CoreDatamapper {
    tableName = 'point_of_sale';

    constructor(config) {
        super(config);
        this.createStandardLoaders();
    }
}

module.exports = PointOfSale;
