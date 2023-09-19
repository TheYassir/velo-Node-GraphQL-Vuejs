module.exports = {
    bikes(pointOfSale, _, { dataSources }) {
        return dataSources.veloDB.bike.findAll({
            $where: { point_of_sale_id: pointOfSale.id },
        });
    },
};
