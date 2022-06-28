import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { contactService } from "../services/contactService.js";
import Modal from "../components/modal.jsx";
import Spinner from "../components/spinner";

export const EditContact = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id === "create") setUser({ name: "", phone: "", email: "" });
    else contactService.getById(params.id).then((contact) => setUser(contact));
  }, []);
  const onUpdateUser = (e) => {
    showModal(params.id === "create" ? "created" : "updated");
    e.preventDefault();
    contactService.upDateContact(user);
    if (params.id === "create") setUser({ name: "", phone: "", email: "" });
  };
  const onHandleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const updateduser = {};
    updateduser[name] = value;
    setUser({ ...user, ...updateduser });
  };
  const onDeleteUser = (id) => {
    showModal("deleted");
    contactService.deleteUser(id);
    setTimeout(() => {
      navigate(-2);
    }, 1001);
  };
  const showModal = (msg) => {
    setModalMsg(msg);
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1000);
  };
  if (!user) return <Spinner />;
  const { name, phone, email, _id } = user;
  return (
    <>
      <div className="edit-contact-page">
        <h3 className="edit-contact-page-title">Edit</h3>
        <div className="user-box-details">
          <form onSubmit={(e) => onUpdateUser(e)}>
            <div className="form-name-box">
              <label name="name"> Name:</label>
              <input
                value={name}
                name="name"
                type="text"
                onChange={onHandleChange}
              />
            </div>
            <div className="form-phone-box">
              <label name="phone">Phone:</label>
              <input
                value={phone}
                name="phone"
                type="text"
                onChange={onHandleChange}
              />
            </div>
            <div className="form-email-box">
              <label name="email">Email:</label>
              <input
                value={email}
                name="email"
                type="text"
                onChange={onHandleChange}
              />
            </div>
            <button>Save</button>
          </form>
        </div>
        <div className="btns-container">
          <button onClick={() => navigate(-1)}>Back</button>
          <button onClick={() => onDeleteUser(_id)}>Delete</button>
        </div>
      </div>
      {isModalOpen && modalMsg && <Modal msg={modalMsg} />}
    </>
  );
};
