import React, {useState, useEffect} from 'react';
import {View, Text, Image, Button, Pressable} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './PostCard.style';
import firestore from '@react-native-firebase/firestore'

const PostCard = ({postDetail}) => {
  const {owner,comments,content,id,image,likes} = postDetail
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [likeModalVisible, setLikeModalVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const [postOwner, setPostOwner] = useState(null);

  async function getPostOwner() {
    if(owner!==undefined && owner !== null) {
      const ownerQueryResult = await firestore().collection('Users').where("emailAddress","==",owner).get()
      setPostOwner(ownerQueryResult.docs[0].data())
    }  
  }

  useEffect(() => {
    getPostOwner()
  }, [postDetail]);

  if(postOwner!==undefined && postOwner!==null && postDetail) {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{
                uri: postOwner?.image,
              }}
              style={{height: 50, width: 50, borderRadius: 25}}
            />
            <View style={{flex: 1}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                {postOwner?.nameSurname}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 6,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Text>@{postOwner?.username}</Text>
                <Button
                  title="Takip Et"
                  onPress={() => console.log('Takip Et')}
                />
              </View>
            </View>
          </View>
          <Text style={{textAlign: 'justify', marginVertical: 4}}>
            {content}
          </Text>
  
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-around',
              marginTop: 4,
            }}>
            <Pressable
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setLiked(!liked)}>
              <Icon
                name={liked ? 'heart' : 'heart-outline'}
                size={24}
                color={liked ? 'red' : null}
              />
              <Text style={{marginLeft: 4, fontSize: 14}}>Beğen</Text>
            </Pressable>
            <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="comment-outline" size={24} />
              <Text style={{marginLeft: 4, fontSize: 14}}>Yorum Yap</Text>
            </Pressable>
          </View>
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
