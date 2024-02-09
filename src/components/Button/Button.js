import React from 'react'
import {TouchableOpacity,Text, ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons.js'
import styles from './Button.style.js'
const Button = ({label,icon,onPress,oval = false,additionalStyles,loading}) => {
    return (
        <TouchableOpacity
            activeOpacity={.7}
            onPress={onPress}
            style={[
                styles.container,
                additionalStyles?.container,
                oval && {borderRadius: 24}
            ]}
            //disabled={loading}
        >
            {loading && <ActivityIndicator size={"small"} color={"white"} style={{marginRight:4}}/>}
            {icon && (
                <Icon name={icon.name} size={icon.size} color={icon.color} style={styles.icon}/>
            )}
            <Text style={[styles.label,additionalStyles?.label]}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}
export default Button