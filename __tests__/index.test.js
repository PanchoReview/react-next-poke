import { render } from '@testing-library/react'
import Index from '../pages/index'

describe('Index', () => {
    describe('Component', () => {
        it('renders', () => {
            const { getByTestId } = render(<Index pokemones={[]} />)

            const paragraph = getByTestId("titulo")
            expect(paragraph).toBeInTheDocument()
        })

        
    })
})