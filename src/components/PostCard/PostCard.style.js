import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 6,
    padding: 8,
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 1,
  },
  postOwnerNameSurname: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  postOwnerProfileContainer: {
    flexDirection: 'row',
    marginTop: 6,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  postContent: {
    textAlign: 'justify',
    marginVertical: 4,
  },
  postActionButtonsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    marginTop: 4,
  },
  postActionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postActionButtonLabel: {
    marginLeft: 4,
    fontSize: 14,
  },
});
