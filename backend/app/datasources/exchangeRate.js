const { RESTDataSource } = require('@apollo/datasource-rest');

class ExchangeRate extends RESTDataSource {
    baseURL = 'https://api.exchangerate.host';

    async getPriceIn(price, currencyTo = 'USD', currencyFrom = 'EUR') {
        const response = await this.get(
            `/convert?from=${currencyFrom}&to=${currencyTo}&amount=${price}`,
        );
        return response.result;
    }
}

module.exports = ExchangeRate;
