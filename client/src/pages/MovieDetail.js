import { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router-dom";

import {
    Button,
    Container,
    Col,
    Row,
    Card,
    CardText,
    CardTitle, Modal, ModalHeader, ModalFooter, Label, Input, Form
} from "reactstrap";

import axios from "axios";

const MovieDetail = () => {
    const params = useParams();
    const [details, setDetails] = useState({});
    const history = useHistory();
    const [movieName, setMovieName] = useState('');
    const [movieUrl, setMovieUrl] = useState('');
    const [movieLength, setMovieLength] = useState(0);
    const [movieYear, setMovieYear] = useState(0);
    const [movieLanguage, setMovieLanguage] = useState('');

    const [modal, setModal] = useState(false);

    useEffect(() => {
        getMovieDetails();
    }, []);


    const toggle = () => setModal(!modal);

    const goBack = () => {
        history.push("/");
    };

    const getMovieDetails = async () => {
        const response = await axios({
            url: `http://localhost:9000/movies/${params.movieId}`,
            method: 'get'
        });

        setDetails(response.data);
        setMovieName(details.title);
        setMovieUrl(details.poster);
        setMovieYear(details.year);
        setMovieLength(details.length);
        setMovieLanguage(details.language);

    };

    const deleteMovie = async () => {
        const response = await axios({
            url: `http://localhost:9000/movies/delete/${params.movieId}`,
            method: 'delete'
        });
        goBack();
    }

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

    const onClickUpdate = async () => {
        const movieObject = {
            "title": movieName,
            "length": movieLength,
            "year": movieYear,
            "language": movieLanguage,
            "poster": movieUrl
        }
        axios({
            method: 'put',
            url: `http://localhost:9000/movies/update/${params.movieId}`,
            data: movieObject
        });
        toggle();
    }

    const createMovieForm = () => (
        <Form >
            <Label className="ml-2">Movie Name</Label>
            <Input type="text" name="movieName" onChange={onChangeMovieName} defaultValue={details.title} placeholder="Enter the movie name" />
            <Label className="ml-2">Movie URL</Label>
            <Input type="text" name="movieUrl" onChange={onChangeMovieUrl} defaultValue={details.poster} placeholder="Enter the movie url" />
            <Label className="ml-2">Movie Released Year</Label>
            <Input type="number" name="movieYear" onChange={onChangeMovieYear} defaultValue={details.year} placeholder="Enter the movie year" />
            <Label className="ml-2">Movie Length</Label>
            <Input type="number" name="movieLength" onChange={onChangeMovieLength} defaultValue={details.length} placeholder="Enter the movie length" />
            <Label className="ml-2">Movie Language</Label>
            <Input type="text" name="movieLanguage" onChange={onChangeMovieLanguage} defaultValue={details.language} placeholder="Enter the movie language" />
        </Form>
    )


    const createModal = () => {
        return (
            <>
                <Modal isOpen={modal} className="bg-dark">
                    <ModalHeader >Update the Movie details</ModalHeader>
                    {createMovieForm()}
                    <ModalFooter>
                        <Button color="primary" onClick={onClickUpdate}>Update</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }

    const renderDetails = () => {

        return ((
            <>
                <Row
                    style={{ border: "2px solid black", margin: "1em 5em" }}
                    className="bg-dark"
                >
                    <Col xs="auto">
                        <img
                            src={details.poster}
                            alt="Movie Poster"
                            className="reponsive"
                            style={{ margin: "2em 0", height: "auto", width: "100%" }}
                        />
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <Button
                                    color="warning"
                                    style={{ float: 'right' }}
                                    onClick={deleteMovie}
                                >
                                    Delete
                                </Button>
                                <Button
                                    color="warning"
                                    style={{ float: 'right', margin: "0 2em 0" }}
                                    onClick={toggle}
                                >
                                    Update
                                </Button>
                                {createModal()}

                            </Col>
                        </Row>
                        <Card className="bg-dark text-white-50">
                            <CardTitle tag="h3" className="text-danger mt-5">
                                {details.title}
                            </CardTitle>
                            <CardText tag="h6">
                                {details.language} flim
                            </CardText>
                            <CardText tag="h6" className="text-warning">
                                {details.length} minutes
                            </CardText>
                            <CardText tag="h6">Released on {details.year}</CardText>
                        </Card>
                    </Col>
                </Row>
            </>
        )
        );
    };

    return (
        <>
            <Button
                color="warning"
                style={{ margin: "0em 0em 0em 2em" }}
                onClick={goBack}
            >
                Go Back
            </Button>
            <Container>
                {renderDetails()}
            </Container>
        </>
    );
};

export default MovieDetail;
