import userApi from "./api/user_api";

import { input } from "./lib";

export class GetGroup {
    public static async Run() {
        const query = await input("Group id: ");

        const groupbyid = (await userApi.api.groups.getById({
            group_id: query as string | undefined,
            fields: ["description", "can_post", "members_count"]
        }))[0];

        console.log({
            id: groupbyid.id,
            name: groupbyid.name,
            description: groupbyid.description,
            can_post: groupbyid.can_post,
            members_count: groupbyid.members_count
        });

        this.Run();
    }
}
