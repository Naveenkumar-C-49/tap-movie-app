import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import {
    Card,
    Container,
    CardText,
    CardTitle,
    CardSubtitle,
    CardBody,
    Button,
    Row,
    Col,
    Form, Label,
    Input, Modal, ModalFooter, ModalHeader
} from "reactstrap";

import axios from "axios";
function MovieList() {
    const [movies, setMovies] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [movieName, setMovieName] = useState('');
    const [movieUrl, setMovieUrl] = useState('');
    const [movieLength, setMovieLength] = useState(0);
    const [movieYear, setMovieYear] = useState(0);
    const [movieLanguage, setMovieLanguage] = useState('');
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);


    useEffect(() => {
        getMovies();
    }, [])

    const history = useHistory();


    const getMovies = async () => {
        const response = await axios({
            url: `http://localhost:9000/movies/?title=${searchText}`,
            method: 'get'
        });
        console.log(response.data);
        setMovies(response.data);
    }

    const setCards = () => {
        return (
            movies.map((movie, index) => (
                <Col md="4" key={index}>
                    <Card>
                        <CardBody className="bg-dark">
                            <div>
                                <img
                                    src={movie.poster}
                                    alt={movie.tilte}
                                    style={{ height: "300px", width: "200px" }}
                                />
                            </div>
                            <CardTitle tag="h5" className="text-warning ">
                                {movie.title}
                            </CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-danger">
                                {movie.language}
                            </CardSubtitle>
                            <CardText className="text-muted">
                                Year - {movie.year}
                            </CardText>
                            <Button color="danger" onClick={() => onClickCard(movie)}>
                                Full details
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
            ))
        );
    };

    const renderForm = () => {
        return (
            <Row>
                <Col width="60%">
                    <Form className="mb-3 d-flex">
                        <Input
                            className="alert-danger"
                            type="text"
                            name="searchText"
                            placeholder="Type to search a movie"
                            onChange={onChangeSearchText}
                        />
                        <Button color="warning" className="ml-2" onClick={onClickSearch}>
                            Search
                        </Button>
                    </Form>
                </Col>
                <Col>
                    {createModal()}
                </Col>
            </Row>
        );
    };

    const onChangeSearchText = (event) => {
        let searchText = event.target.value;
        setSearchText(searchText);
    };

    const onClickSearch = () => {
        getMovies();
    };

    const onClickCard = (movie) => {
        history.push(`/${movie.movieId}`);
    };

    const onChangeMovieName = (event) => {
        const movieName = event.target.value;
        setMovieName(movieName);
    }
    const onChangeMovieUrl = (event) => {
        const movieUrl = event.target.value;
        setMovieUrl(movieUrl);
    }
    const onChangeMovieYear = (event) => {
        const movieYear = event.target.value;
        setMovieYear(movieYear);
    }
    const onChangeMovieLength = (event) => {
        const movieLength = event.target.value;
        setMovieLength(movieLength);
    }
    const onChangeMovieLanguage = (event) => {
        const movieLanguage = event.target.value;
        setMovieLanguage(movieLanguage);
    }

    const onClickCreate = () => {
        const movieObject = {
            "title": movieName,
            "length": movieLength,
            "year": movieYear,
            "language": movieLanguage,
            "poster": movieUrl
        }
        axios({
            method: 'post',
            url: 'http://localhost:9000/movies/create',
            data: movieObject
        });
        toggle();
        getMovies();
    }

    const createModal = () => (
        <>
            <Button color="warning" onClick={toggle}>
                Create Movie
            </Button>
            <Modal isOpen={modal} className="bg-dark">
                <ModalHeader >Enter the Movie details</ModalHeader>
                {createMovieForm()}
                <ModalFooter>
                    <Button color="primary" onClick={onClickCreate}>Create</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );

    const createMovieForm = () => (
        <Form >
            <Label className="ml-2">Movie Name</Label>
            <Input type="text" name="movieName" onChange={onChangeMovieName} placeholder="Enter the movie name" />
            <Label className="ml-2">Movie URL</Label>
            <Input type="text" name="movieUrl" onChange={onChangeMovieUrl} placeholder="Enter the movie url" />
            <Label className="ml-2">Movie Released Year</Label>
            <Input type="number" name="movieYear" onChange={onChangeMovieYear} placeholder="Enter the movie year" />
            <Label className="ml-2">Movie Length</Label>
            <Input type="number" name="movieLength" onChange={onChangeMovieLength} placeholder="Enter the movie length" />
            <Label className="ml-2">Movie Language</Label>
            <Input type="text" name="movieLanguage" onChange={onChangeMovieLanguage} placeholder="Enter the movie language" />
        </Form>
    )

    return (
        <div>
            <Container inline >{renderForm()}</Container>
            <Container>
                <Row className="row">
                    {setCards()}
                </Row>
            </Container>
        </div>
    );
};


export default MovieList;