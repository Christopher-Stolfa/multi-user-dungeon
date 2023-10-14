import styles from "./Chatbox.module.scss";
import "../../app/globals.css";
import { FormikHelpers, FormikProvider, useFormik } from "formik";
import ChatboxForm from "./ChatboxForm";
import { useWebsocketContext } from "@/contexts/WebsocketProvider";
interface IValues {
  input: string;
}
const Chatbox = () => {
  const { socket, messages } = useWebsocketContext();
  const formik = useFormik<IValues>({
    initialValues: {
      input: "",
    },
    onSubmit: async (values: IValues, actions: FormikHelpers<IValues>) => {
      if (socket) {
        socket.send(values?.input);
        actions.resetForm();
        actions?.setSubmitting(false);
      }
    },
  });

  return (
    <main className={styles["root"]}>
      <div className={styles["chat-view"]}>
        {messages?.map((message, i) => (
          <p key={`chatbox-message-${i}`}>{message}</p>
        ))}
      </div>
      <FormikProvider value={formik}>
        <ChatboxForm />
      </FormikProvider>
    </main>
  );
};
export default Chatbox;
