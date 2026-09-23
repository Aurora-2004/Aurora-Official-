<div align="center">

![alt text](public/files//Icon.png)

# Aurora Website

**Website for the **Aurora** GUI (discord.gg/b5j3enGWCY)**

![Language](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)

</div>

<img width="2552" height="1330" alt="image" src="https://github.com/user-attachments/assets/ae69a492-a902-46f2-8c6d-e86bf8e6e6de" />

## Pages

| Path         | Content             |
|--------------|---------------------|
| `/`          | Landing page        |
| `/executors` | Supported executors |
| `/terms`     | Terms of Service    |

The script is served as plain text from `public/files/AuroraReborn.lua`, at both `/files/AuroraReborn.lua` and `/AuroraReborn.lua` (the short URL is a rewrite in `vercel.json`). Opening either URL in a browser redirects to the 404 page. `game:HttpGetAsync` still get the raw script as only requests that accept `text/html` are redirected

## Auth (not finished)

Your script should checks licenses against `/auth?key=<license>`

| Request                 | Status | Response                       |
|-------------------------|--------|--------------------------------|
| `/auth`                 | 307    | Redirects to the 404 page      |
| `/auth?key=`            | 400    | `missing license`              |
| `/auth?key=<wrong key>` | 401    | `invalid license`              |
| `/auth?key=<valid key>` | 200    | `soon`                         |

```lua
local result = game:HttpGetAsync("https://www.tehsilent.xyz/auth?key=" .. key)
if result ~= "soon" then
    warn(result) -- returns either "missing license" or "invalid license"
    return
end
```

The valid key is read from the `LICENSE` in environment variables so they are not leaked in this repo


## Setup

1. Make a free account at [Vercel](https://vercel.com/) and sign in with GitHub.
2. Click **Add New > Project** and pick [this repo](https://github.com/Aurora-2004/Aurora-Official-).
3. To use the auth, under **Environment Variables**, create one called `LICENSE` and make a license key
4. Click **Deploy**.
5. To use a custom domain, open the project and go to **Settings > Domains**.

Any changes made to [this repo](https://github.com/Aurora-2004/Aurora-Official-) auto updates the site on vercel (once building is done)


## Support & Contact

[YourPOV](https://yourpov.dev/)

> **Last Updated:** September 23, 2026
