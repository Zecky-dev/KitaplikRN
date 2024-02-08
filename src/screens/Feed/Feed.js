import React, {useState, useEffect, useRef} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';

import PostCard from '../../components/PostCard/PostCard';
import {posts} from '../../utils/mockdata';
import colors from '../../utils/colors';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CreatePostModal from '../../components/CreatePostModal/CreatePostModal';

const Feed = ({navigation}) => {
  const [createPostModalVisible, setCreatePostModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setCreatePostModalVisible(!createPostModalVisible);
          }}
          style={{right: 8, backgroundColor: 'white', borderRadius: 4}}>
          <Icon name="plus" color="black" size={32} />
        </TouchableOpacity>
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
