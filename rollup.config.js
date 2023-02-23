import typescript from 'rollup-plugin-typescript2';
import sass from 'rollup-plugin-sass';
import postcss from 'rollup-plugin-postcss'

export default {
    input: 'src/index_esm_rollup.ts',
    external: [
        'src/libs/perfectscroll/css/perfect-scrollbar.min.css',
        'src/plugins/fileUploader/fileUploader.scss',
        'src/components/chatwindow/sass/chatWindow.scss',
        'src/templatemanager/templates/messageTemplate/messageTemplate.scss'
    ],
    output: [
        {
            file: 'dist/treeshakable.cjs.js',
            format: 'cjs',
            exports: 'named',
        },
        {
            format: 'esm',
            sourcemap: true,
            dir: 'dist/esm',
            preserveModules: true,
        },
    ],
    plugins: [typescript(), postcss(), sass()],
    external: [],
    onwarn(warning, warn) {
        if (
            warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
            warning.source === './src/index.ts'
        ) {
            // Suppress warning for unused export
            return;
        }
        warn(warning);
    },
};