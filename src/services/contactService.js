
import { storageService } from "./async-storage.service"
const STORAGE_KEY = 'contact'

export const contactService = {
    query,
    getById,
    upDateContact,
    deleteUser
}

function query (filterBy){
   const contacts = storageService.query(STORAGE_KEY)
   if(filterBy)return Promise.resolve(filterContacts(contacts,filterBy))
   return contacts
}

function getById(contactId) {
    return storageService.get(STORAGE_KEY, contactId)
}

async function upDateContact (UpDatedcontact){
    if(UpDatedcontact._id) storageService.put(STORAGE_KEY, UpDatedcontact)
    else storageService.post(STORAGE_KEY, UpDatedcontact)
}

async function filterContacts (contactsPrm,filterBy){
   const contacts = await contactsPrm
   const regx = new RegExp(filterBy,'i')
   return contacts.filter(contact => regx.test(contact.name) )
}

function deleteUser(id){
    storageService.remove(STORAGE_KEY,id)
}