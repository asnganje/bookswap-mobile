import { ReactNode } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { s } from "react-native-size-matters";

interface ModalProps {
  modalVisible: boolean;
  children: ReactNode;
}

const AppModal = ({ modalVisible, children }: ModalProps) => {
  return (
    <Modal visible={modalVisible} animationType="slide">
      <View style={styles.container}>{children}</View>
    </Modal>
  );
};
export default AppModal;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(20),
  },
});
