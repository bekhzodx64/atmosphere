import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());

const srcFolder = './src';
const buildFolder = './public';

export const path = {
    build: {
        css: `${buildFolder}/css`,
        html: `${buildFolder}/`,
        js: `${buildFolder}/js/`,
        images: `${buildFolder}/img/`,
        files: `${buildFolder}/`,
    },
    src: {
        js: `${srcFolder}/js/**/*.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        scss: `${srcFolder}/sass/*.sass`,
        html: [
            `${srcFolder}/pug/pages/*.pug`,
            `!${srcFolder}/pug/components/**/*.pug`,
        ],
        files: `${srcFolder}/files/**/*.*`,
    },
    watch: {
        scss: `${srcFolder}/sass/**/*.sass`,
        html: `${srcFolder}/pug/**/*.pug`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        js: `${srcFolder}/js/**/*.js`,
        files: `${srcFolder}/files/**/*.*`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: '',
};
