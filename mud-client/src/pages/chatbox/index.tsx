import { Button, Container, TextField } from "@mui/material";
import styles from "./Chatbox.module.scss";
import "../../app/globals.css";
import NavBar from "@/components/navbar";

const Chatbox = () => {
  return (
    <main className={styles["root"]}>
      <NavBar />
      <Container className={styles["container"]} maxWidth="lg">
        <div className={styles["chat-view"]}></div>
        <div className={styles["input-group"]}>
          <TextField
            id="input-field"
            className={styles["input-field"]}
            label="Enter a command"
          />
          <Button className={styles["send-button"]} variant="contained">
            Send
          </Button>
        </div>
      </Container>
    </main>
  );
};
export default Chatbox;
