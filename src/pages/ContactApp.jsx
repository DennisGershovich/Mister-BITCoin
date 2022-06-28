import { contactService } from "../services/contactService";
import { ContactFilter } from "../components/contactFilter";
import { ContactList } from "../components/contactList";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/spinner";

export const ContactApp = () => {
  const [contactList, setContactList] = useState(null);
  const [filterBy, setFilterBy] = useState("");

  useEffect(() => {
    contactService.query(filterBy).then((contacts) => setContactList(contacts));
  }, [filterBy]);

  const onDeleteUser = (id) => {
    contactService.deleteUser(id);
    const updatedContactList = contactList.filter(
      (contact) => contact._id !== id
    );
    setContactList(updatedContactList);
  };

  if (!contactList) return <Spinner />;
  return (
    <div className="contact-app">
      <ContactFilter setFilter={(x) => setFilterBy(x)} />
      <ContactList contacts={contactList} deleteUser={onDeleteUser} />
      <button>
        <Link to={"/contacts/edit/create"}>Create</Link>
      </button>
    </div>
  );
};
