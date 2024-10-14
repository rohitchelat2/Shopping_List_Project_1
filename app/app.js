import { serve } from "./deps.js";

import * as listController from "./controllers/listController.js";
import * as listItemController from "./controllers/listItemController.js";

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return await listController.showStat(request);
  } else if (url.pathname === "/shoppinglists" && request.method === "POST") {
    return await listController.addList(request);
  } else if (url.pathname === "/shoppinglists" && request.method === "GET") {
    return await listController.viewLists(request);
  } else if (url.pathname === "/allshoppinglists" && request.method === "GET") {
    return await listController.viewAllLists(request);
  } else if (
    url.pathname.match("shoppinglists/[0-9]+") && request.method === "GET"
  ) {
    return await listController.viewShoppingList(request);
  } else if (
    url.pathname.match("shoppinglists/[0-9]+/check/[0-9]+") &&
    request.method === "POST"
  ) {
    return await listItemController.checkListItem(request);
  } else if (
    url.pathname.match("shoppinglists/[0-9]+/uncheck/[0-9]+") &&
    request.method === "POST"
  ) {
    return await listItemController.uncheckListItem(request);
  } else if (
    url.pathname.match("shoppinglists/[0-9]+/deactivate") &&
    request.method === "POST"
  ) {
    return await listController.deactivateList(request);
  } else if (
    url.pathname.match("shoppinglists/[0-9]+") &&
    request.method === "POST"
  ) {
    return await listItemController.createListItem(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });
