import { Injectable } from "@nestjs/common";
import { User } from "./mongo.schemas/user.schema";

@Injectable()
export class UsersFormatter {

    public async format(user: User) {
        const { id, email, name, contactPhone } = user;
        return { id, email, name, contactPhone }
    }
}
