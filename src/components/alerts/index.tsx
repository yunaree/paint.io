import CopyErrorAlert from "./errors/copy";
import ShareErrorAlert from "./errors/share";
import CopySuccessAlert from "./success/copy";

function Alert({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

//errors
Alert.CopyError = CopyErrorAlert;
Alert.ShareError = ShareErrorAlert;

//success
Alert.CopySuccess = CopySuccessAlert;

//info

export default Alert;