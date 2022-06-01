class Korei18nPlugin {
    static config={
        rtlLanguages:['ar'],
        availableLanguages:['en','ar'],//shown as list of available languages in chat window header to select
        defaultLanguage:"en",//default selection from above list
        languageStrings:{   //any additional language can be added in this object by adding the key in availableLanguages
            ar: {
                message: "رسالة...",
                connecting: "توصيل ...",
                reconnecting: "جاري إعادة الاتصال ...",
                entertosend: "اضغط على Enter للإرسال",
                endofchat: "نهاية سجل الدردشة",
                loadinghistory: "تحميل محفوظات الدردشة ..",
                sendText:"إرسال",
                closeText:"قريب",
                expandText:"وسعت",
                minimizeText:"تصغير",
                reconnectText:"أعد الاتصال",
                attachmentText:"المرفق"
            }
        }
    }
}
export default {
    name: "Korei18nPlugin",
    plugin: Korei18nPlugin
}