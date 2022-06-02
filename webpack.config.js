// O webpack funciona em conjunto ao babel, ele faz com que qualquer navegador entenda nossos códigos e importações

const path = require('path');
const HWP = require('html-webpack-plugin');
const RRWP = require('@pmmmwh/react-refresh-webpack-plugin');

const IsDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: IsDevelopment ? 'development' : 'production', // Define o modo com que vai ser executado o webpack
    devtool: IsDevelopment ? 'eval-source-map' : 'source-map', // Define um tipo de source map -> ferramenta que remapeia os arquivos, deixa cada coisa no seu lugar apos o arquivo ser buildado, para na hora de um erro ser possivel identificar oque aconteceu direitin.
    entry: path.resolve(__dirname, 'src', 'index.tsx'), // Define o arquivo de entrada do webpack
    output: { // Define o arquivo de saida do webpack, o arquivo transformado
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [ 
        IsDevelopment && new RRWP(),
        new HWP({ // Utilização de um plugin para endereços estáticos
            template: path.resolve(__dirname, 'public', 'index.html'),
        }), 
    ].filter(Boolean),
    devServer: {
        static: path.resolve(__dirname, 'public'), // Mostra onde esta o arquivo inicial do projeto
        hot: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Diz quais são os tipos de arquivo que o webpack tem que converter
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx$/,
                exclude: /node_modules/,
                use: {
                    loader:'babel-loader',
                    options: {
                        plugins:[
                            IsDevelopment && require.resolve('react-refresh/babel'),
                        ].filter(Boolean),
                    }
                
                },
            }, // Define como sera feita a converção dos arquivos importados e exclui alguns que não precisam ser convertidos
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ]
    }
}