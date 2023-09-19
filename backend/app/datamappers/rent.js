const CoreDatamapper = require('./coreDatamapper');

class Rent extends CoreDatamapper {
    tableName = 'rent';

    constructor(config) {
        super(config);
        this.createStandardLoaders();
        this.currentRentLoader = this.db.query(this.tableName).batch(async (query, ids) => {
            const rows = await query
                .whereIn('id', ids)
                .whereNull('return_date')
                .cache(process.env.SQLCACHE);
            return ids.map((id) => rows.find((row) => row.id === id));
        });
    }

    async findCurrentRentByBike(bikeId) {
        const rows = await this.db.query(this.tableName)
            .where({ bike_id: bikeId })
            .whereNull('return_date');
        return rows[0];
    }
}

module.exports = Rent;
