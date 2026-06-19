import contactSchema from "./contacts.schema";
import contactRepository from "./contacts.repository";
import { z } from "zod";

type ContactMessage = z.infer<typeof contactSchema>;

const contactService = {
  createContact: async (
    data: Omit<ContactMessage, "id" | "createdAt">,
  ): Promise<ContactMessage> => {
    return contactRepository.createContact(data);
  },

  getAllContacts: async (): Promise<ContactMessage[]> => {
    return contactRepository.getAllContacts();
  },
};

export default contactService;