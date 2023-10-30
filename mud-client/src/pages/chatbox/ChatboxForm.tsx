import styles from "./Chatbox.module.scss";
import { Button, FormControl, Input } from "@chakra-ui/react";
import { Field, FieldProps, Form, useField, useFormikContext } from "formik";
import { IChatboxFormValues } from ".";

const ChatboxForm = () => {
  const { isSubmitting } = useFormikContext<IChatboxFormValues>();
  return (
    <Form>
      <FormControl>
        <Field name="input">
          {({ field, meta }: FieldProps) => (
            <div className={styles["input-group"]}>
              <Input {...field} id="input" placeholder="Input " />
              <Button
                loadingText="Sending..."
                isDisabled={isSubmitting || !!meta?.error}
                isLoading={isSubmitting}
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
