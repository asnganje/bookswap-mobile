import { ReactNode } from 'react'
import { Modal, StyleSheet, Text} from 'react-native'

interface ModalProps {
  modalVisible: boolean
  children: ReactNode
}

const AppModal = ({modalVisible, children}: ModalProps) => {
  return (
      <Modal visible={modalVisible} animationType="slide">
        {children}
      </Modal>
  )
}
export default AppModal
const styles = StyleSheet.create({})