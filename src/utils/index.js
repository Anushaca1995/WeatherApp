import { Alert } from "react-native";

class Util {
  showAlertWithDelay(title, message, delay = 500) {
    if (!this.alertPresent) {
      this.alertPresent = true;

      setTimeout(() => {
        Alert.alert(
          title,
          message,
          [
            {
              text: "OK",
              onPress: () => {
                this.alertPresent = false;
              },
            },
          ],
          {
            cancelable: false,
          }
        );
      }, delay);
    }
  }
}
export default new Util();
