import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';

const CustomButton = ({handleClick, buttonText}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={handleClick}>
      <Text style={styles.buttonText}> {buttonText}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
