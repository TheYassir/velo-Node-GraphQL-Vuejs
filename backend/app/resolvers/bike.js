module.exports = {
    async kind_of_bike(bike, _, { dataSources }) {
        return dataSources.veloDB.kindOfBike.pkLoader.load(bike.kind_of_bike_id);
    },
    point_of_sale(bike, _, { dataSources }) {
        return dataSources.veloDB.pointOfSale.pkLoader.load(bike.point_of_sale_id);
    },
    rents(bike, _, { dataSources }) {
        return dataSources.veloDB.rent.findAll({ $where: { bike_id: bike.id } });
    },
    rent(bike, _, { dataSources }) {
        return dataSources.veloDB.rent.currentRentLoader.load(bike.id);
    },
};
