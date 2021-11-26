import { render, screen } from '@testing-library/react'
import Index from '../pages/index'

const pokemones = [ { name: 'Chanchito feliz', url: '/pokemon/detalle/1' } ]

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
})