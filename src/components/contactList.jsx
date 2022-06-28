import { ContactPreview } from "./contactPreview";

export const ContactList = (props) => {
  return (
    <ul className="contact-list">
      {props.contacts.map((contact, idx) => (
        <ContactPreview
          key={contact._id}
          contact={contact}
          idx={idx}
          deleteUser={props.deleteUser}
        />
      ))}
    </ul>
  );
};
