import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Pokemon = ( { data } ) => {    
    const router = useRouter()
    console.log(router)    

    if (router.isFallback) {
        return <p>Cargando...</p>
    }

    return(
        <div>
            <h1>{data.name} numero #{data.id}</h1>
            <Image src={data.sprites.front_default} width={400} height={400} />
            <Link href="/">Volver al inicio</Link>
        </div>
    )
}

export default Pokemon

export const getStaticProps = async ({params}) => {
    console.log(params)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    const data = await response.json()

    return { props: { data } }
}

//Definir rutas estáticas para las que next generará HTMLs estáticos
export const getStaticPaths = async ({ }) => {
    const paths = [
        { params: { id: '1'} },
        { params: { id: '2'} }
    ]
    

    //se retornan:
    //paths
    //fallback: si es true, rutas no definidas en paths se generarán on demand
    //fallback es util cuando tenemos una página con potenciales miles de rutas estáticas
    //fallback acepta valores true, false y 'blocking'
    //'blocking' y true son similares, pero con 'blocking' no se puede controlar el comportamiento
    //del componente mientras se encuentra generando
    return {
        paths,
        fallback: 'blocking' 
    }
}

// export const getServerSideProps = async ({params}) => {
//     console.log(params)
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
//     const data = await response.json()

//     return { props: { data } }
// }