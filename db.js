const { Pool } = require("pg");

let pool = new Pool({ connectionString: process.env.db });

let unwrappedQuery = function(text, params) { return pool.query(text, params); };

module.exports = {
    pool,

    init: async () => {
        await unwrappedQuery(`

            create table if not exists tags
            (
                id serial not null primary key,
                name varchar(20) unique not null,
                text varchar(2000) not null,
                date timestamp not null default (current_timestamp at time zone 'utc')
            );

        `);
    },

    tags: {
        set: async (name, text) =>
            (await unwrappedQuery("insert into tags (name, text) values ($1, $2) on conflict (name) do update set text = $2 returning id", [name, text])).rows[0],

        get: async (name) =>
            (await unwrappedQuery("select * from tags where lower(name) = lower($1)", [name])).rows[0],

        del: async (name) =>
            await unwrappedQuery("delete from tags where lower(name) = lower($1)", [name]),
    }
}