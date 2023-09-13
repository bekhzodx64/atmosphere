import replace from 'gulp-replace';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import browsersync from 'browser-sync';
import ifPlugin from 'gulp-if';
import newer from 'gulp-newer';

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    if: ifPlugin,
    newer: newer,
};
