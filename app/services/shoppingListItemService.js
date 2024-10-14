import { sql } from "../database/database.js";

const createShoppingListItem = async (item, tableID) => {
    await sql`INSERT INTO
    shopping_list_items (name, shopping_list_id)
    VALUES (${item}, ${tableID} )`;

    await updateListItemCount(tableID);
};

const findShoppingListItems = async (id) => {
    return await sql`SELECT * FROM shopping_list_items
    WHERE shopping_list_id = ${id}`;
};

const checkShoppingListItem = async (id, tableID) => {
    await sql`UPDATE shopping_list_items
    SET collected = true WHERE id = ${id}`;
    await updateListItemCount(tableID);
};

const uncheckShoppingListItem = async (id, tableID) => {
    await sql`UPDATE shopping_list_items
    SET collected = false WHERE id = ${id}`;
    await updateListItemCount(tableID);
};

/*const countCompletedTask = async (id) => {
    await sql`SELECT COUNT(*) FROM shopping_list_items
WHERE collected = true;`;
};

const findById = async (id) => {
    const rows = await sql`SELECT * FROM shopping_list_items WHERE id = ${id}`;

    if (rows && rows.length > 0) {
        return rows[0];
    }
};*/

const updateListItemCount = async (tableID) => {
    const itemsCount =
        await sql`SELECT COUNT(*) AS items FROM shopping_list_items
WHERE shopping_list_id = ${tableID}`;
    const itemsCountInt = parseInt(itemsCount[0].items);
    const completed =
        await sql`SELECT COUNT(*) AS items FROM shopping_list_items
WHERE shopping_list_id = ${tableID} AND collected = true`;
    const completedInt = parseInt(completed[0].items);

    await sql`UPDATE shopping_lists
SET total = ${itemsCountInt} WHERE id = ${tableID}`;

    await sql`UPDATE shopping_lists
SET completed = ${completedInt} WHERE id = ${tableID}`;
};

export {
    checkShoppingListItem,
    createShoppingListItem,
    findShoppingListItems,
    uncheckShoppingListItem,
};
