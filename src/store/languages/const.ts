enum API {
  GET_LANGUAGES = '/internationalization/v1/get/langs',
  GET_APP_LANG_INFOS_BY_APP = '/internationalization/v1/get/app/lang/infos/by/app',
  GET_APP_LANG_INFOS_BY_OTHER_APP = '/internationalization/v1/get/app/lang/infos/by/other/app',
  ADD_LANGUAGE = '/internationalization/v1/add/lang',
  CREATE_APP_LANGUAGE_FOR_OTHER_APP = '/internationalization/v1/create/app/lang/for/other/app',
  GET_MESSAGES_BY_OTHER_APP_LANG = '/internationalization/v1/get/messages/by/other/app/lang',
  CREATE_MESSAGE_FOR_OTHER_APP = '/internationalization/v1/create/message/for/other/app',
  UPDATE_MESSAGE = '/internationalization/v1/update/message',
  CREATE_COUNTRY = '/internationalization/v1/create/country',
  UPDATE_COUNTRY = '/internationalization/v1/update/country',
  GET_COUNTRIES = '/internationalization/v1/get/countries'
}

export {
  API
}
