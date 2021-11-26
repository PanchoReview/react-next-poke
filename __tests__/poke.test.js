import { render, screen, waitFor } from '@testing-library/react'
import Poke from '../pages/poke'

describe('Poke', () => {
    const mockResults = [{ name: 'Chanchito', url: 'https://www.dominio.com.pokemones/1' }]

    global.fetch = jest.fn()
        .mockImplementation(url => {
            return new Promise(resolve => {
                resolve({
                    json: () => Promise.resolve({
                        results: mockResults
                    })
                })
            })
        })

    it('renders pokemones', async () => {
        render(
            <Poke />
        )

        const loading = screen.getByText("Cargando...")
        expect(loading).toBeInTheDocument()
        await waitFor(() => screen.getByText("La increíble App de Pokemones del Pancho"))

        const element = screen.getByTestId(1)
        expect(element).toBeInTheDocument()

        const anchor = element.children[0]
        expect(anchor).toHaveAttribute("href", '/pokemones/1')
        expect(anchor).toHaveTextContent('Chanchito')
    })
})