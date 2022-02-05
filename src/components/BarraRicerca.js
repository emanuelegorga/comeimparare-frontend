import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function BarraRicerca() {
  const navigate = useNavigate();
  const location = useLocation();

  const [search_title, setCoursesSearch] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (search_title) {
      navigate(`listacorsi/?search_title=${search_title}&page=1`);
    } else {
      navigate(navigate(location.pathname));
    }
  };
  return (
    <Form onSubmit={submitHandler} inline className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setCoursesSearch(e.target.value)}
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>

      <Button
        type="submit"
        variant="outline-success"
        className="p-2 barra-ricerca"
      >
        Cerca
      </Button>
    </Form>
  );
}

export default BarraRicerca;
