const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const readContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};
const writeContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const contacts = await readContacts();
  return contacts;
};
const getContactById = async (id) => {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === id);
  return contact || null;
};
const removeContact = async (id) => {
  const contacts = await readContacts();
  const contactIndex = contacts.findIndex((contact) => contact.id === id);
  if (contactIndex === -1) return null;
  const [contact] = contacts.splice(contactIndex, 1);
  await writeContacts(contacts);
  return contact;
};
const addContact = async (name, email, phone) => {
  const contacts = await readContacts();
  const newContact = { name, email, phone, id: crypto.randomUUID() };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
