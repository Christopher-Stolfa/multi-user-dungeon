import styles from "./Chatbox.module.scss";
import "../../app/globals.css";
import { FormikHelpers, FormikProvider, useFormik } from "formik";
import ChatboxForm from "./ChatboxForm";
import { useWebsocketContext } from "@/contexts/WebsocketProvider";
export interface IChatboxFormValues {
  input: string;
}
const Chatbox = () => {
  const { socket, messages } = useWebsocketContext();

  const validate = (values: IChatboxFormValues) => {
    const errors: Partial<IChatboxFormValues> = {};
    if (!values?.input) {
      errors.input = "Required";
    }
    return errors;
  };
  const formik = useFormik<IChatboxFormValues>({
    initialValues: {
      input: "",
    },
    validate,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: async (
      values: IChatboxFormValues,
      actions: FormikHelpers<IChatboxFormValues>
    ) => {
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
