import { Eta } from "../deps.js";
import * as shoppingListService from "../services/shoppingListService.js";
import * as shoppingListItemService from "../services/shoppingListItemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const eta = new Eta({ views: `${Deno.cwd()}/app/views/` });

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
    if (name) {
        await shoppingListService.create(name);
        return requestUtils.redirectTo("/shoppinglists");
    } else {
        return requestUtils.redirectTo("/shoppinglists?error=1");
    }
};

const viewLists = async (request) => {
    const url = new URL(request.url);
    const params = url.searchParams;

    const data = {
        shoppinglists: await shoppingListService.findAllActiveLists(),
        fullList: 0,
        error: params.get("error"),
    };

    return new Response(
        eta.render("shoppingLists.eta", data),
        responseDetails,
    );
};

const showStat = async () => {
    const data = {
        statTable: await shoppingListService.stat(),
    };

    return new Response(
        eta.render("statTable.eta", data),
        responseDetails,
    );
};

const viewAllLists = async () => {
    const data = {
        shoppinglists: await shoppingListService.findAllLists(),
        fullList: 1,
    };

    return new Response(
        eta.render("shoppingLists.eta", data),
        responseDetails,
    );
};

const viewShoppingList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const params = url.searchParams;

    const data = {
        shoppinglist: await shoppingListService.findById(urlParts[2]),
        items: await shoppingListItemService.findShoppingListItems(
            urlParts[2],
        ),
        error: params.get("error"),
    };

    return new Response(
        await eta.render("shoppingList.eta", data),
        responseDetails,
    );
};

const deactivateList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await shoppingListService.deactivate(urlParts[2]);
    return requestUtils.redirectTo("/shoppinglists");
};

export {
    addList,
    deactivateList,
    showStat,
    viewAllLists,
    viewLists,
    viewShoppingList,
};
