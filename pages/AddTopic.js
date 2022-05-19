import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Alert, Card, Col, Row, Toast } from "react-bootstrap";
import { Button } from "react-bootstrap";
import styles from "../styles/AddTopic.module.css";

export default function AddTopic() {
  const [show, setShow] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    console.log(JSON.stringify(formData));
    const res = await fetch("/api/addTopic", {
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
    });
    const result = await res.json();
    console.log(result);
    setShow(true);
  };
  return (
    <>
      <div className={styles.container}>
        <Card>
          <Card.Body>
            <div>
              {show && (
                <Alert
                  variant="success"
                  onClose={() => setShow(false)}
                  dismissible
                >
                  ✅ Topic has been added to Database !
                </Alert>
              )}
            </div>
            <div className={styles.box}>
              <h3 className={styles.cardTitle}>Add Topic</h3>
            </div>
            <Form onSubmit={handleSubmit} className={styles.form}>
              <Form.Label className={styles.topmargin}>
                📌 &nbsp; Topic Name
              </Form.Label>
              <Form.Control type="text" name="topicName" />
              <Form.Label className={styles.topmargin}>
                📌 &nbsp;Topic Type
              </Form.Label>
              <Form.Control type="text" name="topicType" />

              <Form.Label className={styles.topmargin}>
                📌&nbsp;Topic Description
              </Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows={3}
                name="topicDescription"
              />
              <Button
                variant="primary"
                size="lg"
                type="submit"
                className={styles.btn}
              >
                Add
              </Button>
              <div className={styles.helptext}>
                Fastest data storage on REDIS 📙
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
