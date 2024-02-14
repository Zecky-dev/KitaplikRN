import React, {useState, useEffect} from 'react';
import {View, FlatList, TouchableOpacity, Alert, Text, StyleSheet} from 'react-native';

import PostCard from '../../components/PostCard/PostCard';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CreatePostModal from '../../components/CreatePostModal/CreatePostModal';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import {showMessage} from 'react-native-flash-message';

const Feed = ({navigation}) => {
  const [createPostModalVisible, setCreatePostModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);

  const styles = StyleSheet.create({
    createPostButton: {
      right: 8, backgroundColor: 'white', borderRadius: 4
    }
  })

  async function createPost(values) {
    const {image, content} = values;
    setLoading(true);
    const postId = uuidv4();
    const postImageReference = storage().ref(`/posts/${postId}`);
    const task = postImageReference.putFile(image);
    task.on('state_changed', taskSnapshot => {
      const progress =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
      setLoadingProgress(progress.toFixed(0));
    });
    task
      .then(async () => {
        const postImageURL = await postImageReference.getDownloadURL();
        await firestore().collection('Posts').doc(postId).set({
          id: postId,
          image: postImageURL,
          content,
          owner: auth().currentUser.email,
          likes: [],
          comments: [],
          createDate: new Date(),
        });
        setLoading(false);
        setCreatePostModalVisible(false);
      })
      .catch(e => {
        showMessage({
          message: `Gönderi paylaşılırken bir hata meydana geldi: ${e.code}`,
          type: 'danger',
        });
        setLoading(false);
      });
  }

  function navigateToProfile(emailAddress) {
    navigation.navigate('ProfileDetailScreen',{
      emailAddress
    })
  }

  {/* Navigation Header Buttons */}
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          
          {/* Create Post Header Button */}
          <TouchableOpacity
            onPress={() => {
              setCreatePostModalVisible(!createPostModalVisible);
            }}
            style={styles.createPostButton}>
            <Icon name="plus" color="black" size={32} />
          </TouchableOpacity>
          
                    {/* Create Post Header Button */}
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Emin misiniz?',
                'Çıkış yapmak istediğinize emin misiniz?',
                [
                  {
                    text: 'Evet',
                    onPress: () => auth().signOut(),
                  },
                  {
                    text: 'Hayır',
                    onPress: () => console.log('Çıkış iptal edildi!'),
                  },
                ],
              );
            }}
            style={{
              right: 8,
              backgroundColor: 'white',
              borderRadius: 4,
              marginLeft: 16,
            }}>
            <Icon name="power" color="red" size={32} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, createPostModalVisible]);

  // Load posts
  useEffect(() => {
    setPostsLoading(true);
    const subscriber = firestore()
      .collection('Posts')
      .orderBy('createDate')
      .onSnapshot(querySnapshot => {
        const postDocs = querySnapshot.docs;
        const tempPosts = [];
        for (let i = 0; i < postDocs.length; i++) {
          tempPosts.push(postDocs[i].data());
        }
        setPosts(tempPosts);
        setPostsLoading(false);
      });
    return () => subscriber();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <LoadingModal
        visible={loading}
        progress={loadingProgress}
        label={'Gönderi paylaşılıyor'}
      />
      <CreatePostModal
        visible={createPostModalVisible}
        setVisible={setCreatePostModalVisible}
        createPost={createPost}
      />

      {postsLoading ? (
        <Text>Gönderiler yükleniyor!!</Text>
      ) : (
        <FlatList
          data={posts}
          renderItem={({item}) => <PostCard postDetail={item} navigateToProfile={navigateToProfile} />}
        />
      )}
    </View>
  );
};

export default Feed;
