import React from "react";
import Modal from "./Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  mobile: Yup.string().required("Number is required"),
});
const AddAndUpdateComponent = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactref = collection(db, "contacts");
      await addDoc(contactref, contact);
      toast.success("Contact Added Sucessfully");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  const updateContact = async (contact, id) => {
    try {
      const contactref = doc(db, "contacts", id);
      await updateDoc(contactref, contact);
      toast.success("Contact Updated Sucessfully");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                  mobile: contact.mobile,
                }
              : {
                  name: "",
                  email: "",
                  mobile: "",
                }
          }
          onSubmit={(value) => {
            console.log(value);
            isUpdate ? updateContact(value, contact.id) : addContact(value);
          }}
        >
          <Form className="flex flex-col gap-2">
            {/* For Name */}
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <Field name="name" className="border h-10 pl-1 rounded-sm" />
              <div className="text-xs text-red">
                <ErrorMessage name="name" />
              </div>
            </div>

            {/* for email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                className="border h-10 pl-1 rounded-sm"
              />
              <div className="text-xs text-red">
                <ErrorMessage name="email" />
              </div>
            </div>

            {/* for mobile number */}
            <div className="flex flex-col gap-1">
              <label htmlFor="mobile">Phone</label>
              <Field name="mobile" className="border h-10 pl-1 rounded-sm" />
              <div className="text-xs text-red">
                <ErrorMessage name="mobile" />
              </div>
            </div>
            <button className="border bg-orange-500 px-3 py-1.5 self-end">
              {isUpdate ? "update" : "add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateComponent;
