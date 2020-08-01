declare const _default: {
    devServer: {
        compress: boolean;
        clientLogLevel: string;
        inline: boolean;
        info: boolean;
        quiet: boolean;
        stats: undefined;
    };
    module: {
        rules: ({
            test: RegExp;
            loader: string;
            options: {
                loaders: {
                    ts: string;
                    tsx: string;
                };
            };
            use?: undefined;
            exclude?: undefined;
        } | {
            test: RegExp;
            use: (string | {
                loader: string;
                options: {
                    appendTsSuffixTo: RegExp[];
                };
            })[];
            exclude: RegExp;
            loader?: undefined;
            options?: undefined;
        } | {
            test: RegExp;
            loader: string;
            options?: undefined;
            use?: undefined;
            exclude?: undefined;
        } | {
            test: RegExp;
            use: string[];
            loader?: undefined;
            options?: undefined;
            exclude?: undefined;
        })[];
    };
    resolve: {
        extensions: string[];
        alias: {
            "@": any;
            "u@": any;
        };
    };
    output: {
        filename: string;
        path: any;
    };
    plugins: any[];
};
export default _default;
