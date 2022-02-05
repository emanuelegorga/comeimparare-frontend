import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listCorsiMigliori } from "../actions/corsoActions";

function CorsoCarousel() {
  const dispatch = useDispatch();

  const corsiMigliori = useSelector((state) => state.corsiMigliori);
  const { error, loading, corsi } = corsiMigliori;

  useEffect(() => {
    dispatch(listCorsiMigliori());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {corsi.map((corso) => (
        <Carousel.Item key={corso.id}>
          <Link to={`/corsi/${corso.id}`}>
            <Image src={corso.logo_url} alt={corso.title} fluid />
            <Carousel.Caption className="carousel.caption">
              <h4>{corso.title}</h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CorsoCarousel;
