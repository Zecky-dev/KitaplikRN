import React, {useState} from 'react';
import {Image} from 'react-native';

import {ModalContent, BottomModal, ModalTitle} from 'react-native-modals';
import PickImage from '../PickImage/PickImage';
import Input from '../Input/Input';
import Button from '../Button/Button';

import colors from '../../utils/colors';

import {Formik} from 'formik';
import {PostSchema} from '../../utils/validations';

const CreatePostModal = ({visible, setVisible, createPost}) => {
  const [image, setImage] = useState(null);

  return (
    <BottomModal
      visible={visible}
      onTouchOutside={() => {
        setVisible(false);
        setImage(null);
      }}
      height={0.75}
      width={1}
      onSwipeOut={() => {
        setVisible(false);
        setImage(null);
      }}
      modalTitle={<ModalTitle title="Gönderi Oluştur" hasTitleBar />}>
      <ModalContent
        style={{
          flex: 1,
          backgroundColor: 'fff',
        }}>
        <Formik
          initialValues={{
            image: null,
            content: '',
          }}
          onSubmit={values => {
            createPost(values)
          }}
          validationSchema={PostSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
            <>
              <PickImage image={image} setImage={setImage} handleImageChange={(imageURI) => {
                setFieldValue('image',imageURI)
              }}>
                <Image
                  source={
                    !image
                      ? require('../../assets/images/no_image_selected.jpg')
                      : {uri: image}
                  }
                  style={{width: '100%', height: 200}}
                  resizeMode="contain"
                />
              </PickImage>
              <Input
                label={'Gönderi İçeriği'}
                oval={false}
                dark={true}
                multiline={true}
                additionalStyles={{
                  container: {
                    flex: 1,
                  },
                  input: {
                    height: '100%',
                    width: '100%',
                    textAlignVertical: 'top',
                  },
                }}
                placeholder={'Lütfen gönderi içeriği giriniz...'}
                onChangeText={handleChange('content')}
              />
              <Button
                label={'Paylaş'}
                additionalStyles={{
                  container: {
                    backgroundColor: colors.primary,
                  },
                }}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </ModalContent>
    </BottomModal>
  );
};

export default CreatePostModal;
