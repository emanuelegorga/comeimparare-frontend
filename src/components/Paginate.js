import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Paginate({ pages, page, search_title = "", is_admin = false }) {
  if (search_title) {
    search_title = search_title.split("?search_title=")[1].split("&")[0];
  }

  console.log(pages);

  return (
    pages > 1 && (
      <Pagination className="justify-content-center">
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !is_admin
                ? `/?search_title=${search_title}&page=${x + 1}`
                : `/admin/listacorsi/?search_title=${search_title}&page=${
                    x + 1
                  }`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
