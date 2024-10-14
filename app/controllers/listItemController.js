import * as shoppingListItemService from "../services/shoppingListItemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const createListItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const formData = await request.formData();
    const name = formData.get("name");
    if (name) {
        await shoppingListItemService.createShoppingListItem(name, urlParts[2]);
        return requestUtils.redirectTo(`/shoppinglists/${urlParts[2]}`);
    } else {
        return requestUtils.redirectTo(`/shoppinglists/${urlParts[2]}?error=1`);
    }
};

const checkListItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    await shoppingListItemService.checkShoppingListItem(
        urlParts[4],
        urlParts[2],
    );

    return requestUtils.redirectTo(`/shoppinglists/${urlParts[2]}`);
};

const uncheckListItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    await shoppingListItemService.uncheckShoppingListItem(
        urlParts[4],
        urlParts[2],
    );

    return requestUtils.redirectTo(`/shoppinglists/${urlParts[2]}`);
};

export { checkListItem, createListItem, uncheckListItem };
