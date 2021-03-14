import { observable } from "mobx";

class MainStore {
    isLogin = observable(localStorage.getItem('isLogin') || false);
    currentLanguage = observable([localStorage.getItem('i18nextLng') || MainStore.defaultLanguage]);
    defaultLanguage = observable("en");
}

export default new MainStore();