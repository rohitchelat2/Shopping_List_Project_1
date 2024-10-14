import { sql } from "../database/database.js";

const create = async (name) => {
    await sql`INSERT INTO shopping_lists (name) VALUES (${name})`;
};

const stat = async () => {
    const items = await sql`SELECT COUNT(*) AS items FROM shopping_list_items`;
    const lists = await sql`SELECT COUNT(*) AS lists FROM shopping_lists`;
    const result = { items: items[0].items, lists: lists[0].lists };
    return result;
};

const deactivate = async (id) => {
    await sql`UPDATE shopping_lists
    SET active = false WHERE id = ${id}`;
};

const findAllActiveLists = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};

const findAllLists = async () => {
    return await sql`SELECT * FROM shopping_lists ORDER BY active DESC;`;
};

const findById = async (id) => {
    const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${id}`;

    if (rows && rows.length > 0) {
        return rows[0];
    }
};

export { create, deactivate, findAllActiveLists, findAllLists, findById, stat };
