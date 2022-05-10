import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import styles from "../styles/AddTopic.module.css";

export default function AddTopic() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    console.log(formData);

    const res = await fetch("/api/addTopic", {
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const result = await res.json();
    console.log(result);
  };
  return (
    <div className={styles.container}>
      <Card>
        <Card.Body>
          <div className={styles.box}>
            <h3 className={styles.cardTitle}>Add topic information</h3>
          </div>
          <Form onSubmit={handleSubmit} className={styles.form}>
            <Form.Label className={styles.topmargin}>Topic Name</Form.Label>
            <Form.Control type="text" name="topicName" />
            <Form.Label className={styles.topmargin}>Topic Type</Form.Label>
            <Form.Control type="text" name="topicType" />
            <Form.Label className={styles.topmargin}>
              Topic Description
            </Form.Label>
            <Form.Control type="text" name="topicDescription" />
            <Button
              variant="primary"
              size="lg"
              type="submit"
              className={styles.btn}
            >
              Add
            </Button>
            <div className={styles.helptext}>Fastest data storage on REDIS</div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
