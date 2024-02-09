import React, {useState, useEffect } from 'react';
import {View, FlatList, TouchableOpacity, Alert} from 'react-native';

import PostCard from '../../components/PostCard/PostCard';
import {posts} from '../../utils/mockdata';
import colors from '../../utils/colors';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CreatePostModal from '../../components/CreatePostModal/CreatePostModal';

import auth from '@react-native-firebase/auth'

const Feed = ({navigation}) => {
  const [createPostModalVisible, setCreatePostModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              setCreatePostModalVisible(!createPostModalVisible);
            }}
            style={{right: 8, backgroundColor: 'white', borderRadius: 4}}>
            <Icon name="plus" color="black" size={32} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Emin misiniz?",
                "Çıkış yapmak istediğinize emin misiniz?",
                [
                  {
                    text: "Evet",
                    onPress: () => auth().signOut()
                  },
                  {
                    text: "Hayır",
                    onPress: () => console.log("Çıkış iptal edildi!")
                  }
                ]
              )
            }}
            style={{right: 8, backgroundColor: 'white', borderRadius: 4,marginLeft:16}}>
            <Icon name="power" color="red" size={32} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, createPostModalVisible]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CreatePostModal
        visible={createPostModalVisible}
        setVisible={setCreatePostModalVisible}
      />
      <FlatList
        data={posts}
        renderItem={({item}) => <PostCard postDetail={item} />}
      />
    </View>
  );
};

export default Feed;
