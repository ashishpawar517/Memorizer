import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import styles from "../styles/SearchTopic.module.css";

function SearchTopic(props) {
  const [hits, setHits] = useState([]);

  const search = async (event) => {
    const q = event.target.value;

    if (q.length >= 2) {
      const params = new URLSearchParams({ q });

      const res = await fetch("/api/search?" + params);

      const result = await res.json();
      console.log(result);
      setHits(result["topics"]);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.box}>
        <Card.Body>
          <InputGroup className="mb-3" onChange={search}>
            <Form.Control
              onChange={search}
              placeholder="Exact Topic name, Topic type or fuzzy description "
            />
            <Button variant="outline-secondary">Search</Button>
          </InputGroup>
          <ListGroup>
            {hits.map((hit) => (
              <ListGroup.Item key={hit.entityId} as="li">
                <div className={styles.spacing}>
                  <div>{hit.topicName}</div>
                  <Badge>{hit.topicType}</Badge>
                </div>
                <Form.Text>{hit.topicDescription}</Form.Text>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SearchTopic;
