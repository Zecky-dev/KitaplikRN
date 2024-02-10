import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import PostCard from '../../components/PostCard/PostCard';

import {TabView, SceneMap} from 'react-native-tab-view';
import colors from '../../utils/colors';

const Account = ({route}) => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [userData, setUserData] = useState(null);

  async function getAllData(emailAddress) {
    const userDataQuery = await firestore()
      .collection('Users')
      .where('emailAddress', '==', emailAddress)
      .get();
    const userData = userDataQuery.docs[0].data();
    setUserData(userData);
    const userLikes = userData.likes;
    const postsQuery = await firestore()
      .collection('Posts')
      .where('owner', '==', emailAddress)
      .get();
    setPosts(postsQuery.docs.map(doc => doc.data()));
    if (userLikes.length !== 0) {
      const likedPostsQuery = await firestore()
        .collection('Posts')
        .where('id', 'in', userLikes)
        .get();
      setLikedPosts(likedPostsQuery.docs.map(doc => doc.data()));
    }
  }

  useEffect(() => {
    getAllData(route.params.emailAddress);
  }, [route.params]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Gönderiler'},
    {key: 'second', title: 'Beğenilenler'},
  ]);

  const OwnPosts = () => {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={posts}
          renderItem={({item}) => <PostCard postDetail={item} preview={true} />}
        />
      </View>
    );
  };

  const LikedPosts = () => {
    return (
      <FlatList
        data={likedPosts}
        renderItem={({item}) => <PostCard postDetail={item} preview={true} />}
      />
    );
  };

  const layout = useWindowDimensions();
  const renderScene = SceneMap({
    first: OwnPosts,
    second: LikedPosts,
  });

  const styles = StyleSheet.create({
    container: {
      height: '100%',
    },
    infoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
    },
    profileImage: {
      width: 200,
      height: 200,
    },
    nameSurname: {
      color: colors.black,
      fontSize: 24,
      marginVertical: 8,
    },
    username: {
      color: 'rgba(0,0,0,0.5)',
      fontSize: 18,
      marginBottom: 8,
    },
  });

  if (userData) {
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Image
            source={
              userData.image
                ? {uri: userData.image}
                : require('../../assets/images/avatar_icon.png')
            }
            style={styles.profileImage}
          />
          <Text style={styles.nameSurname}>{userData.nameSurname}</Text>
          <Text style={styles.username}>@{userData.username}</Text>
        </View>

        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </View>
    );
  }
};

export default Account;
