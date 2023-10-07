import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import AddAndUpdateComponent from "./AddAndUpdateComponent";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Sucessfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        key={contact.id}
        className="bg-yellow flex justify-between items-center p-2 rounded-lg"
      >
        <div className="flex items-center gap-1">
          <HiOutlineUserCircle className="text-4xl text-orange-500" />
          <div className="">
            <h2 className="font-bold">{contact.name}</h2>
            <h2 className="text-sm">{contact.email}</h2>
            <h2 className="">{contact.mobile}</h2>
          </div>
        </div>
        <div className="flex">
          <RiEditCircleLine
            onClick={onOpen}
            className="text-4xl cursor-pointer"
          />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="text-4xl text-orange-500 cursor-pointer"
          />
        </div>
      </div>
      <AddAndUpdateComponent
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContactCard;
