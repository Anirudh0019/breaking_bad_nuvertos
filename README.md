
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.
# install & demo video guide
1. [link to yt guide](https://youtu.be/G-5pEwAW_Gc)
2. [link to same video on drive](https://drive.google.com/file/d/1F8qcySw6K-4v0HcL43gG0dDVjuj4nro9/view?usp=sharing)
3. [link to api doc](https://documenter.getpostman.com/view/37552337/2sB2qcCfpC)

to use apis like the ones mentioned in "3", u will either need to use the docker compose up similar to mentioned below.

# Backend link
Backend exists on this gh repo
[https://github.com/Anirudh0019/nuvertos_brb_backend](https://github.com/Anirudh0019/nuvertos_brb_backend)
## requirements to run backend:
1. docker compose & docker
2. node 20 +

# Steps to run locally
1. go to the github repo linked above
2. run `git clone [link]`
3. cd into the cloned repo, e.g. cd cloned/
4. run these two commands `docker network create test-new` & `docker volume create test-new`.
5. Finally run `docker compose up -d`.
will take some time, let it spin up,
### Whats happening?
backend docker compose contains 3 services, actual_backend service, mysql db, and adminer(adminer is just to debug etc)
adminer creds should be:
host:db 
password:password
user:root 
DB_NAME=compound_db
(probably, in case these don't work, u can find creds in `.env` file inside backend/
## FInal steps, the frontend.
1. run this command
2. `docker pull anirudh781/compound_gallery_web:latest`
3. finally, once the image is pulled, run the command below
4. `docker run -p 80:80 anirudh781/compound_gallery_web:latest`
5. to run without logs, use a `docker run -d -p 80:80 anirudh781/compound_gallery_web:latest`

## to view the result
go to `http://localhost` on any web browser
link to a guide video will be present at the top of this page


## Development server
Run `npm i`
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


