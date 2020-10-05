import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../util/Colors';

const { width, height } = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 15,
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtontext: {
    fontSize: 16,
    width: width / 2,
  },
  wrongInput: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 15,
    backgroundColor: colors.red,
  },
  errorMessage: {
    backgroundColor: colors.red,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
