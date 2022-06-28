import { Link } from "react-router-dom";

export const ContactPreview = (props) => {
  const { _id, name } = props.contact;
  return (
    <li className="contact-item">
      <div className="contact-item-img">
        <img src={`https://robohash.org/${props.idx}`} />
      </div>
      <Link className="contact-item-name" to={`/contacts/${_id}/${props.idx}`}>
        {name}
      </Link>
      <button
        className="contact-item-delete-btn"
        onClick={() => props.deleteUser(_id)}
      >
        Delete
      </button>
    </li>
  );
};
