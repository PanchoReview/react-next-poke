const add = () => 2 + 2
describe('Index', () => {
    describe('Component', () => {
        it('renders', () => {
            
        })
    })
    describe('getStaticProps', () => {
        it('suma 2 + 2', () => {
            expect(add()).toBe(4)
        })
    })
    
})