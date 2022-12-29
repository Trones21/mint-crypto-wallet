import { getUserInfo } from "./getUserInfo.mjs";
import { login } from "./login.mjs"


(async () => {
    //console.log(await getUserInfo())
    await login()
})()
