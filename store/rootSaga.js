import {all} from "redux-saga/effects";
import {gallerySaga} from "./gallery/saga";
import {ticketSaga} from "./ticket/saga";
import {costumeSaga} from "./costume/saga";
import {blogSaga} from "./blog/saga";
import {contactSaga} from "./about/saga";
import {slideSaga} from "./slides/saga";
import {userSaga} from "./user/saga";
import {speechSaga} from "./speech/saga";
import {contentSaga} from "./content/saga";
import {studioImageSaga} from "./studio/saga";
import {managerSaga} from "./manager/saga";
import {speechCategorySaga} from "./speechCategory/saga";
import {speechWithCategorySaga} from "./speechWithCategory/saga";

function* rootSaga() {
    yield all([
        gallerySaga(),
        ticketSaga(),
        costumeSaga(),
        blogSaga(),
        contactSaga(),
        slideSaga(),
        userSaga(),
        speechSaga(),
        contentSaga(),
        studioImageSaga(),
        managerSaga(),
        speechCategorySaga(),
        speechWithCategorySaga()
    ]);
}

export default rootSaga;
