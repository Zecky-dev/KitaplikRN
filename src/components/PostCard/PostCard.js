import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './PostCard.style';
import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';

const currentUserEmail = auth().currentUser.email;

const PostCard = ({postDetail, navigateToProfile, preview = false}) => {
  const {owner, comments, content, id, image, likes} = postDetail;
  const [postOwner, setPostOwner] = useState(null);

  async function getPostOwnerData() {
    const userQuery = await firestore().collection('Users').where('emailAddress',"==",owner).get()
    setPostOwner(userQuery.docs[0].data())
  }

  async function likeUnlikePost() {

    const currentUserQuery = await firestore().collection('Users').where('emailAddress',"==",currentUserEmail).get();
    const currentUserData = currentUserQuery.docs[0].data()
    
    if(likes.includes(currentUserEmail)) {
      await firestore().collection('Posts').doc(id).update({
        likes: firestore.FieldValue.arrayRemove(currentUserEmail)
      })
      await firestore().collection('Users').doc(currentUserData.username).update({
        likes: firestore.FieldValue.arrayRemove(id)
      })  
    }
    else {
      await firestore().collection('Posts').doc(id).update({
        likes: firestore.FieldValue.arrayUnion(currentUserEmail)
      })
      await firestore().collection('Users').doc(currentUserData.username).update({
        likes: firestore.FieldValue.arrayUnion(id)
      })  
    }

  }

  useEffect(() => {
    getPostOwnerData()
  }, [postDetail]);

  if(postOwner !== null) {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            activeOpacity={0.8}
            onPress={() => {
              if (!preview) {
                navigateToProfile(postOwner.emailAddress);
              }
            }}>
            <Image
              source={{
                uri: postOwner.image,
              }}
              style={{height: 50, width: 50, borderRadius: 25}}
            />
            <View style={{flex: 1}}>
              <Text
                style={styles.postOwnerNameSurname}>
                {postOwner.nameSurname}
              </Text>
              <View
                style={styles.postOwnerProfileContainer}>
                <Text>@{postOwner.username}</Text>
                {!preview && (
                  <Button
                    title="Takip Et"
                    onPress={() => console.log('Takip Et')}
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.postContent}>
            {content}
          </Text>

          {!preview && (
            <View
              style={styles.postActionButtonsContainer}>
              
              <Pressable
                style={styles.postActionButtonContainer}
                onPress={() => likeUnlikePost()}>
                <Icon
                  name={likes.includes(currentUserEmail) ? 'heart' : 'heart-outline'}
                  size={24}
                  color={likes.includes(currentUserEmail) ? 'red' : null}
                />
                <Text style={styles.postActionButtonLabel}>Beğen</Text>
              </Pressable>
              
              <Pressable style={styles.postActionButtonContainer}>
                <Icon name="comment-outline" size={24} />
                <Text style={styles.postActionButtonLabel}>Yorum Yap</Text>
              </Pressable>
            </View>
          )}
        </View>

        <Image
          source={{
            uri: image,
          }}
          style={{height: '100%', width: 120, marginHorizontal: 8}}
          resizeMode="contain"
        />
      </View>
    );
  }
};

export default PostCard;
