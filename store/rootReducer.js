import { combineReducers } from "redux";
import ticketReducer from "./ticket/reducer";
import galleryReducer from "./gallery/reducer";
import costumeReducer from "./costume/reducer";
import blogReducer from "store/blog/reducer";
import contactReducer from "store/about/reducer";
import slideReducer from "./slides/reducer";
import userReducer from "./user/reducer";
import speechReducer from "./speech/reducer";
import contentReducer from "./content/reducer";
import studioImageReducer from "./studio/reducer";
import managerReducer from "./manager/reducer";
import speechCategoryReducer from "./speechCategory/reducer";
import speechWithCategoryReducer from "./speechWithCategory/reducer";

const rootReducer = combineReducers({
    ticket:ticketReducer,
    gallery:galleryReducer,
    costume:costumeReducer,
    blog:blogReducer,
    contact:contactReducer,
    slide:slideReducer,
    user:userReducer,
    speech:speechReducer,
    content:contentReducer,
    studio:studioImageReducer,
    manager:managerReducer,
    speechCategory:speechCategoryReducer,
    speechWithCategory:speechWithCategoryReducer
});

export default rootReducer;
