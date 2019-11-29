
import cms from "./api/cms";
import userApi from "./api/user_api";

import { input, sleep } from "./lib";

export class QueryModule {
    public static async Run() {
        const query = await input("Search query: ");

        const groups = await userApi.api.groups.search({
            q: query,
            count: 1000
        });

        if (!groups) {
            return;
        }

        const list = [];

        for (const group of groups.items) {
            const groupbyid = (await userApi.api.groups.getById({
                group_id: group.id as string | undefined,
                fields: ["description", "can_post", "members_count"]
            }))[0];

            if (!groupbyid.can_post) {
                continue;
            }

            const displaygroup = {
                id: group.id,
                name: group.name,
                description: groupbyid.description,
                can_post: groupbyid.can_post,
                members_count: groupbyid.members_count
            };

            console.log(displaygroup);

            const res = await input("Choise (yes/no/exit)?");

            if (res === "" || res === "yes") {
                list.push(group);
            }
            else if (res === "exit") {
                break;
            }
        }

        for (const group of list) {
            console.log(group.id + ", ");
        }
    }
}