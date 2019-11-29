import * as dotenv from "dotenv";
dotenv.config();

import cms from "./api/cms";
import userApi from "./api/user_api";

import { input, sleep } from "./lib";
import { QueryModule } from "./query";
import { GetGroup } from "./getgroup";

class App {
    public async Run() {
        const mode = await input("Special mode (query, get)? ");

        if (mode === "query") {
            await QueryModule.Run();
            return;
        }
        else if (mode === "get") {
            await GetGroup.Run();
            return;
        }

        const postid = await input("Insert Post Id: ");

        if (!postid) {
            console.log("Wrong postid");
            return;
        }

        const posts = await cms.collections.getWithParams("SMMPosts", {
            filter: {
                id: postid
            }
        });

        console.log(posts);

        const post = posts[0];

        if (!post || !post.content) {
            console.log("WRONG POST");
            return;
        }

        const listid = await input("Insert List Id: ");

        if (!listid) {
            console.log("Wrong listid");
        }

        const listids = listid.split(",");

        const totallist = new Set<number>();

        for (const i of listids) {
            const lists = await cms.collections.getWithParams("SMMLists", {
                filter: {
                    id: i
                }
            });

            if (!lists || !lists[0]) {
                console.log("WRONG LIST");
            }

            const list = lists[0].content;

            for (const j of list) {
                totallist.add(j);
            }
        }

        const badlist = [];

        for (const groupId of totallist) {
            console.log("Posting to http://vk.com/club" + groupId);

            try {
                const res = await userApi.api.wall.post({
                    owner_id: -groupId,
                    message: post.content
                });
            }
            catch (e) {
                console.log(e);
                badlist.push({
                    group: groupId,
                    error: e
                });

                await sleep(5000);
            }

            await sleep(3000);
        }

        console.log("Posted to " + totallist.size + " VK groups");

        for (const badGroup of badlist) {
            console.log(badGroup.group + " | " + badGroup.error.code + " | " + badGroup.error.name);
        }
    }
}

const server = new App();

console.log("Bot started");

server.Run();
// /post [postid] [listid]
