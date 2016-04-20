#!/usr/bin/env node

import path from 'path';
import workshopper from 'workshopper';
import updateNotifier from 'update-notifier';
import pkg from '../package.json';

updateNotifier({pkg: pkg}).notify();

workshopper({
    name: 'workshopper-mocha-boilerplate',
    appDir: __dirname,
    languages: ['en'],
    helpFile: path.join(__dirname, './i18n/help/{lang}.txt'),
    menuItems: [],
    commands: [],
});
