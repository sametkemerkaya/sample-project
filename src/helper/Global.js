import MainStore from "../store/MainStore";
import i18next from 'i18next'; 

export default class Global {

    static Log = (message, data) => {
        console.log(message, data)
    }

    static Login = (data, callback) => {
        localStorage.setItem("isLogin", true);
        this.Log("User Login", data)

        MainStore.isLogin = true;
        
        this.Log("Logins", MainStore.isLogin)
        
        this.ChangeLang(data.language)
  
        return callback();
    }

    static Logout = (callback) => {
        localStorage.removeItem("isLogin");
        MainStore.isLogin = false; 

        return callback();
    }

    static ChangeLang(lang) {
        i18next.changeLanguage(lang);
        MainStore.currentLanguage = lang;
    }

 

}