import core from '@bunker42/core-client';
// import look from '@bunker42/look-client-react';
// import i18n from '@bunker42/i18n-client-react';
// import counter from '@bunker42/counter-client-react';
// import chat from '@bunker42/chat-client-react';
// import contact from '@bunker42/contact-client-react';
// import validation from '@bunker42/validation-common-react';
import ClientModule from '@bunker42/module-client';
// import defaultRouter from '@bunker42/router-client-react';
// import payments from '@bunker42/payments-client-react';
// import authentication from '@bunker42/authentication-client-react';
// import '@bunker42/favicon-common';

// const post = require('@bunkre42/post-client-react').default;
// const pageNotFound = require('@bunkre42/page-not-found-client-react').default;
// const reports = require('@bunkre42/reports-client-react').default;
// const upload = require('@bunkre42/upload-client-react').default;
// const pagination = require('@bunkre42/pagination-client-react').default;
// const user = require('@bunkre42/user-client-react').default;

const modules = new ClientModule(
//   look,
//   validation,
//   defaultRouter,
//   counter,
//   post,
//   upload,
//   contact,
//   pagination,
//   chat,
//   payments,
//   user,
//   i18n,
//   reports,
//   pageNotFound,
  core,
//   authentication
);

export default modules;