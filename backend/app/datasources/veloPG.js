const { BatchedSQLDataSource } = require('@nic-jennings/sql-datasource');

const BikeDatamapper = require('../datamappers/bike');
const KindOfBikeDatamapper = require('../datamappers/kindOfBike');
const PointOfSaleDatamapper = require('../datamappers/pointOfSale');
const RentDatamapper = require('../datamappers/rent');

class VeloDB extends BatchedSQLDataSource {
    constructor(config) {
        super(config);
        this.bike = new BikeDatamapper(this.db);
        this.kindOfBike = new KindOfBikeDatamapper(this.db);
        this.pointOfSale = new PointOfSaleDatamapper(this.db);
        this.rent = new RentDatamapper(this.db);
    }
}

module.exports = VeloDB;
