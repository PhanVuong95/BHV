# insurance zalo mini app


## NPM Scripts

* 🔥 `dev:tailwind` - run development server
* 🔥 `dev:server` - run development server
* 🙏 `deploy` - deploy mini app for production

## Usage:

* **`src`**: Contain all logic source code of your Mini App. Insdie `src` folder:

	* **`components`**: reuseable components written in React.JS
	* **`css`**: Stylesheets, pre-processors also supported
	* **`pages`**: a Page is also a component but will act as an entire view and must be registered inside `app-config.json` (https://mini.zalo.me/docs/framework/getting-started/app-config#pages)
	* **`services`**: reuseable logic for complex tasks that should be separated from your component, such as fetching API, get access token from Zalo or caching stuff,...
	* **`static`**: contain binary assets of your Mini App, such as icon, background, etc,...
* **`.env.*`**: Environment variables, zmp is using Vite build tools, read more about Vite env here (https://vitejs.dev/guide/env-and-mode.html#env-variables)
	* **`.env.development`**: Loaded when running project locally with `zmp start`.
	
		> If you're using `getAccessToken` API from zmp (https://mini.zalo.me/docs/api/getAccessToken) when running on browser, zmp will always return "DEFAULT ACCESS TOKEN" because there is no logged in Zalo user. Specify a `VITE_DEFAULT_ACCESS_TOKEN` to mock a real Zalo user for development purpose.

	* **`.env.production`**: Loaded when deploy project to Zalo with `zmp deploy`
	* **`app-config.json`**: Global configuration for your Mini App (https://mini.zalo.me/docs/framework/getting-started/app-config)

	Most of the time you won't need to touch these other files. `src` will be the busiest section of your development process.

