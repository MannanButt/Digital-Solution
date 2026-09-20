import { getDatabase } from "../db/client.js";
import { demoRequests, type DemoRequest } from "../db/schema.js";
import type { ContactRequest } from "../schemas/contact.schema.js";

export interface ContactRepository {
  create(payload: ContactRequest): Promise<DemoRequest>;
}

export class DrizzleContactRepository implements ContactRepository {
  async create(payload: ContactRequest): Promise<DemoRequest> {
    const [record] = await getDatabase()
      .insert(demoRequests)
      .values(payload)
      .returning();

    if (!record) {
      throw new Error("The contact request could not be persisted.");
    }

    return record;
  }
}

export const contactRepository = new DrizzleContactRepository();
