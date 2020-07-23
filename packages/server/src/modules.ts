import core from '@bunker42/core-server';
// import i18n from '@bunker42/i18n-server-ts';
// import validation from '@bunker42/validation-common-react';
// import counter from '@bunker42/counter-server-ts';
// import chat from '@bunker42/chat-server-ts';
// import contact from '@bunker42/contact-server-ts';
// import cookies from '@bunker42/cookies-server-ts';
import post from '@bunker42/post-server';
// import upload from '@bunker42/upload-server-ts';
// import subscription from '@bunker42/payments-server-ts';
// import mailer from '@bunker42/mailer-server-ts';
// import graphqlTypes from '@bunker42/graphql-types-server-ts';
// import authentication from '@bunker42/authentication-server-ts';
// import reports from '@bunker42/reports-server-ts';
// import rest from '@bunker42/rest-server-ts';
// import '@bunker42/debug-server-ts';

import ServerModule from '@bunker42/module-server';

// const user = require('@bunker42/user-server-ts').default;

const modules: ServerModule = new ServerModule(
//   authentication,
//   cookies,
//   i18n,
//   validation,
//   counter,
  post,
//   subscription,
//   user,
//   upload,
//   contact,
//   mailer,
//   chat,
//   reports,
//   rest,
//   graphqlTypes,
  core
);

export default modules;