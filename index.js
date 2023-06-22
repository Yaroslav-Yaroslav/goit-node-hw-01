const { program } = require("commander");
const contactsFn = require("./contacts.js");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsFn.listContacts();
      console.table(contacts);
      break;
    case "get":
      const contact = await contactsFn.getContactById(id);
      console.log(contact);
      break;
    case "add":
      const newContact = await contactsFn.addContact(name, email, phone);
      console.log(newContact);
      break;
    case "remove":
      const deletedContact = await contactsFn.removeContact(id);
      console.log(deletedContact);
      break;
    default:
      console.log(`Unknown action: ${action}`);
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);
