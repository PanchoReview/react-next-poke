import { render, screen } from '@testing-library/react'
import Index, { getStaticProps } from '../pages/index'

const pokemones = [{ name: 'Chanchito feliz', url: '/pokemon/detalle/1' }]

describe('Index', () => {
    describe('Component', () => {
        it('renders', () => {
            const { getByTestId } = render(<Index pokemones={pokemones} />)

            const paragraph = getByTestId("titulo")
            expect(paragraph).toBeInTheDocument()

            const chanchito = screen.getByText('Chanchito feliz')
            expect(chanchito).toBeInTheDocument()

            const url = chanchito.getAttribute("href")
            expect(url).toEqual("/pokemones/1")
        })
    })

    describe('getStaticProps', () => {
        it('returns pokemones', async () => {
            //fetch no es llamado en tests, por lo que hay que mockear su comportamiento
            global.fetch = jest.fn()
                .mockImplementation(url => {
                    expect(url).toBe("https://pokeapi.co/api/v2/pokemon?limit=151")
                                        
                    return new Promise(resolve => {
                        resolve({
                            json: () => Promise.resolve({
                                results: 'pokemones'
                            })
                        })
                    })
                })

            const { props } = await getStaticProps()
            expect(props.pokemones).toBe('pokemones')
        })

    })
})