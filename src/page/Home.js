import React, { useState, useEffect } from "react"
import { BASE_URL } from "../constants/urls"
import axios from "axios"
import { Container, HeaderContainer, PokeCardContainer, Footer, LinkFooter,CardNameDev, PictureFooter} from "./styled"
import { Button, Avatar } from "@material-ui/core"
import Cards from "../components/Cards"



const Home = () => {

    const [pokemons, setPokemons] = useState([])
    const [pagination, setPagination] = useState(1)



    useEffect(() => {
        const offset = (pagination - 1) * 12
        axios
            .get(`${BASE_URL}/pokemon?limit=12&offset=${offset}`)
            .then((response) => {
                setPokemons(response.data.results);
            })
            .catch((error) => console.log(error.message));

    }, [pagination])



    const backPage = () => setPagination(pagination - 1)
    const nextPage = () => setPagination(pagination + 1)
    const initialPage = () => setPagination(1)

    return (
        <>

            <HeaderContainer>
                <Button className="buttonHome"
                    variant='contained'
                    color="primary"
                    onClick={initialPage}>
                    Home
                </Button>

                <h1>Lista de pokemons desde o ano 1</h1>

                <Avatar className="avatar" src="/broken-image.jpg" />
            </HeaderContainer>
            <Container>

                            {pagination > 1 ? <Button className="buttonPagination"
                    variant='contained'
                    color="primary"
                    children="<"
                    onClick={backPage} /> 
                    :
                    <Button className="buttonPagination"
                    variant='contained'
                    color="primary"
                    children="<"
                    disabled />}

                


                <PokeCardContainer>
                    

                    {pokemons.map((poke) => {
                        return <Cards key={poke.name} poke={poke} />
                    })
                    }
                </PokeCardContainer>
                <Button className="buttonPagination"
                    variant='contained'
                    color="primary"
                    children=">"
                    onClick={nextPage} />

            </Container>
            <Footer>
            <h4> Desenvolvido Hernán Barrientos </h4>
            <LinkFooter>
            <CardNameDev>Hernán</CardNameDev>
                <a target="_blank" href="https://github.com/hernanbarrientos">
                    <PictureFooter alt= "Hernán" src="https://ca.slack-edge.com/TLAVDH7C2-U021T6HLJBA-58173d7265e5-512"/>
                    
                </a>
            </LinkFooter>

            </Footer>
        </>
    )
}

export default Home;