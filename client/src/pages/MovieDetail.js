import { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router-dom";

import {
    Button,
    Container,
    Col,
    Row,
    Card,
    CardText,
    CardTitle,
} from "reactstrap";

import axios from "axios";

const MovieDetail = () => {
    const params = useParams();
    const [details, setDetails] = useState({});
    const history = useHistory();

    useEffect(() => {
        getMovieDetails();
    }, []);

    const goBack = () => {
        history.push("/");
    };

    const getMovieDetails = async () => {
        const response = await axios({
            url: `http://localhost:9000/movies/${params.movieId}`,
            method: 'get'
        });

        setDetails(response.data);
    };

    const deleteMovie = async () => {
        const response = await axios({
            url: `http://localhost:9000/movies/delete/${params.movieId}`,
            method: 'delete'
        });
        goBack();
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
                    <Col md-10>
                        <Button
                            color="warning"
                            style={{ float: 'right' }}
                            onClick={deleteMovie}
                        >
                            Delete
                        </Button>
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
