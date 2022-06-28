import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { contactService } from "../services/contactService.js";
import { TransferFund } from "../components/TransferFund";
import { MoveList } from "../components/MoveList";
import Spinner from "../components/spinner";

export const ContactDetailes = () => {
  const [user, setUser] = useState(null);
  const [isTransfer, setIsTransfer] = useState(false);
  const params = useParams();
  useEffect(() => {
    contactService.getById(params.id).then((contact) => setUser(contact));
  }, []);
  const navigate = useNavigate();
  if (!user) return <Spinner />;
  const { name, phone, email, _id } = user;
  return (
    <div className="contact-detailes">
      <div className="contact-detailes-btns">
        <button onClick={() => navigate(-1)}>Back</button>
        <button>
          <Link
            className="contact-detailes-edit-btn"
            to={`/contacts/edit/${params.id}`}
          >
            Edit
          </Link>
        </button>
      </div>
      <div className="user-box-details">
        <div className="contact-item-img-container">
          <img
            className="contact-img"
            src={`https://robohash.org/${params.idx}`}
          />
        </div>
        <div className="contact-item-info">
          <div>Name:{name}</div>
          <div>Phone: {phone}</div>
          <div>Email:{email}</div>
        </div>
      </div>
      <TransferFund
        userName={name}
        userId={_id}
        onTransfer={() => setIsTransfer(!isTransfer)}
      />
      <div className="move-list-container">
        <MoveList transfer={isTransfer} userName={name} />
      </div>
    </div>
  );
};
