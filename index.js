import * as contactService from "./src/contacts.js";
import { program } from "commander";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactService.listContacts();
      return console.log(allContacts);

    case "get":
      const contactId = await contactService.getContactById(id);
      return console.table(contactId);

    case "add":
      const addContact = await contactService.addContact(name, email, phone);
      return console.table(addContact);

    case "remove":
      const deteleContactById = await contactService.removeContact(id);
      return console.table(deteleContactById);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
