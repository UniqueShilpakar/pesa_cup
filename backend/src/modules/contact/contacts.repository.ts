import {z} from "zod";
import dbSession from "../../config/database.ts";
import contactSchema from "./contacts.schema.ts";

type ContactMessage = z.infer<typeof contactSchema>;
type ContactMessageRow = Omit<ContactMessage, "createdAt"> & { created_at: string };

export class ContactsRepository {
    async createContact(data: Omit<ContactMessage, "id" | "createdAt">): Promise<ContactMessage> {
        const inserted = await dbSession.query<{ id: number }>(
            "INSERT INTO contact_messages (name, email, subject, message, status) VALUES (?, ?, ?, ?, ?) RETURNING id",
            [data.name, data.email, data.subject, data.message, data.status]
        );
        const id = inserted[0]?.id ?? 0;
        return {
            id,
            ...data,
            createdAt: new Date(),
        };
    }
    async getAllContacts(): Promise<ContactMessage[]> {
        const result = await dbSession.query<ContactMessageRow>("SELECT * FROM contact_messages");
        return result.map((contact) => ({
            id: contact.id,
            name: contact.name,
            email: contact.email,
            subject: contact.subject,
            message: contact.message,
            createdAt: new Date(contact.created_at),
            status: contact.status,
        }));
    }
}

const contactRepository = new ContactsRepository();
export default contactRepository;