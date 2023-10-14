import styles from "./Chatbox.module.scss";
import { Button, FormControl, Input } from "@chakra-ui/react";
import { Field, Form, useFormikContext } from "formik";

const ChatboxForm = () => {
  const formik = useFormikContext(); // Access the Formik context
  return (
    <Form>
      <FormControl>
        <Field name="input">
          {({ field }: any) => (
            <div className={styles["input-group"]}>
              <Input {...field} id="input" placeholder="Input " />
              <Button
                loadingText="Sending..."
                isDisabled={formik?.isSubmitting}
                isLoading={formik?.isSubmitting}
                type="submit"
                colorScheme="teal"
              >
                Send
              </Button>
            </div>
          )}
        </Field>
      </FormControl>
    </Form>
  );
};
export default ChatboxForm;
