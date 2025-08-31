import CopyErrorAlert from "./errors/copy-error";

function Alert({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

Alert.CopyError = CopyErrorAlert;

export default Alert;