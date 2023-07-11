import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
    routes: (_routes) => {
        let routList = [..._routes];

        return routList.concat([
            // {
            //     name: "{name}",
            //     path: "{path}",
            //     component: () => import("~/pages/{filePath}"),
            // },
        ]);
    },
};
