import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

//codigo disponible en https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet() //Crea hoja de estilos en el servidor
        const originalRenderPage = ctx.renderPage

        try {
            //Reemplazamos render page del context, asignandole un nuevo comportamiento
            //enhanceApp es una función que recibe el componente App, y luego sus propiedades
            //esta función nos permite pasar más propiedades o comortamientos al render de documentos
            //en este caso, queremos obtener todos los estilos CSS de lso componentes hijos de styled-components
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />), //Buscar todos los estilos ubicados en nuestra App, guardarlos en sheet antes de retornar App
                })

            //obtener propiedades iniciales de nuestro documento
            const initialProps = await Document.getInitialProps(ctx)

            //retornamos las propiedades iniciales,
            //+ estilos en las propiedades iniciales
            //+ estilos para documentos generados en el lado del servidor
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            //Cerrar hoja de estilos en servidor
            sheet.seal()
        }
    }
}