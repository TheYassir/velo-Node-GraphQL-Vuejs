module.exports = {
    priceInOtherCurrency(kindOfBike, { currency }, { dataSources }) {
        return dataSources.exchangeRate.getPriceIn(kindOfBike.price, currency);
    },
};
