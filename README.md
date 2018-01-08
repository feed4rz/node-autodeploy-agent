# node-autodeploy-agent
## About
NodeJS agent, that listens to Github WebHooks and performs actions accordingly, for example executes a command on push event (could be git pull in a certain folder combined with an app restart command).

## Installation
- Clone this repository.
- Execute ```npm install```.
- Configure ***root_dir*** in ***config.json***. This is a path to where you have all your repositories on current machine.
- Add desired repositories in ***config.json***. ***dir*** should be repository directory name where ***on_push*** command will be executed.
- Add github webhook in repositories, that you ve added to ***config.json***.
- - Payload url ```HOST:PORT_FROM_CONFIG/webhook/push```.
- - Content type ***JSON***.
- - Add secret and copy it to ***config.json***.
- - Save.
- Daemonize your agent using ***pm2*** or any other tool.
