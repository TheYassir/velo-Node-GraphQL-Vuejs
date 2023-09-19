class CoreSQLDatamapper {
    tableName;

    constructor(db) {
        this.db = db;
    }

    createStandardLoaders() {
        this.pkLoader = this.db.query(this.tableName).batch(async (query, ids) => {
            const rows = await query.whereIn('id', ids).cache(process.env.SQLCACHE);
            return ids.map((id) => rows.find((row) => row.id === id));
        });
    }

    /**
     * Récupération par identifiant
     * @param {number|number[]} id identifiant ou liste d'identifiants
     * @returns un enregistrement ou une liste d'enregistrement
     */
    async findByPk(id) {
        const row = await this.db.query(this.tableName)
            .where({ id })
            .first()
            .cache(process.env.SQLCACHE);
        return row;
    }

    async findAll(params) {
        const query = this.db.query(this.tableName);
        if (params?.$where) {
            Object.entries(params.$where).forEach(([param, value]) => {
                if (param === '$or') {
                    query.where((builder) => {
                        Object.entries(value).forEach(([key, val]) => {
                            builder.orWhere(key, val);
                        });
                    });
                } else {
                    query.where(param, value);
                }
            });
        }

        if (params?.offset) query.offset(params.offset);
        if (params?.limit) query.limit(params.limit);

        const rows = await query.cache(process.env.SQLCACHE);
        return rows;
    }

    async create(inputData) {
        const query = this.db.query(this.tableName)
            .insert(inputData)
            .returning('*');
        const row = await query;
        return row;
    }

    async update({ id, ...inputData }) {
        const query = this.db.query(this.tableName)
            .update({ ...inputData, updated_at: new Date() })
            .where({ id })
            .returning('*');
        const row = await query;
        return row;
    }

    async delete(id) {
        const query = this.db.query(this.tableName)
            .delete()
            .where({ id })
            .returning('*')
            .first();
        const row = await query;
        return !!row;
    }
}

module.exports = CoreSQLDatamapper;
