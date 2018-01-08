# node-autodeploy-agent
## About
NodeJS agent, that listens to Github WebHooks and performs actions accordingly, for example executes a command on push event (could be git pull in a certain folder combined with an app restart command).

## Installation
1. Clone this repository.
2. Execute ```npm install```.
3. Configure ***root_dir*** in ***config.json***. This is a path to where you have all your repositories on current machine.
4. Add desired repositories in ***config.json***. ***dir*** should be repository directory name where ***on_push*** command will be executed.
5. Add github webhook in repositories, that you ve added to ***config.json***.
5.1 Payload url ```HOST:PORT_FROM_CONFIG/webhook/push```.
5.2 Content type ***JSON***.
5.3 Add secret key and copy it to ***config.json***.
5.4 Save.
6. Daemonize your agent using ***pm2*** or any other tool.