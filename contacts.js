const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  const list = await fs.readFile(contactsPath, { encoding: "utf-8" });
  const data = JSON.parse(list);
  return data;
}

async function writeDB(db) {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
}

async function getContactById(contactId) {
  const db = await listContacts();
  const result = db.find((contact) => contact.id === contactId);
  return result;
}

async function removeContact(contactId) {
  const db = await listContacts();
  const updatedDb = db.filter((contact) => contact.id !== contactId);
  await writeDB(updatedDb);
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contact = { name, email, phone, id };
  const db = await listContacts();
  db.push(contact);
  await writeDB(db);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
