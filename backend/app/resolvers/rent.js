module.exports = {
    rent_point_of_sale(rent, _, { dataSources }) {
        return dataSources.veloDB.pointOfSale.pkLoader.load(rent.rent_point_of_sale_id);
    },
    return_point_of_sale(rent, _, { dataSources }) {
        if (!rent.return_point_of_sale_id) {
            return null;
        }
        return dataSources.veloDB.pointOfSale.pkLoader.load(rent.return_point_of_sale_id);
    },
};
